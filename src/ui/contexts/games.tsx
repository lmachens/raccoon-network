import games from 'api/games';
import overwolf from 'api/overwolf';
import { ODK, ODKListenable, ODKRunningGameInfo } from 'api/overwolf/overwolf';
import React from 'react';

interface GamesContextValue {
  events: any;
  gameInfo: any;
  matchInfo: any;
}
export const GamesContext = React.createContext<GamesContextValue>({
  events: null,
  gameInfo: null,
  matchInfo: null
});

type GameInfoState = ODKRunningGameInfo | null;
interface Event extends ODK.GameEvents.EventData<ODK.GameEvents.LOL.TEventsLOL> {
  screenshotUrld: string;
}

interface GamesProviderState {
  gameInfo: GameInfoState;
  events: Event[];
  matchInfo: any;
}

const defaultMatchInfo = {
  alive: true,
  level: 1,
  kills: 0,
  deaths: 0,
  assists: 0,
  minionKills: 0,
  gold: 0,
  startedAt: 0
};

export class GamesProvider extends React.Component<{}, GamesProviderState> {
  state = {
    gameInfo: null,
    matchInfo: null,
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
    const timestamp = Date.now();
    const infoUpdate = { ...newInfoUpdate, timestamp };
    const { game_info = {}, level = {}, summoner_info = {} } = infoUpdate.info;

    this.setState(state => ({
      matchInfo: {
        ...defaultMatchInfo,
        ...state.matchInfo,
        ...game_info,
        ...level,
        ...summoner_info
      }
    }));
  };

  handleNewEvents = eventUpdate => {
    const timestamp = Date.now();

    const events = eventUpdate.events;
    const announcerEvents = events
      .filter(event => event.name === 'announcer')
      .map(event => {
        const data =
          typeof event.data === 'string'
            ? JSON.parse(event.data.replace('\r', '').replace('\n', ''))
            : event.data;
        return { ...data, timestamp };
      });
    if (announcerEvents.length) {
      this.setState(state => ({
        events: [...announcerEvents, ...state.events]
      }));
    }

    const matchStarted = !!events.find(event => event.name === 'matchStart');
    if (matchStarted) {
      this.setState(state => ({
        matchInfo: { ...state.matchInfo, startedAt: timestamp }
      }));
    }
    const matchOutcome = events.find(event => event.name === 'matchOutcome');
    if (matchOutcome) {
      this.setState(state => ({
        matchInfo: { ...state.matchInfo, endedAt: timestamp, outcome: matchOutcome }
      }));
    }

    const died = !!events.find(event => event.name === 'death');
    const respawnded = !!events.find(event => event.name === 'respawn');

    if (died || respawnded) {
      const alive = respawnded || !died;

      this.setState(state => ({
        matchInfo: { ...state.matchInfo, alive }
      }));
    }
  };

  handleError = error => {
    console.log('Handle Error', error);
  };

  unregisterEvents = () => {
    overwolf.games.events.onError.removeListener(this.handleError);
    overwolf.games.events.onInfoUpdates2.removeListener(this.handleInfoUpdate);
    overwolf.games.events.onNewEvents.removeListener(this.handleNewEvents);
  };

  registerEvents = () => {
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
  };

  getInfo = () => {
    overwolf.games.events.getInfo(result => {
      if (result.status === 'success') {
        console.log('getInfo:', result);
        const { game_info = {}, level = {}, summoner_info = {} } = result.res || {};
        this.setState({
          matchInfo: {
            ...defaultMatchInfo,
            ...game_info,
            ...level,
            ...summoner_info,
            startedAt: Date.now()
          }
        });
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
