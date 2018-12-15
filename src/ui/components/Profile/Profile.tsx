import {
  Dialog,
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
import Username from '../Username';

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
  const [openUsernameDialog, setOpenUsernameDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user, profile, isAnonymous } = useContext(ProfileContext);
  const [menuAnchor, setMenuAnchor] = useState(null);

  const needToSetUsername = !isAnonymous && !!profile && !profile.username;
  const handleOpenUsernameDialog = event => {
    event.stopPropagation();
    event.preventDefault();
    setMenuAnchor(null);
    setOpenUsernameDialog(true);
  };

  const handleCloseUsernameDialog = () => {
    setOpenUsernameDialog(false);
  };

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
            <ProfilePicture
              username={profile && profile.username ? profile.username.slice(0, 2) : '?'}
            />
          </ListItemAvatar>
          <ListItemText
            primary={isAnonymous || !profile || !profile.username ? 'Guest' : profile.username}
            secondary={'TBA'}
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
              <MenuItem disabled={loading || isAnonymous} onClick={handleOpenUsernameDialog}>
                Change username
              </MenuItem>
              <MenuItem disabled={loading} onClick={handleLogoutClick}>
                Sign out
              </MenuItem>
            </Menu>
          </ListItemSecondaryAction>
        </ListItem>
      </Link>
      <Dialog
        open={openUsernameDialog || needToSetUsername}
        onClose={handleCloseUsernameDialog}
        disableBackdropClick={needToSetUsername}
        disableEscapeKeyDown={needToSetUsername}
      >
        <Username onClose={handleCloseUsernameDialog} />
      </Dialog>
    </List>
  );
};

export default withRouter(Profile);
