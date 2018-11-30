import overwolf from 'api/overwolf';
import { ODK, ODKListenable, ODKRunningGameInfo } from 'api/overwolf/overwolf';
import React, { useEffect, useState } from 'react';

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
type EventsState = Array<ODK.GameEvents.EventData<ODK.GameEvents.LOL.TEventsLOL>>;
type ErrorsState = Array<ODKListenable<{ error: string; isRelaunching: boolean }>>;

interface GamesProviderState {
  gameInfo: GameInfoState;
  infoUpdates: InfoUpdatesState;
  events: EventsState;
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
    overwolf.games.events.onError.removeListener(this.handleError);
    overwolf.games.events.onInfoUpdates2.removeListener(this.handleInfoUpdate);
    overwolf.games.events.onNewEvents.removeListener(this.handleNewEvents);
  }

  handleInfoUpdate = infoUpdate => {
    this.setState(state => ({
      infoUpdates: [infoUpdate, ...state.infoUpdates]
    }));
  };

  handleNewEvents = eventUpdate => {
    this.setState(state => ({
      events: [...eventUpdate.events, ...state.events]
    }));
  };

  handleError = error => {
    this.setState(state => ({
      errors: [error, ...state.errors]
    }));
  };

  registerEvents = () => {
    console.log('registerEvents');
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
    if (lolLaunched(gameInfoResult)) {
      this.registerEvents();
      setTimeout(setFeatures, 1000);
    }

    this.setState({ gameInfo: gameInfoResult.gameInfo });
  };

  handleRunningGameInfo = gameInfo => {
    console.log('handleRunningGameInfo', gameInfo);
    if (lolRunning(gameInfo)) {
      this.registerEvents();
      setTimeout(setFeatures, 1000);
    }
    this.setState({ gameInfo });
  };

  render() {
    const { children } = this.props;

    return <GamesContext.Provider value={this.state}>{children}</GamesContext.Provider>;
  }
}

const interestedInFeatures: ODK.GameEvents.LOL.TFeaturesLOL[] = [
  'summoner_info',
  'gameMode',
  'teams',
  'matchState',
  'spellsAndAbilities',
  'deathAndRespawn',
  'kill',
  'assist',
  'minions'
];

const setFeatures = () => {
  overwolf.games.events.setRequiredFeatures(interestedInFeatures, info => {
    console.log('Set required features:');
    console.log(info);

    if (info.status === 'error') {
      window.setTimeout(setFeatures, 2000);
    }
  });

  overwolf.games.events.onError.addListener(info => {
    console.log('Error: ', info);
  });
};

const lolLaunched = gameInfoResult => {
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

  // NOTE: we divide by 10 to get the game class id without it's sequence number
  if (Math.floor(gameInfoResult.gameInfo.id / 10) !== 5426) {
    return false;
  }

  console.log('LoL Launched');
  return true;
};

const lolRunning = gameInfo => {
  if (!gameInfo) {
    return false;
  }

  if (!gameInfo.isRunning) {
    return false;
  }

  // NOTE: we divide by 10 to get the game class id without it's sequence number
  if (Math.floor(gameInfo.id / 10) !== 5426) {
    return false;
  }

  console.log('LoL running');
  return true;
};
