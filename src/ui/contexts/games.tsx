import games from 'api/games';
import overwolf from 'api/overwolf';
import { ODK, ODKListenable, ODKRunningGameInfo } from 'api/overwolf/overwolf';
import React from 'react';

interface GamesContextValue {
  events: any;
  gameInfo: any;
  infoUpdates: any;
}
export const GamesContext = React.createContext<GamesContextValue>({
  events: null,
  gameInfo: null,
  infoUpdates: null
});

type GameInfoState = ODKRunningGameInfo | null;
type InfoUpdatesState = ODK.GameEvents.InfoUpdateData[];
interface Event extends ODK.GameEvents.EventData<ODK.GameEvents.LOL.TEventsLOL> {
  screenshotUrld: string;
}
type ErrorsState = Array<ODKListenable<{ error: string; isRelaunching: boolean }>>;

interface GamesProviderState {
  gameInfo: GameInfoState;
  infoUpdates: InfoUpdatesState;
  events: Event[];
  errors: ErrorsState;
}

export class GamesProvider extends React.Component<{}, GamesProviderState> {
  state = {
    gameInfo: null,
    infoUpdates: [],
    events: [],
    errors: []
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
    overwolf.media.takeScreenshot(result => {
      const screenshotUrl = result.url;
      const infoUpdate = { ...newInfoUpdate, screenshotUrl, timestamp };
      console.log(result, infoUpdate);
      this.setState(state => ({
        infoUpdates: [infoUpdate, ...state.infoUpdates]
      }));
    });
  };

  handleNewEvents = eventUpdate => {
    const timestamp = Date.now();
    overwolf.media.takeScreenshot(result => {
      const screenshotUrl = result.url;
      const events = eventUpdate.events.map(event => ({ ...event, screenshotUrl, timestamp }));
      console.log(result, events);
      this.setState(state => ({
        events: [...events, ...state.events]
      }));
    });
  };

  handleError = error => {
    this.setState(state => ({
      errors: [error, ...state.errors]
    }));
  };

  unregisterEvents = () => {
    overwolf.games.events.onError.removeListener(this.handleError);
    overwolf.games.events.onInfoUpdates2.removeListener(this.handleInfoUpdate);
    overwolf.games.events.onNewEvents.removeListener(this.handleNewEvents);
  };

  registerEvents = () => {
    console.log('registerEvents');
    this.unregisterEvents();

    // general events errors
    overwolf.games.events.onError.addListener(this.handleError);

    // "static" data changed (total kills, username, steam-id)
    // This will also be triggered the first time we register
    // for events and will contain all the current information
    overwolf.games.events.onInfoUpdates2.addListener(this.handleInfoUpdate);

    // an event triggerd
    overwolf.games.events.onNewEvents.addListener(this.handleNewEvents);
  };

  handleGameInfoUpdated = gameInfoResult => {
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
    this.setState({ gameInfo });
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
