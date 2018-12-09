import {
  Divider,
  Hidden,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText
} from '@material-ui/core';
import RefreshIcon from '@material-ui/icons/Refresh';
import { makeStyles } from '@material-ui/styles';
import { findGameSessions, IGameSession } from 'api/stitch/gameSessions';
import React, { useContext, useEffect, useState } from 'react';
import { CacheContext } from 'ui/contexts/cache';
import ExitButton from '../ExitButton';
import GameSessionPreview from '../GameSessionPreview';
import Loading from '../Loading';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    position: 'relative'
  },
  results: {
    overflow: 'auto'
  }
});

interface IFeedResults {
  gameSessions?: IGameSession[];
}

const Feed = () => {
  const classes = useStyles({});
  const [loading, setLoading] = useState(true);
  const { state, setCache } = useContext(CacheContext);
  const cacheKey = `feed`;
  const feedResults: IFeedResults = state[cacheKey] || {};

  useEffect(() => {
    handleRefresh();
  }, []);

  const handleRefresh = () => {
    setLoading(true);
    findGameSessions({}, { limit: 10 }).then(result => {
      setCache(cacheKey, {
        gameSessions: result
      });
      setLoading(false);
    });
  };

  return (
    <div className={classes.root}>
      <List>
        <ListItem>
          <Hidden smUp>
            <ExitButton />
          </Hidden>
          <ListItemText primary="Feed" />
        </ListItem>
        <ListItemSecondaryAction>
          <IconButton onClick={handleRefresh} disabled={loading}>
            <RefreshIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </List>
      <Divider />
      {loading && <Loading />}
      <List className={classes.results}>
        {feedResults.gameSessions &&
          feedResults.gameSessions.map(gameSession => (
            <GameSessionPreview key={gameSession._id} gameSession={gameSession} />
          ))}
      </List>
    </div>
  );
};

export default Feed;
