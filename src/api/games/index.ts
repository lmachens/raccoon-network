import { ODK } from 'api/overwolf/overwolf';
import { leagueOfLegends } from './leagueOfLegends';

export interface IGame {
  id: number;
  name: string;
  interestedInFeatures: ODK.GameEvents.LOL.TFeaturesLOL[];
}

interface IGames {
  [id: string]: IGame;
}

const games: IGames = {
  [leagueOfLegends.id]: leagueOfLegends
};

export default games;

export const findGames = keyword => {
  return new Promise<IGame[]>(resolve => {
    const filtered = Object.values(games).filter(game => game.name.match(new RegExp(keyword, 'i')));
    resolve(filtered);
  });
};
