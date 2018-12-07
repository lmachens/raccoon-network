import {
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
import { addContact, getProfile, IUserProfile, removeContact } from 'api/stitch/profile';
import React, { SFC, useContext, useEffect, useState } from 'react';
import { CacheContext } from 'ui/contexts/cache';
import { ProfileContext } from 'ui/contexts/profile';
import Events from '../Events';
import ExitButton from '../ExitButton';

interface IUserProps extends WithStyles<typeof styles> {
  userId: string;
}

const styles = createStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%'
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

  const cacheKey = `${userId}-user`;
  const targetUser: IUserProfile = state[cacheKey] || [];

  useEffect(
    () => {
      setLoading(true);
      getProfile(userId).then(result => {
        setCache(cacheKey, result);
        setLoading(false);
      });
    },
    [userId]
  );

  return (
    <div className={classes.root}>
      <List>
        {!loading && !targetUser && (
          <ListItem>
            <ListItemText primary="User not found" />
          </ListItem>
        )}
        {targetUser && (
          <ListItem>
            <Hidden smUp>
              <ExitButton />
            </Hidden>
            <ListItemText primary={targetUser.username} />
            {!isSelf && (
              <ListItemSecondaryAction>
                <IconButton onClick={toggleContact} disabled={isAnonymous || user!.id === userId}>
                  {isContact ? <PersonAddDisabledIcon /> : <PersonAddIcon />}
                </IconButton>
              </ListItemSecondaryAction>
            )}
          </ListItem>
        )}
      </List>
      <Divider />
      <Events userId={userId} />
    </div>
  );
};

export default withStyles(styles)(User);
