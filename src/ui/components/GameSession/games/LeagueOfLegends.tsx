import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React, { SFC } from 'react';
import { IGameSessionComponent } from '../GameSession';

const useStyles = makeStyles({
  champion: {
    position: 'absolute',
    left: 8,
    top: 4
  },
  gameMode: {
    position: 'absolute',
    left: 8,
    top: 22
  },
  outcome: {
    position: 'absolute',
    right: 8,
    bottom: 4
  },
  stats: {},
  kda: {
    display: 'inline'
  },
  cs: {
    display: 'inline',
    marginLeft: 8
  }
});

const LeagueOfLegends: SFC<IGameSessionComponent> = ({ info }) => {
  const classes = useStyles({});
  return (
    <>
      <Typography className={classes.champion}>{info.champion}</Typography>
      <Typography className={classes.gameMode}>{info.gameMode}</Typography>
      <Typography className={classes.stats}>
        <Typography component="span" className={classes.kda}>
          {info.kills}/{info.deaths}/{info.assists} KDA
        </Typography>
        <Typography component="span" className={classes.cs}>
          {info.minionKills} CS
        </Typography>
      </Typography>
      <Typography className={classes.outcome}>
        {info.endedAt ? info.outcome || 'Ended' : 'In Progress'}
      </Typography>
    </>
  );
};

export default LeagueOfLegends;
