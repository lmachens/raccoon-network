import { ODK } from 'api/overwolf/overwolf';
import { csgo } from './csgo';
import { heartstone } from './hearthstone';
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
  [leagueOfLegends.id]: leagueOfLegends,
  [heartstone.id]: heartstone,
  [csgo.id]: csgo
};

export default games;

export const findGames = keyword => {
  return new Promise<IGame[]>(resolve => {
    const filtered = Object.values(games).filter(game => game.name.match(new RegExp(keyword, 'i')));
    resolve(filtered);
  });
};
