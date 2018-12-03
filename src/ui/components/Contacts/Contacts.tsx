import { createStyles, List, ListSubheader, withStyles, WithStyles } from '@material-ui/core';
import React, { SFC } from 'react';
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

const Contacts: SFC<ContactsProps> = ({ classes, className }) => (
  <List
    className={classes.grow}
    subheader={
      <ListSubheader disableGutters className={classes.subheader}>
        Contacts
      </ListSubheader>}
  >
    <Contact profile={{ userId: '123', username: 'Lior' }} />
    <Contact profile={{ userId: 'asdas', username: 'aasd' }} />
  </List>
);

export default withStyles(styles)(Contacts);
