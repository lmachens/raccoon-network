import games from 'api/games';
import overwolf from 'api/overwolf';
import { ODKRunningGameInfo } from 'api/overwolf/overwolf';
import {
  addGameSessionEvent,
  addGameSessionEvents,
  IGameSessionEvent,
  IMatchInfo,
  setGameSessionInfo
} from 'api/stitch/gameSessions';
import { createTitle, uploadVideo } from 'api/video';
import React from 'react';

interface IGamesContextValue {
  gameInfo: any;
  matchInfo: IMatchInfo;
}

const defaultMatchInfo = {
  level: 1,
  kills: 0,
  deaths: 0,
  assists: 0,
  minionKills: 0,
  gold: 0
};

export const GamesContext = React.createContext<IGamesContextValue>({
  gameInfo: null,
  matchInfo: defaultMatchInfo
});

type GameInfoState = ODKRunningGameInfo | null;

interface IGamesProviderState {
  gameInfo: GameInfoState;
  matchInfo: IMatchInfo;
}

export class GamesProvider extends React.Component<{}, IGamesProviderState> {
  stopCaptureTimeout: NodeJS.Timeout | null = null;
  highlightEvents: any[] = [];
  fileInput = React.createRef<any>();

  replay: any = null;

  state: IGamesProviderState = {
    gameInfo: null,
    matchInfo: defaultMatchInfo
  };

  componentDidMount() {
    overwolf.games.onGameInfoUpdated.addListener(this.handleGameInfoUpdated);
    overwolf.games.getRunningGameInfo(this.handleRunningGameInfo);

    overwolf.settings.registerHotKey('replay_save', this.handleReplaySaveHotkey);
  }

  componentWillUnmount() {
    overwolf.games.onGameInfoUpdated.removeListener(this.handleGameInfoUpdated);
    this.unregisterEvents();
  }

  handleReplaySaveHotkey = async arg => {
    const { gameInfo, matchInfo } = this.state;
    console.log('handleReplaySaveHotkey', arg, matchInfo, gameInfo);
    if (arg.status !== 'success' || !matchInfo || !gameInfo) {
      return;
    }

    const timestamp = new Date();
    const highlightEvent = {
      timestamp,
      events: [{ name: 'hotkey', timestamp }]
    };

    this.recordHighlight(highlightEvent);
  };

  handleInfoUpdate = newInfoUpdate => {
    const timestamp = new Date();
    const infoUpdate = { ...newInfoUpdate, timestamp };
    const { game_info = {}, level = {}, summoner_info = {} } = infoUpdate.info;

    this.setState(
      state => ({
        matchInfo: {
          ...defaultMatchInfo,
          ...state.matchInfo,
          ...game_info,
          ...level,
          ...summoner_info
        }
      }),
      this.updateGameSession
    );
  };

  updateGameSession = () => {
    const { matchInfo, gameInfo } = this.state;
    console.log('updateGameSession', matchInfo, gameInfo);
    if (matchInfo && matchInfo.matchId && gameInfo) {
      setGameSessionInfo({
        gameId: Math.floor(gameInfo.id / 10),
        matchId: matchInfo.matchId,
        info: matchInfo
      });
    }
  };

  endGameSession = () => {
    const { matchInfo, gameInfo } = this.state;
    console.log('endGameSession', matchInfo);
    if (matchInfo && matchInfo.matchId) {
      setGameSessionInfo({
        gameId: Math.floor(gameInfo!.id / 10),
        matchId: matchInfo.matchId,
        info: { ...matchInfo, endedAt: new Date() }
      });
      this.setState({
        gameInfo: null,
        matchInfo: defaultMatchInfo
      });
    }
  };

  handleNewEvents = eventUpdate => {
    console.log('handleNewEvents', eventUpdate);
    const timestamp = new Date();

    const events = eventUpdate.events.map(event => {
      let data = {};
      try {
        if (event.data !== '') {
          data =
            typeof event.data === 'string'
              ? JSON.parse(event.data.replace('\r', '').replace('\n', ''))
              : event.data;
        }
      } catch (error) {
        console.error(error, event);
      }
      return { name: event.name, data, timestamp };
    });
    const announcerEvents = events.filter(event => event.name === 'announcer');
    if (announcerEvents.length) {
      addGameSessionEvents(this.state.matchInfo!.matchId, announcerEvents);
    }

    const matchStarted = events.find(event => event.name === 'matchStart');
    if (matchStarted) {
      console.log('matchStarted', matchStarted);
      this.setState(
        state => ({
          matchInfo: { ...state.matchInfo, startedAt: timestamp }
        }),
        this.updateGameSession
      );
    }
    const matchOutcome = events.find(event => event.name === 'matchOutcome');
    if (matchOutcome) {
      console.log('matchOutcome', matchOutcome);
      this.setState(
        state => ({
          matchInfo: { ...state.matchInfo, outcome: matchOutcome.data }
        }),
        this.endGameSession
      );
    }
    const matchEnded = events.find(event => event.name === 'matchEnd');
    if (matchEnded) {
      console.log('matchEnded', matchEnded);
      this.endGameSession();
    }

    const died = events.find(event => event.name === 'death');
    const killed = events.find(event => event.name === 'kill');
    const assisted = events.find(event => event.name === 'assist');

    if (died || killed || assisted) {
      const highlightEvent = {
        timestamp,
        events: [died, killed, assisted].filter(event => event)
      };
      this.recordHighlight(highlightEvent);
    }
  };

