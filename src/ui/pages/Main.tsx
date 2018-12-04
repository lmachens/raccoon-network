import { createStyles, Hidden, withStyles, WithStyles } from '@material-ui/core';
import classNames from 'classnames';
import React, { SFC, useContext, useState } from 'react';
import Profile from 'ui/components/Profile';
import Search from 'ui/components/Search';
import User from 'ui/components/User';
import { TargetContext } from 'ui/contexts/target';

interface MainProps extends WithStyles<typeof styles> {}

const styles = theme =>
  createStyles({
    root: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: '#f3f3f3'
    },
    fixedRoot: {
      width: 360,
      minWidth: 360,
      borderRight: `1px solid ${theme.palette.divider}`
    },
    flex: {
      display: 'flex',
      height: '100%'
    },
    grow: {
      flexGrow: 1
    }
  });

const Core = () => (
  <>
    <Profile />
    <Search />
  </>
);

const Main: SFC<MainProps> = ({ classes }) => {
  const { target } = useContext(TargetContext);

  return (
    <>
      <Hidden smUp>
        <div className={classes.root}>
          {target && <User showExit />}
          {!target && <Core />}
        </div>
      </Hidden>
      <Hidden xsDown>
        <div className={classes.flex}>
          <div className={classNames(classes.root, classes.fixedRoot)}>
            <Core />
          </div>
          <div className={classes.grow}>{target && <User />}</div>
        </div>
      </Hidden>
    </>
  );
};

export default withStyles(styles)(Main);
