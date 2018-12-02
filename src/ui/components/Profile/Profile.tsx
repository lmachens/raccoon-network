import {
  Avatar,
  createStyles,
  IconButton,
  Typography,
  withStyles,
  WithStyles
} from '@material-ui/core';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import React, { SFC, useContext } from 'react';
import { GamesContext } from 'ui/contexts/games';
import { ProfileContext } from 'ui/contexts/profile';

interface ProfileProps extends WithStyles<typeof styles> {}

const styles = createStyles({
  profile: {
    display: 'flex',
    alignItems: 'center',
    minHeight: 48
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

const Profile: SFC<ProfileProps> = ({ classes }) => {
  const { user } = useContext(ProfileContext);
  const { gameInfo } = useContext(GamesContext);

  return (
    <div className={classes.profile}>
      <Avatar className={classes.avatar}>LM</Avatar>
      <div>
        <Typography>{user!.profile.email}</Typography>
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
