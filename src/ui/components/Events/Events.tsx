import {
  Avatar,
  createStyles,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
  withStyles,
  WithStyles
} from '@material-ui/core';
import React, { SFC } from 'react';

interface EventsProps extends WithStyles<typeof styles> {}

const styles = createStyles({
  inline: {
    display: 'inline'
  }
});

const Events: SFC<EventsProps> = ({ classes }) => (
  <List>
    <ListItem>
      <ListItemAvatar>
        <Avatar>LoL</Avatar>
      </ListItemAvatar>
      <ListItemText
        primary="Multikill"
        secondary={
          <>
            <Typography component="span" className={classes.inline} color="textPrimary">
              League of Legends
            </Typography>
            {' — 12 minutes ago'}
          </>
        }
      />
    </ListItem>
    <ListItem>
      <ListItemAvatar>
        <Avatar>LoL</Avatar>
      </ListItemAvatar>
      <ListItemText
        primary="Pentakill"
        secondary={
          <>
            <Typography component="span" className={classes.inline} color="textPrimary">
              League of Legends
            </Typography>
            {' — 6 hours ago'}
          </>
        }
      />
    </ListItem>
  </List>
);

export default withStyles(styles)(Events);
