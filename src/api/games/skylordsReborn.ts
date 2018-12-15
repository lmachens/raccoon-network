import SkylordsRebornPreview from 'ui/components/GameSessionPreview/games/SkylordsReborn';
import { IGame } from '.';

export const skylordsReborn: IGame = {
  id: 4784,
  name: 'Skylords Reborn',
  iconSrc: 'assets/games/skylords_reborn.png',
  GameSessionComponent: SkylordsRebornPreview,
  GameSessionPreviewComponent: SkylordsRebornPreview
};
