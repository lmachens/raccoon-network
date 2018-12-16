import { Divider, Hidden, Tooltip } from '@material-ui/core';
import ChatIcon from '@material-ui/icons/Chat';
import HomeIcon from '@material-ui/icons/Home';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { makeStyles } from '@material-ui/styles';
import React, { SFC } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import Contacts from 'ui/components/Contacts';
import IconTextButton from 'ui/components/IconTextButton';
import Profile from 'ui/components/Profile';
import Search from 'ui/components/Search';
import Link from '../Link';

interface ICoreProps extends RouteComponentProps<{}> {}

const useStyles = makeStyles({
  root: {
    backgroundColor: '#f3f3f3',
    height: '100%',
    width: '100%'
  },
  buttons: {
    display: 'flex',
    justifyContent: 'space-around'
  }
});

const Core: SFC<ICoreProps> = ({ location }) => {
  const classes = useStyles({});
  return (
    <div className={classes.root}>
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
    </div>
  );
};

export default withRouter(Core);
