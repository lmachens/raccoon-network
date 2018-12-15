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
    backgroundSize: 'contain',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'
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
  outcome: {
    position: 'absolute',
    right: 8,
    bottom: 4
  }
});

const SkylordsReborn: SFC<IGameSessionPreviewComponent> = ({ info }) => {
  const classes = useStyles({});
  return (
    <>
      <div
        className={classes.background}
        style={{
          backgroundImage: `url(assets/games/skylords_reborn_full.png)`
        }}
      />
      <div className={classes.foreground}>
        <Outcome className={classes.outcome} outcome={info.endedAt ? 'ended' : 'inProgress'} />
      </div>
    </>
  );
};

export default SkylordsReborn;
