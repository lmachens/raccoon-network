import {
  CircularProgress,
  createStyles,
  Divider,
  Hidden,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Paper,
  withStyles,
  WithStyles
} from '@material-ui/core';
import RefreshIcon from '@material-ui/icons/Refresh';
import games from 'api/games';
import { getGameSession, IGameSession, IMatchInfo } from 'api/stitch/gameSessions';
import { sortEvent } from 'api/utilities';
import React, { SFC, useContext, useEffect, useState } from 'react';
import { CacheContext } from 'ui/contexts/cache';
import Event from '../Event';
import ExitButton from '../ExitButton';

export interface IGameSessionComponent {
  info: IMatchInfo;
}

interface IGameSessionProps extends WithStyles<typeof styles> {
  userId: string;
  matchId: string;
}

const styles = theme =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      position: 'relative'
    },
    loading: {
      position: 'absolute',
      left: 'calc(50% - 20px)',
      top: 'calc(50% - 20px)'
    },
    gameSession: {
      height: 100,
      margin: 20,
      position: 'relative',
      display: 'inline-flex',
      verticalAlign: 'middle',
      justifyContent: 'center',
      alignItems: 'center'
    },
    events: {
      overflow: 'auto',
      flex: 1
    }
  });

const GameSession: SFC<IGameSessionProps> = ({ classes, userId, matchId }) => {
  const [loading, setLoading] = useState(true);
  const { state, setCache } = useContext(CacheContext);

  const cacheKey = `${userId}-match-${matchId}`;
  const gameSession: IGameSession = state[cacheKey];

  useEffect(() => {
    handleRefresh();
  }, []);

  const handleRefresh = () => {
    setLoading(true);
    getGameSession({ userId, matchId }).then(result => {
      setCache(cacheKey, result);
      setLoading(false);
    });
  };

  const game = gameSession && games[gameSession.gameId];
  const Component = game && game.GameSessionComponent;
  return (
    <div className={classes.root}>
      <List>
        <ListItem>
          <Hidden smUp>
            <ExitButton />
          </Hidden>
          <ListItemText primary={!loading && !gameSession ? 'Match not found' : matchId} />
        </ListItem>
        <ListItemSecondaryAction>
          <IconButton onClick={handleRefresh} disabled={loading}>
            <RefreshIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </List>
      <Divider />
      {loading && <CircularProgress className={classes.loading} />}
      {gameSession && (
        <Paper className={classes.gameSession}>
          <Component info={gameSession.info} />
        </Paper>
      )}
      {gameSession && (
        <List className={classes.events}>
          {gameSession.events.sort(sortEvent).map((event, i) => (
            <Event key={i} event={event} startedAt={gameSession.info.startedAt!} />
          ))}
        </List>
      )}
    </div>
  );
};
export default withStyles(styles)(GameSession);
