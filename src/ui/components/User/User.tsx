import {
  createStyles,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  WithStyles,
  withStyles
} from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import PersonAddDisabledIcon from '@material-ui/icons/PersonAddDisabled';
import { addContact, getProfile, removeContact, UserProfile } from 'api/stitch/profile';
import React, { SFC, useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ProfileContext } from 'ui/contexts/profile';
import Events from '../Events';

interface UserProps extends WithStyles<typeof styles> {
  userId: string;
  showExit?: boolean;
}
const styles = createStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%'
  }
});

const User: SFC<UserProps> = ({ classes, showExit, userId }) => {
  const { user, isAnonymous, refreshProfile, profile } = useContext(ProfileContext);
  const [targetUser, setTargetUser] = useState<UserProfile | null>(null);

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

  useEffect(
    () => {
      getProfile(userId).then(setTargetUser);
    },
    [userId]
  );

  return (
    <div className={classes.root}>
      <List>
        <ListItem>
          {showExit && (
            <Link style={{ textDecoration: 'none' }} to="/">
              <IconButton>
                <ArrowBackIcon />
              </IconButton>
            </Link>
          )}
          <ListItemText primary={targetUser && targetUser.username} />
          {!isSelf && (
            <ListItemSecondaryAction>
              <IconButton onClick={toggleContact} disabled={isAnonymous || user!.id === userId}>
                {isContact ? <PersonAddDisabledIcon /> : <PersonAddIcon />}
              </IconButton>
            </ListItemSecondaryAction>
          )}
        </ListItem>
      </List>
      <Divider />
      <Events userId={userId} />
    </div>
  );
};

export default withStyles(styles)(User);
