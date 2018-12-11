import LeagueOfLegends from 'ui/components/GameSession/games/LeagueOfLegends';
import LeagueOfLegendsPreview from 'ui/components/GameSessionPreview/games/LeagueOfLegends';
import { IGame } from '.';

export const leagueOfLegends: IGame = {
  id: 5426,
  name: 'League of Legends',
  iconSrc: 'assets/games/league_of_legends.png',
  interestedInFeatures: [
    'matchState',
    'death',
    'respawn',
    'abilities',
    'kill',
    'assist',
    // 'gold',
    'minions',
    'summoner_info',
    'gameMode',
    'teams',
    'level',
    'announcer'
  ],
  GameSessionComponent: LeagueOfLegends,
  GameSessionPreviewComponent: LeagueOfLegendsPreview
};
