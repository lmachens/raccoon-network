import { ODK } from 'api/overwolf/overwolf';
import { leagueOfLegends } from './leagueOfLegends';

export interface Game {
  id: number;
  name: string;
  interestedInFeatures: ODK.GameEvents.LOL.TFeaturesLOL[];
}

interface Games {
  [id: string]: Game;
}

const games: Games = {
  [leagueOfLegends.id]: leagueOfLegends
};

export default games;
