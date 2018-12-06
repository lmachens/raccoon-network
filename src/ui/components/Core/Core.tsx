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

interface CoreProps extends WithStyles<typeof styles>, RouteComponentProps<{}> {}

const styles = createStyles({
  buttons: {
    display: 'flex',
    justifyContent: 'space-around'
  }
});

const Core: SFC<CoreProps> = ({ classes, history, location }) => {
  const handleClick = link => () => {
    history.push(link);
  };

  return (
    <>
      <Profile />
      <Search>
        <div className={classes.buttons}>
          <Hidden smUp>
            <IconTextButton
              label="Home"
              icon={<HomeIcon />}
              onClick={handleClick('/feed')}
              selected={location.pathname === '/feed'}
            />
          </Hidden>
          <Hidden xsDown>
            <IconTextButton
              label="Home"
              icon={<HomeIcon />}
              onClick={handleClick('/feed')}
              selected={location.pathname === '/feed' || location.pathname === '/'}
            />
          </Hidden>
          <Tooltip title="Coming soon">
            <div>
              <IconTextButton
                label="Chat"
                icon={<ChatIcon />}
                onClick={handleClick('/chat')}
                disabled
              />
            </div>
          </Tooltip>
          <Tooltip title="Coming soon">
            <div>
              <IconTextButton
                label="Notifications"
                icon={<NotificationsIcon />}
                onClick={handleClick('/notifications')}
                disabled
              />
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
