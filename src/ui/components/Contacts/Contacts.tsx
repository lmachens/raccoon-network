import {
  createStyles,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  Typography,
  withStyles,
  WithStyles
} from '@material-ui/core';
import { getContacts } from 'api/stitch/profile';
import React, { SFC, useContext, useEffect, useState } from 'react';
import { ProfileContext } from 'ui/contexts/profile';
import Contact from './Contact';

interface ContactsProps extends WithStyles<typeof styles> {
  className: string;
}

const styles = createStyles({
  subheader: {
    padding: '0 8px'
  },

  grow: {
    flexGrow: 1,
    overflow: 'auto'
  }
});

const Contacts: SFC<ContactsProps> = ({ classes, className }) => {
  const [loading, setLoading] = useState(true);
  const [contacts, setContacts] = useState([]);
  const { profile } = useContext(ProfileContext);
  useEffect(
    () => {
      if (profile && profile.contactUserIds) {
        setLoading(true);
        getContacts(profile.contactUserIds).then(result => {
          setContacts(result);
        });
      }
      setLoading(false);
    },
    [profile && profile.contactUserIds && JSON.stringify(profile.contactUserIds)]
  );

  return (
    <List
      className={classes.grow}
      subheader={
        <ListSubheader disableGutters className={classes.subheader}>
          Contacts
        </ListSubheader>}
    >
      {!loading && contacts.length === 0 && (
        <ListItem>
          <ListItemText primary="No contacts found" />
        </ListItem>
      )}
      {contacts.map(contact => (
        <Contact key={contact.userId} profile={contact} />
      ))}
    </List>
  );
};
export default withStyles(styles)(Contacts);
