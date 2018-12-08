import { createStyles, Typography, withStyles, WithStyles } from '@material-ui/core';
import React, { SFC } from 'react';
import { IGameSessionComponent } from '../GameSession';

interface ILeagueOfLegendsProps extends IGameSessionComponent, WithStyles<typeof styles> {}

const styles = createStyles({
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

const LeagueOfLegends: SFC<ILeagueOfLegendsProps> = ({ classes, info }) => {
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
      <Typography className={classes.outcome}>{info.outcome || 'In Progress'}</Typography>
    </>
  );
};

export default withStyles(styles)(LeagueOfLegends) as React.FunctionComponent<
  IGameSessionComponent
>;
