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
  withStyles,
  WithStyles
} from '@material-ui/core';
import RefreshIcon from '@material-ui/icons/Refresh';
import { findGameSessions, IGameSession } from 'api/stitch/gameSessions';
import React, { SFC, useContext, useEffect, useState } from 'react';
import { CacheContext } from 'ui/contexts/cache';
import ExitButton from '../ExitButton';
import GameSessionPreview from '../GameSessionPreview';

interface IFeedProps extends WithStyles<typeof styles> {}

const styles = createStyles({
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
  }
});

interface IFeedResults {
  gameSessions?: IGameSession[];
}

const Feed: SFC<IFeedProps> = ({ classes }) => {
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
      {loading && <CircularProgress className={classes.loading} />}
      {feedResults.gameSessions &&
        feedResults.gameSessions.map(gameSession => (
          <GameSessionPreview key={gameSession._id} gameSession={gameSession} />
        ))}
    </div>
  );
};

export default withStyles(styles)(Feed);
