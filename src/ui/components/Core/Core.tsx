import { createStyles, Divider, Hidden, Tooltip, withStyles, WithStyles } from '@material-ui/core';
import ChatIcon from '@material-ui/icons/Chat';
import HomeIcon from '@material-ui/icons/Home';
import NotificationsIcon from '@material-ui/icons/Notifications';
import React, { SFC } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import Contacts from 'ui/components/Contacts';
import IconTextButton from 'ui/components/IconTextButton';
import Profile from 'ui/components/Profile';
import Search from 'ui/components/Search';
import Link from '../Link';

interface ICoreProps extends WithStyles<typeof styles>, RouteComponentProps<{}> {}

const styles = createStyles({
  buttons: {
    display: 'flex',
    justifyContent: 'space-around'
  }
});

const Core: SFC<ICoreProps> = ({ classes, history, location }) => {
  return (
    <>
      <Profile />
      <Search>
        <div className={classes.buttons}>
          <Link to={'/feed'}>
            <Hidden smUp>
              <IconTextButton
                label="Home"
                icon={<HomeIcon />}
                selected={location.pathname === '/feed'}
              />
            </Hidden>
            <Hidden xsDown>
              <IconTextButton
                label="Home"
                icon={<HomeIcon />}
                selected={location.pathname === '/feed' || location.pathname === '/'}
              />
            </Hidden>
          </Link>
          <Tooltip title="Coming soon">
            <div>
              <Link to={'/chat'}>
                <IconTextButton label="Chat" icon={<ChatIcon />} disabled />
              </Link>
            </div>
          </Tooltip>
          <Tooltip title="Coming soon">
            <div>
              <Link to={'/notifications'}>
                <IconTextButton label="Notifications" icon={<NotificationsIcon />} disabled />
              </Link>
            </div>
          </Tooltip>
        </div>
        <Divider />
        <Contacts />
      </Search>
    </>
  );
};

export default compose(
  withStyles(styles),
  withRouter
)(Core);
