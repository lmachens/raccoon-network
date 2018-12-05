import { createStyles, Hidden, withStyles, WithStyles } from '@material-ui/core';
import classNames from 'classnames';
import React, { SFC } from 'react';
import { Route, Switch } from 'react-router-dom';
import Feed from 'ui/components/Feed';
import Profile from 'ui/components/Profile';
import Search from 'ui/components/Search';
import User from 'ui/components/User';

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
  return (
    <>
      <Hidden smUp>
        <div className={classes.root}>
          <Switch>
            <Route exact={true} path="/" component={Core} />
            <Route
              exact={true}
              path="/users/:userId"
              render={({ match }) => <User userId={match.params.userId} showExit />}
            />
          </Switch>
        </div>
      </Hidden>
      <Hidden xsDown>
        <div className={classes.flex}>
          <div className={classNames(classes.root, classes.fixedRoot)}>
            <Core />
          </div>
          <div className={classes.grow}>
            <Switch>
              <Route exact={true} path="/" component={Feed} />
              <Route
                exact={true}
                path="/users/:userId"
                render={({ match }) => <User userId={match.params.userId} />}
              />
            </Switch>
          </div>
        </div>
      </Hidden>
    </>
  );
};

export default withStyles(styles)(Main);
