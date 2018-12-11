import { ODK } from 'api/overwolf/overwolf';
import {
  IGameSessionComponent,
  IGameSessionPreviewComponent
} from 'ui/components/GameSessionPreview/GameSessionPreview';
import { leagueOfLegends } from './leagueOfLegends';

export interface IGame {
  id: number;
  name: string;
  iconSrc: string;
  interestedInFeatures: ODK.GameEvents.LOL.TFeaturesLOL[];
  GameSessionComponent: React.FunctionComponent<IGameSessionComponent>;
  GameSessionPreviewComponent: React.FunctionComponent<IGameSessionPreviewComponent>;
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
