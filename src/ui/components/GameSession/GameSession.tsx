import {
  Divider,
  Hidden,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Paper
} from '@material-ui/core';
import RefreshIcon from '@material-ui/icons/Refresh';
import { makeStyles } from '@material-ui/styles';
import games from 'api/games';
import { getGameSession, IGameSession, IMatchInfo } from 'api/stitch/gameSessions';
import { sortEvent } from 'api/utilities';
import React, { SFC, useContext, useEffect, useState } from 'react';
import { CacheContext } from 'ui/contexts/cache';
import ExitButton from '../ExitButton';
import GameSessionEvent from '../GameSessionEvent';
import { allEventDetails } from '../GameSessionEvent/GameSessionEvent';
import Loading from '../Loading';

export interface IGameSessionComponent {
  info: IMatchInfo;
}

interface IGameSessionProps {
  userId: string;
  matchId: string;
}

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    position: 'relative'
  },
  gameSession: {
    height: 100,
    margin: 20,
    position: 'relative',
    textAlign: 'center'
  },
  events: {
    overflow: 'auto',
    flex: 1
  }
});

const filterEvents = event => {
  if (event.name === 'highlight') {
    return true;
  }
  if (allEventDetails[event.name] && allEventDetails[event.name][event.data.name]) {
    return true;
  }
  return false;
};

let refreshInterval: any = null;
const GameSession: SFC<IGameSessionProps> = ({ userId, matchId }) => {
  const classes = useStyles({});
  const [loading, setLoading] = useState(false);
  const { state, setCache } = useContext(CacheContext);

  const cacheKey = `${userId}-match-${matchId}`;
  const gameSession: IGameSession = state[cacheKey];

  useEffect(
    () => {
      if (!gameSession) {
        handleRefresh();
      } else if (!gameSession.info.endedAt && !refreshInterval) {
        console.log('GameSession not endet -> set refresh interval');
        refreshInterval = setInterval(handleSilentRefresh, 10000);
      } else if (gameSession.info.endedAt && refreshInterval) {
        console.log('GameSession endet -> clear refresh interval');
        clearInterval(refreshInterval);
        refreshInterval = null;
      }

      return () => {
        console.log('GameSession destructed -> clear refresh interval');
        clearInterval(refreshInterval);
        refreshInterval = null;
      };
    },
    [gameSession]
  );

  const handleSilentRefresh = () => {
    getGameSession({ userId, matchId }).then(result => {
      setCache(cacheKey, result);
    });
  };

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
          <Hidden smUp implementation="css">
            <ExitButton />
          </Hidden>
          <ListItemText
            primary={
              !loading && !gameSession
                ? 'Match not found'
                : gameSession && game
                ? `${gameSession.profile.username} played ${game.name}`
                : ''
            }
          />
        </ListItem>
        <ListItemSecondaryAction>
          <IconButton onClick={handleRefresh} disabled={loading}>
            <RefreshIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </List>
      <Divider />
      {loading && <Loading />}
      {gameSession && (
        <Paper className={classes.gameSession}>
          <Component info={gameSession.info} />
        </Paper>
      )}
      {gameSession && (
        <List className={classes.events}>
          {gameSession.events
            .filter(filterEvents)
            .sort(sortEvent)
            .map(event => (
              <GameSessionEvent
                key={event.timestamp.getTime()}
                event={event}
                startedAt={gameSession.info.startedAt!}
              />
            ))}
        </List>
      )}
    </div>
  );
};
export default GameSession;
