import {
  Avatar,
  createStyles,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  withStyles,
  WithStyles
} from '@material-ui/core';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { handleLogout } from 'api/stitch';
import classNames from 'classnames';
import React, { SFC, useContext, useState } from 'react';
import { GamesContext } from 'ui/contexts/games';
import { LoadingContext } from 'ui/contexts/loading';
import { ProfileContext } from 'ui/contexts/profile';

interface ProfileProps extends WithStyles<typeof styles> {
  selectedUser: any;
  onSelectUser(user: any): void;
}

const styles = createStyles({
  profile: {
    display: 'flex',
    alignItems: 'center',
    minHeight: 48,
    padding: 8
  },
  avatar: {
    marginRight: 8
  },
  grow: {
    flexGrow: 1
  },
  inline: {
    display: 'inline'
  },
  selectedUser: {
    backgroundColor: '#d0e6ec'
  }
});

const Profile: SFC<ProfileProps> = ({ classes, onSelectUser, selectedUser }) => {
  const { setLoading } = useContext(LoadingContext);
  const { profile, isAnonymous } = useContext(ProfileContext);
  const { gameInfo } = useContext(GamesContext);
  const [menuAnchor, setMenuAnchor] = useState(null);

  const handleClick = () => {
    onSelectUser(profile);
  };

  const handleActionsClick = event => {
    event.stopPropagation();
    setMenuAnchor(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setMenuAnchor(null);
  };

  const handleLogoutClick = () => {
    setLoading('logout', 'Logging out');
    setMenuAnchor(null);
    handleLogout().then(() => {
      setLoading('logout');
    });
  };

  return (
    <div
      onClick={handleClick}
      className={classNames(classes.profile, {
        [classes.selectedUser]: selectedUser && profile!.userId === selectedUser.userId
      })}
    >
      <Avatar className={classes.avatar}>LM</Avatar>
      <div>
        <Typography>{isAnonymous ? 'Guest' : profile.username}</Typography>
        <Typography>
          <Typography component="span" className={classes.inline} color="textPrimary">
            {(gameInfo && `Playing ${gameInfo.title}`) || 'Not playing a game'}
          </Typography>
        </Typography>
      </div>
      <div className={classes.grow} />
      <IconButton
        aria-owns={menuAnchor ? 'menu' : undefined}
        aria-haspopup="true"
        onClick={handleActionsClick}
      >
        <MoreHorizIcon color="action" />
      </IconButton>
      <Menu id="menu" anchorEl={menuAnchor} open={Boolean(menuAnchor)} onClose={handleCloseMenu}>
        <MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
      </Menu>
    </div>
  );
};

export default withStyles(styles)(Profile);