  recordHighlight = highlightEvent => {
    this.highlightEvents = [...this.highlightEvents, highlightEvent];

    console.log('record highlight', !!this.stopCaptureTimeout, this.replay, this.highlightEvents);
    if (!!this.stopCaptureTimeout) {
      clearTimeout(this.stopCaptureTimeout);
    } else {
      overwolf.media.replays.startCapture(8000, replay => {
        this.replay = replay;
      });
    }
    this.stopCaptureTimeout = setTimeout(this.saveHighlight, 4000);
  };

  saveHighlight = () => {
    console.log('saveHighlight', this.replay);
    const replayUrl = this.replay.url;
    const highlightEvents = this.highlightEvents;
    overwolf.media.replays.stopCapture(this.replay.id, () => {
      const event: IGameSessionEvent = {
        name: 'highlight',
        title: createTitle(highlightEvents),
        timestamp: new Date(),
        data: highlightEvents
      };

      uploadVideo(replayUrl, 'Raccoon Network', event.title).then(video => {
        console.log('uploaded video', video);
        event.video = video;
        addGameSessionEvent(this.state.matchInfo!.matchId, event);
        overwolf.media.videos.deleteVideo(replayUrl, () => {
          console.log('deleted local video');
        });
      });
    });
    delete this.stopCaptureTimeout;
    this.highlightEvents = [];
    delete this.replay;
  };

  handleError = error => {
    console.log('Handle Error', error);
  };

  unregisterEvents = () => {
    /*overwolf.media.replays.turnOff(() => {
      console.log('Replay capture deactivated');
    });*/
    overwolf.games.events.onError.removeListener(this.handleError);
    overwolf.games.events.onInfoUpdates2.removeListener(this.handleInfoUpdate);
    overwolf.games.events.onNewEvents.removeListener(this.handleNewEvents);
  };

  registerEvents = () => {
    const { gameInfo } = this.state;

    console.log('registerEvents');
    this.unregisterEvents();
    this.getInfo();

    // general events errors
    overwolf.games.events.onError.addListener(this.handleError);

    // "static" data changed (total kills, username, steam-id)
    // This will also be triggered the first time we register
    // for events and will contain all the current information
    overwolf.games.events.onInfoUpdates2.addListener(this.handleInfoUpdate);

    // an event triggerd
    overwolf.games.events.onNewEvents.addListener(this.handleNewEvents);

    // turn on replay capture
    overwolf.media.replays.turnOn(
      {
        settings: {
          video: { buffer_length: 20000 },
          audio: {
            mic: {
              enable: false,
              volume: 0
            },
            mic_volume: 0,
            game_volume: 100
          }
        }
      },
      result => {
        console.log('Replay capture activated', result);
      }
    );
  };

  getInfo = () => {
    overwolf.games.events.getInfo(result => {
      if (result.status === 'success') {
        console.log('getInfo:', result);
        const { game_info = {}, level = {}, summoner_info = {} } = result.res || {};

        this.setState(
          state => ({
            matchInfo: {
              ...defaultMatchInfo,
              ...game_info,
              ...level,
              ...summoner_info,
              startedAt: state.matchInfo.startedAt || new Date()
            }
          }),
          this.updateGameSession
        );
      }
    });
  };

  handleGameInfoUpdated = gameInfoResult => {
    console.log('handleGameInfoUpdated', gameInfoResult);
    this.setState({ gameInfo: gameInfoResult.gameInfo }, () => {
      if (this.gameLaunched(gameInfoResult)) {
        this.registerEvents();
        setTimeout(() => this.setFeatures(gameInfoResult.gameInfo), 1000);
      } else {
        this.unregisterEvents();
        this.endGameSession();
      }
    });
  };

  handleRunningGameInfo = gameInfo => {
    console.log('handleRunningGameInfo', gameInfo);
    this.setState({ gameInfo }, () => {
      if (this.gameRunning(gameInfo)) {
        this.registerEvents();
        this.setFeatures(gameInfo);
      } else {
        this.unregisterEvents();
        this.endGameSession();
      }
    });
  };

  setFeatures = gameInfo => {
    const gameId = Math.floor(gameInfo.id / 10);
    const game = games[gameId];
    if (!game || !game.interestedInFeatures) {
      console.log('No features for game');
      const matchId = gameInfo.sessionId;
      this.setState(
        {
          matchInfo: {
            ...defaultMatchInfo,
            matchId
          }
        },
        this.updateGameSession
      );

      return;
    }

    overwolf.games.events.setRequiredFeatures(game.interestedInFeatures, info => {
      console.log('Set required features:');
      console.log(info);

      if (info.status === 'error') {
        window.setTimeout(() => this.setFeatures(gameInfo), 2000);
      } else {
        this.getInfo();
      }
    });
  };

  gameLaunched = gameInfoResult => {
    if (!gameInfoResult) {
      return false;
    }

    if (!gameInfoResult.gameInfo) {
      return false;
    }

    if (!gameInfoResult.runningChanged && !gameInfoResult.gameChanged) {
      return false;
    }

    if (!gameInfoResult.gameInfo.isRunning) {
      return false;
    }

    return true;
  };

  gameRunning = gameInfo => {
    if (!gameInfo) {
      return false;
    }

    if (!gameInfo.isRunning) {
      return false;
    }

    return true;
  };

  render() {
    const { children } = this.props;

    return <GamesContext.Provider value={this.state}>{children}</GamesContext.Provider>;
  }
}
