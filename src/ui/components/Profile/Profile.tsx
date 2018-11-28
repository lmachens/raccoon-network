import {
  Avatar,
  createStyles,
  IconButton,
  Typography,
  withStyles,
  WithStyles
} from '@material-ui/core';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import overwolf from 'api/overwolf';
import { ODKRunningGameInfo } from 'api/overwolf/overwolf';
import React, { SFC, useEffect, useState } from 'react';

interface ProfileProps extends WithStyles<typeof styles> {}

const styles = createStyles({
  profile: {
    display: 'flex',
    alignItems: 'center'
  },
  avatar: {
    marginRight: 4
  },
  grow: {
    flexGrow: 1
  },
  inline: {
    display: 'inline'
  }
});

type ProfileState = ODKRunningGameInfo | null;

const Profile: SFC<ProfileProps> = ({ classes }) => {
  const [gameInfo, setGameInfo] = useState<ProfileState>(null);

  const handleGameInfoUpdated = newGameInfo => {
    console.log(newGameInfo);
    setGameInfo(newGameInfo);
  };

  useEffect(
    () => {
      console.log('use Profile effect');
      overwolf.games.getRunningGameInfo(handleGameInfoUpdated);
      overwolf.games.onGameInfoUpdated.addListener(handleGameInfoUpdated);
      return () => {
        overwolf.games.onGameInfoUpdated.removeListener(handleGameInfoUpdated);
      };
    },
    [gameInfo && gameInfo.title]
  );

  return (
    <div className={classes.profile}>
      <Avatar className={classes.avatar}>LM</Avatar>
      <div>
        <Typography>Leon Machens</Typography>
        <Typography>
          <Typography component="span" className={classes.inline} color="textPrimary">
            {(gameInfo && `Playing ${gameInfo.title}`) || 'Not playing a game'}
          </Typography>
        </Typography>
      </div>
      <div className={classes.grow} />
      <IconButton>
        <MoreHorizIcon color="action" />
      </IconButton>
    </div>
  );
};

export default withStyles(styles)(Profile);
