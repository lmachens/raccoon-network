import {
  Avatar,
  createStyles,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
  withStyles,
  WithStyles
} from '@material-ui/core';
import React, { SFC } from 'react';

interface FriendsProps extends WithStyles<typeof styles> {}

const styles = createStyles({
  inline: {
    display: 'inline'
  }
});

const Friends: SFC<FriendsProps> = ({ classes }) => (
  <List>
    <ListItem>
      <ListItemAvatar>
        <Avatar>LH</Avatar>
      </ListItemAvatar>
      <ListItemText
        primary="Lior Haim"
        secondary={
          <>
            <Typography component="span" className={classes.inline} color="textPrimary">
              Playing League of Legends
            </Typography>
            {' — Penta Kill!!'}
          </>
        }
      />
    </ListItem>
    <ListItem>
      <ListItemAvatar>
        <Avatar>AL</Avatar>
      </ListItemAvatar>
      <ListItemText
        primary="Asaf Livne"
        secondary={
          <>
            <Typography component="span" className={classes.inline} color="textPrimary">
              Playing Counter Strike
            </Typography>
            {' — Multikill!!'}
          </>
        }
      />
    </ListItem>
  </List>
);

export default withStyles(styles)(Friends);
