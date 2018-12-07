import {
  createStyles,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  withStyles,
  WithStyles
} from '@material-ui/core';
import { getContacts, UserProfile } from 'api/stitch/profile';
import React, { SFC, useContext, useEffect, useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { CacheContext } from 'ui/contexts/cache';
import { ProfileContext } from 'ui/contexts/profile';
import Contact from './Contact';

interface ContactsProps extends WithStyles<typeof styles>, RouteComponentProps<{}> {}

const styles = createStyles({
  subheader: {
    padding: '0 8px'
  },

  grow: {
    flexGrow: 1,
    overflow: 'auto'
  }
});

const Contacts: SFC<ContactsProps> = ({ classes, history, location }) => {
  const [loading, setLoading] = useState(true);
  const { profile } = useContext(ProfileContext);
  const { state, setCache } = useContext(CacheContext);

  const cacheKey = 'contacts';
  const contacts: UserProfile[] = state[cacheKey] || [];

  useEffect(
    () => {
      if (profile && profile.contactUserIds) {
        setLoading(true);
        getContacts(profile.contactUserIds).then(result => {
          setCache(cacheKey, result);
          setLoading(false);
        });
      }
    },
    [profile && profile.contactUserIds && JSON.stringify(profile.contactUserIds)]
  );

  const handleClick = contact => () => {
    history.push(`/users/${contact.userId}`);
  };

  return (
    <List
      className={classes.grow}
      subheader={<ListSubheader className={classes.subheader}>Contacts</ListSubheader>}
    >
      {!loading && contacts.length === 0 && (
        <ListItem>
          <ListItemText primary="No contacts found" />
        </ListItem>
      )}
      {contacts.map(contact => (
        <Contact
          key={contact.userId}
          profile={contact}
          selected={location.pathname === `/users/${contact.userId}`}
          onClick={handleClick(contact)}
        />
      ))}
    </List>
  );
};
export default compose(
  withStyles(styles),
  withRouter
)(Contacts);
