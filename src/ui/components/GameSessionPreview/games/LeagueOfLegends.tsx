import { Avatar, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React, { SFC } from 'react';
import { IGameSessionPreviewComponent } from '../GameSessionPreview';
import Outcome from '../partials/Outcome';

const useStyles = makeStyles({
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
    backgroundColor: 'black',
    backgroundSize: 'cover',
    backgroundPosition: 'center 15%'
  },
  foreground: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
    zIndex: 1,
    color: 'white',
    textShadow: '0 -1px #000000, 1px 0 #000000, 0 1px #000000, -1px 0 #000000'
  },
  champion: {
    position: 'absolute',
    left: 8,
    top: 8,
    boxShadow: '1px 1px #ffffff52'
  },
  gameMode: {
    position: 'absolute',
    left: 8,
    bottom: 4,
    textTransform: 'capitalize'
  },
  outcome: {
    position: 'absolute',
    right: 8,
    bottom: 4
  },
  kdaBox: {
    position: 'absolute',
    left: 70,
    top: 10
  },
  csBox: {
    position: 'absolute',
    left: 160,
    top: 10
  }
});

const LeagueOfLegends: SFC<IGameSessionPreviewComponent> = ({ info }) => {
  const classes = useStyles({});
  return (
    <>
      <div
        className={classes.background}
        style={{
          backgroundImage: `url(https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${
            info.champion
          }_0.jpg)`
        }}
      />
      <div className={classes.foreground}>
        <Avatar
          className={classes.champion}
          src={`https://ddragon.leagueoflegends.com/cdn/8.24.1/img/champion/${info.champion}.png`}
        />

        <Typography className={classes.gameMode} color="inherit">
          {info.gameMode}
        </Typography>

        <div className={classes.kdaBox}>
          <Typography color="inherit">
            {info.kills}/{info.deaths}/{info.assists}
          </Typography>
          <Typography color="inherit" variant="caption">
            {(Math.round(((info.kills + info.assists) / info.deaths) * 100) / 100).toFixed(2)} KDA
          </Typography>
        </div>

        <div className={classes.csBox}>
          <Typography color="inherit">{info.minionKills} CS</Typography>
        </div>

        <Outcome
          className={classes.outcome}
          outcome={info.endedAt ? info.outcome || 'ended' : 'inProgress'}
        />
      </div>
    </>
  );
};

export default LeagueOfLegends;
