import {
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Menu,
  MenuItem
} from '@material-ui/core';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { makeStyles } from '@material-ui/styles';
import { handleLogout } from 'api/stitch';
import classNames from 'classnames';
import React, { SFC, useContext, useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { ProfileContext } from 'ui/contexts/profile';
import Link from '../Link';
import Loading from '../Loading';
import ProfilePicture from '../ProfilePicture';

interface IProfileProps extends RouteComponentProps<{}> {}

const useStyles = makeStyles(theme => ({
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
}));

const Profile: SFC<IProfileProps> = ({ location, history }) => {
  const classes = useStyles({});
  const [loading, setLoading] = useState(false);
  const { user, profile, isAnonymous } = useContext(ProfileContext);
  const [menuAnchor, setMenuAnchor] = useState(null);

  const handleActionsClick = event => {
    event.stopPropagation();
    event.preventDefault();
    setMenuAnchor(event.currentTarget);
  };

  const handleCloseMenu = event => {
    event.stopPropagation();
    event.preventDefault();
    setMenuAnchor(null);
  };

  const handleLogoutClick = event => {
    event.stopPropagation();
    event.preventDefault();
    setLoading(true);
    setMenuAnchor(null);
    handleLogout()
      .then(() => {
        history.push('/');
      })
      .catch(() => {
        setLoading(false);
      });
  };

  return (
    <List disablePadding>
      {loading && <Loading />}
      <Link to={`/users/${user!.id}`}>
        <ListItem
          button
          className={classNames(classes.root, {
            [classes.selected]: location.pathname === `/users/${user!.id}`
          })}
        >
          <ListItemAvatar>
            <ProfilePicture username={profile ? profile.username.slice(0, 2) : '?'} />
          </ListItemAvatar>
          <ListItemText primary={isAnonymous ? 'Guest' : profile!.username} secondary={'TBA'} />
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
              <MenuItem disabled={loading} onClick={handleLogoutClick}>
                Logout
              </MenuItem>
            </Menu>
          </ListItemSecondaryAction>
        </ListItem>
      </Link>
    </List>
  );
};

export default withRouter(Profile);
