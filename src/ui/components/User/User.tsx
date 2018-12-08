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
  WithStyles,
  withStyles
} from '@material-ui/core';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import PersonAddDisabledIcon from '@material-ui/icons/PersonAddDisabled';
import RefreshIcon from '@material-ui/icons/Refresh';
import { getGameSessions, IGameSession } from 'api/stitch/gameSessions';
import { addContact, getProfile, IUserProfile, removeContact } from 'api/stitch/profile';
import React, { SFC, useContext, useEffect, useState } from 'react';
import { CacheContext } from 'ui/contexts/cache';
import { ProfileContext } from 'ui/contexts/profile';
import ExitButton from '../ExitButton';
import GameSessionPreview from '../GameSessionPreview';

interface IUserProps extends WithStyles<typeof styles> {
  userId: string;
}

const styles = createStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%'
  },
  loading: {
    position: 'absolute',
    left: 'calc(50% - 20px)',
    top: 'calc(50% - 20px)'
  }
});

const User: SFC<IUserProps> = ({ classes, userId }) => {
  const [loading, setLoading] = useState(true);
  const { user, isAnonymous, refreshProfile, profile } = useContext(ProfileContext);

  const isSelf = userId === user!.id;
  const isContact = profile!.contactUserIds && profile!.contactUserIds!.includes(userId);
  const toggleContact = () => {
    if (isContact) {
      removeContact(userId).then(() => {
        refreshProfile();
      });
    } else {
      addContact(userId).then(() => {
        refreshProfile();
      });
    }
  };

  const { state, setCache } = useContext(CacheContext);

  const profileCacheKey = `${userId}-user`;
  const gameSessionsCacheKey = `${userId}-gameSessions`;
  const targetUser: IUserProfile = state[profileCacheKey] || {};
  const gameSessions: IGameSession[] = state[gameSessionsCacheKey] || [];

  useEffect(
    () => {
      handleRefresh();
    },
    [userId]
  );

  const handleRefresh = () => {
    setLoading(true);
    Promise.all([getProfile(userId), getGameSessions(userId)]).then(
      ([foundProfile, foundGameSessions]) => {
        setCache(profileCacheKey, foundProfile);
        setCache(gameSessionsCacheKey, foundGameSessions);
        setLoading(false);
      }
    );
  };
  return (
    <div className={classes.root}>
      <List>
        <ListItem>
          <Hidden smUp>
            <ExitButton />
          </Hidden>
          <ListItemText
            primary={!loading && !targetUser ? 'User not found' : targetUser.username}
          />
          <ListItemSecondaryAction>
            {!loading && targetUser && !isSelf && (
              <IconButton onClick={toggleContact} disabled={isAnonymous || user!.id === userId}>
                {isContact ? <PersonAddDisabledIcon /> : <PersonAddIcon />}
              </IconButton>
            )}
            <IconButton onClick={handleRefresh} disabled={loading}>
              <RefreshIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      </List>
      <Divider />
      {loading && <CircularProgress className={classes.loading} />}
      {gameSessions.map(gameSession => (
        <GameSessionPreview key={gameSession._id} gameSession={gameSession} />
      ))}
      {!loading && gameSessions.length === 0 && (
        <ListItem>
          <ListItemText primary="No games found" />
        </ListItem>
      )}
    </div>
  );
};

export default withStyles(styles)(User);
