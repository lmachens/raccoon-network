import { Typography } from '@material-ui/core';
import React from 'react';

const LeagueGame = ({ info }) => {
  return (
    <Typography>
      {info.champion} | {info.gameMode} | Alive: {info.alive ? 'true' : 'false'} Level: {info.level}{' '}
      KDA: {info.kills}/{info.deaths}/{info.assists} CS: {info.minionKills}
    </Typography>
  );
};

export default LeagueGame;
