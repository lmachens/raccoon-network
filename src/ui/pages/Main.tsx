import {
  Avatar,
  createStyles,
  IconButton,
  Typography,
  withStyles,
  WithStyles
} from '@material-ui/core';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import React, { SFC } from 'react';

interface MainProps extends WithStyles<typeof styles> {}

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
  }
});

const Main: SFC<MainProps> = ({ classes }) => (
  <div>
    <div className={classes.profile}>
      <Avatar className={classes.avatar}>LM</Avatar>
      <Typography>Username</Typography>
      <div className={classes.grow} />
      <IconButton>
        <MoreHorizIcon color="action" />
      </IconButton>
    </div>
  </div>
);

export default withStyles(styles)(Main);
