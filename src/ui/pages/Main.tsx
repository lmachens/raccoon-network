import { Hidden } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Core from 'ui/components/Core';
import Feed from 'ui/components/Feed';
import GameSession from 'ui/components/GameSession';
import User from 'ui/components/User';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    display: 'flex'
  },
  fixedRoot: {
    width: 360,
    minWidth: 360,
    height: '100%',
    borderRight: `1px solid ${theme.palette.divider}`
  },
  grow: {
    flexGrow: 1
  }
}));

const Main = () => {
  const classes = useStyles({});

  const routes = (
    <>
      <Route exact path="/feed" render={() => <Feed />} />
      <Route
        exact
        path="/users/:userId"
        render={({ match }) => <User userId={match.params.userId} />}
      />
      <Route
        exact
        path="/users/:userId/matches/:matchId"
        render={({ match }) => (
          <GameSession userId={match.params.userId} matchId={match.params.matchId} />
        )}
      />
    </>
  );
  return (
    <Switch>
      <div className={classes.root}>
        <Hidden xsDown implementation="css">
          <div className={classes.fixedRoot}>
            <Core />
          </div>
        </Hidden>
        <div className={classes.grow}>
          <Hidden smUp implementation="css">
            <Route exact path="/" component={Core} />
          </Hidden>
          <Hidden xsDown implementation="css">
            <Route exact path="/" component={Feed} />
          </Hidden>
          {routes}
        </div>
      </div>
    </Switch>
  );
};

export default Main;
