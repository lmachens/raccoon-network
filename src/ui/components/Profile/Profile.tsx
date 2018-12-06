import {
  Avatar,
  createStyles,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Menu,
  MenuItem,
  withStyles,
  WithStyles
} from '@material-ui/core';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { handleLogout } from 'api/stitch';
import classNames from 'classnames';
import React, { SFC, useContext, useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { GamesContext } from 'ui/contexts/games';
import { LoadingContext } from 'ui/contexts/loading';
import { ProfileContext } from 'ui/contexts/profile';

interface ProfileProps extends WithStyles<typeof styles>, RouteComponentProps<{}> {}

const styles = theme =>
  createStyles({
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
      backgroundColor: `${theme.palette.action.selected} !important`
    }
  });

const Profile: SFC<ProfileProps> = ({ classes, history, location }) => {
  const { setLoading } = useContext(LoadingContext);
  const { user, profile, isAnonymous } = useContext(ProfileContext);
  const { gameInfo } = useContext(GamesContext);
  const [menuAnchor, setMenuAnchor] = useState(null);

  const handleActionsClick = event => {
    event.stopPropagation();
    event.preventDefault();
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

  const handleClick = () => {
    history.push(`/users/${user!.id}`);
  };

  return (
    <List disablePadding>
      <ListItem
        button
        onClick={handleClick}
        className={classNames(classes.root, {
          [classes.selected]: location.pathname === `/users/${user!.id}`
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

export default compose(
  withStyles(styles),
  withRouter
)(Profile);
