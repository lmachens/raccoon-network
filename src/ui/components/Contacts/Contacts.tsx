import { List, ListItem, ListItemText, ListSubheader } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { getContacts, IUserProfile } from 'api/stitch/profile';
import React, { SFC, useContext, useEffect, useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { CacheContext } from 'ui/contexts/cache';
import { ProfileContext } from 'ui/contexts/profile';
import Contact from '../Contact';
import Link from '../Link';

interface IContactsProps extends RouteComponentProps<{}> {}

const useStyles = makeStyles({
  subheader: {
    padding: '0 8px'
  },
  grow: {
    flexGrow: 1,
    overflow: 'auto'
  }
});

const Contacts: SFC<IContactsProps> = ({ location }) => {
  const classes = useStyles({});
  const [loading, setLoading] = useState(false);
  const { profile, isAnonymous } = useContext(ProfileContext);
  const { state, setCache } = useContext(CacheContext);

  const cacheKey = 'contacts';
  const contacts: IUserProfile[] = state[cacheKey] || [];

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

  return (
    <List
      className={classes.grow}
      subheader={<ListSubheader className={classes.subheader}>Contacts</ListSubheader>}
    >
      {!loading && contacts.length === 0 && (
        <ListItem>
          <ListItemText
            primary={isAnonymous ? 'You can not have contacts as guest' : 'No contacts found'}
          />
        </ListItem>
      )}
      {contacts.map(contact => (
        <Link key={contact.userId} to={`/users/${contact.userId}`}>
          <Contact profile={contact} selected={location.pathname === `/users/${contact.userId}`} />
        </Link>
      ))}
    </List>
  );
};
export default withRouter(Contacts);
