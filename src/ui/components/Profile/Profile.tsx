import {
  Avatar,
  ButtonBase,
  createStyles,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
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
import { TargetContext } from 'ui/contexts/target';

interface ProfileProps extends WithStyles<typeof styles> {}

const styles = createStyles({
  root: {
    padding: 8
  },

  grow: {
    flexGrow: 1
  },
  inline: {
    display: 'inline'
  },
  selected: {
    backgroundColor: '#d0e6ec'
  }
});

const Profile: SFC<ProfileProps> = ({ classes }) => {
  const { target, setTarget } = useContext(TargetContext);
  const { setLoading } = useContext(LoadingContext);
  const { user, profile, isAnonymous } = useContext(ProfileContext);
  const { gameInfo } = useContext(GamesContext);
  const [menuAnchor, setMenuAnchor] = useState(null);

  const handleClick = () => {
    setTarget('profile', user!.id);
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
    <List disablePadding>
      <ListItem
        button
        disableGutters
        onClick={handleClick}
        className={classNames(classes.root, {
          [classes.selected]: target && target.key === 'profile' && user!.id === target.value
        })}
      >
        <ListItemAvatar>
          <Avatar>{profile ? profile.username.slice(0, 2) : '?'}</Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={isAnonymous ? 'Guest' : profile!.username}
          secondary={(gameInfo && `Playing ${gameInfo.title}`) || 'Not playing a game'}
        />
        <ListItemSecondaryAction>
          <IconButton
            aria-owns={menuAnchor ? 'menu' : undefined}
            aria-haspopup="true"
            onClick={handleActionsClick}
          >
            <MoreHorizIcon color="action" />
          </IconButton>
          <Menu
            id="menu"
            anchorEl={menuAnchor}
            open={Boolean(menuAnchor)}
            onClose={handleCloseMenu}
          >
            <MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
          </Menu>
        </ListItemSecondaryAction>
      </ListItem>
    </List>
  );
};

export default withStyles(styles)(Profile);
