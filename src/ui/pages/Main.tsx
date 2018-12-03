import { createStyles, Divider, Hidden, withStyles, WithStyles } from '@material-ui/core';
import classNames from 'classnames';
import React, { SFC, useState } from 'react';
import Friends from 'ui/components/Friends';
import Profile from 'ui/components/Profile';
import User from 'ui/components/User';

interface MainProps extends WithStyles<typeof styles> {}

const styles = theme =>
  createStyles({
    root: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      padding: 4,
      backgroundColor: '#f3f3f3'
    },
    fixedRoot: {
      width: 360,
      borderRight: `1px solid ${theme.palette.divider}`
    },
    flex: {
      display: 'flex',
      height: '100%'
    },
    grow: {
      flexGrow: 1,
      overflow: 'auto'
    }
  });

const Core = ({ classes, onSelectUser }) => (
  <>
    <Profile onSelectUser={onSelectUser} />
    <Divider />
    <div className={classes.grow}>
      <Friends />
    </div>
  </>
);

const Main: SFC<MainProps> = ({ classes }) => {
  const [selectedUser, setSelectedUser] = useState<any>(null);

  const handleSelectUser = user => {
    setSelectedUser(user);
  };

  const handleDeselectUser = () => {
    setSelectedUser(null);
  };

  return (
    <>
      <Hidden smUp>
        <div className={classes.root}>
          {selectedUser && <User user={selectedUser} onExit={handleDeselectUser} />}
          {!selectedUser && <Core onSelectUser={handleSelectUser} classes={classes} />}
        </div>
      </Hidden>
      <Hidden xsDown>
        <div className={classes.flex}>
          <div className={classNames(classes.root, classes.fixedRoot)}>
            <Core onSelectUser={handleSelectUser} classes={classes} />
          </div>
          <div className={classes.grow}>
            <User user={selectedUser} />
          </div>
        </div>
      </Hidden>
    </>
  );
};

export default withStyles(styles)(Main);
