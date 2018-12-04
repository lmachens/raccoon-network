import React from 'react';

const LeagueGame = ({ info }) => {
  return (
    <div>
      {info.champion} | {info.gameMode} | Alive: {info.alive ? 'true' : 'false'} Level: {info.level}{' '}
      KDA: {info.kills}/{info.deaths}/{info.assists} CS: {info.minionKills}
    </div>
  );
};

export default LeagueGame;
