import { createStyles, Hidden, withStyles, WithStyles } from '@material-ui/core';
import classNames from 'classnames';
import React, { SFC } from 'react';
import { Route, Switch } from 'react-router-dom';
import Core from 'ui/components/Core';
import Feed from 'ui/components/Feed';
import GameSession from 'ui/components/GameSession';
import User from 'ui/components/User';

interface IMainProps extends WithStyles<typeof styles> {}

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

const Main: SFC<IMainProps> = ({ classes }) => {
  return (
    <>
      <Hidden smUp>
        <div className={classes.root}>
          <Switch>
            <Route exact path="/" component={Core} />
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
              <Route exact path="/" component={Feed} />
              <Route exact path="/feed" component={Feed} />
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
            </Switch>
          </div>
        </div>
      </Hidden>
    </>
  );
};

export default withStyles(styles)(Main);
