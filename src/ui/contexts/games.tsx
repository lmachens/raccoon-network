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
  events: any;
  gameInfo: any;
  matchInfo: IMatchInfo;
}

const defaultMatchInfo = {
  alive: true,
  level: 1,
  kills: 0,
  deaths: 0,
  assists: 0,
  minionKills: 0,
  gold: 0,
  startedAt: new Date()
};

export const GamesContext = React.createContext<IGamesContextValue>({
  events: null,
  gameInfo: null,
  matchInfo: defaultMatchInfo
});

type GameInfoState = ODKRunningGameInfo | null;

interface IGamesProviderState {
  gameInfo: GameInfoState;
  events: IGameSessionEvent[];
  matchInfo: IMatchInfo;
}

export class GamesProvider extends React.Component<{}, IGamesProviderState> {
  stopCaptureTimeout: NodeJS.Timeout | null = null;
  highlightEvents: any[] = [];
  fileInput = React.createRef<any>();

  replay: any = null;

  state: IGamesProviderState = {
    gameInfo: null,
    matchInfo: defaultMatchInfo,
    events: []
  };

  componentDidMount() {
    overwolf.games.onGameInfoUpdated.addListener(this.handleGameInfoUpdated);
    overwolf.games.getRunningGameInfo(this.handleRunningGameInfo);
  }

  componentWillUnmount() {
    overwolf.games.onGameInfoUpdated.removeListener(this.handleGameInfoUpdated);
    this.unregisterEvents();
  }

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
    console.log('updateGameSession', matchInfo);
    if (matchInfo && matchInfo.matchId) {
      setGameSessionInfo({
        gameId: Math.floor(gameInfo!.id / 10),
        matchId: matchInfo.matchId,
        info: matchInfo
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
      this.setState(state => ({
        events: [...announcerEvents, ...state.events]
      }));
    }

    const matchStarted = !!events.find(event => event.name === 'matchStart');
    if (matchStarted) {
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
          matchInfo: { ...state.matchInfo, endedAt: timestamp, outcome: matchOutcome.data }
        }),
        this.updateGameSession
      );
    }
    const matchEnded = !!events.find(event => event.name === 'matchEnd');
    if (matchEnded) {
      this.setState(
        state => ({
          matchInfo: { ...state.matchInfo, endedAt: timestamp }
        }),
        this.updateGameSession
      );
    }

    const died = events.find(event => event.name === 'death');
    const respawnded = events.find(event => event.name === 'respawn');

    if (died || respawnded) {
      const alive = !!(respawnded || !died);

      this.setState(
        state => ({
          matchInfo: { ...state.matchInfo, alive }
        }),
        this.updateGameSession
      );
    }

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

      this.setState(state => ({
        events: [event, ...state.events]
      }));
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
    this.setState({
      gameInfo: null,
      matchInfo: defaultMatchInfo,
      events: []
    });

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
              startedAt: state.matchInfo.startedAt
            }
          }),
          this.updateGameSession
        );
      }
    });
  };

  handleGameInfoUpdated = gameInfoResult => {
    console.log('handleGameInfoUpdated', gameInfoResult);
    if (this.gameLaunched(gameInfoResult)) {
      this.registerEvents();
      setTimeout(() => this.setFeatures(gameInfoResult.gameInfo), 1000);
    }

    this.setState({ gameInfo: gameInfoResult.gameInfo });
  };

  handleRunningGameInfo = gameInfo => {
    console.log('handleRunningGameInfo', gameInfo);
    if (this.gameRunning(gameInfo)) {
      this.registerEvents();
      setTimeout(() => this.setFeatures(gameInfo), 1000);
    }
    if (gameInfo) {
      this.setState({ gameInfo });
    }
  };

  setFeatures = gameInfo => {
    const gameId = Math.floor(gameInfo.id / 10);
    const game = games[gameId];
    if (!game || !game.interestedInFeatures) {
      console.log('No features for game');
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
