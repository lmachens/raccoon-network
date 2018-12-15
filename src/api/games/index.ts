import { ODK } from 'api/overwolf/overwolf';
import {
  IGameSessionComponent,
  IGameSessionPreviewComponent
} from 'ui/components/GameSessionPreview/GameSessionPreview';
import { leagueOfLegends } from './leagueOfLegends';
import { skylordsReborn } from './skylordsReborn';

export interface IGame {
  id: number;
  name: string;
  iconSrc: string;
  interestedInFeatures?: ODK.GameEvents.LOL.TFeaturesLOL[];
  GameSessionComponent: React.FunctionComponent<IGameSessionComponent>;
  GameSessionPreviewComponent: React.FunctionComponent<IGameSessionPreviewComponent>;
}

interface IGames {
  [id: string]: IGame;
}

const games: IGames = {
  [leagueOfLegends.id]: leagueOfLegends,
  [skylordsReborn.id]: skylordsReborn
};

export default games;

export const supportedGameIds = Object.keys(games).map(gameId => Number(gameId));

export const findGames = keyword => {
  return new Promise<IGame[]>(resolve => {
    const filtered = Object.values(games).filter(game => game.name.match(new RegExp(keyword, 'i')));
    resolve(filtered);
  });
};
