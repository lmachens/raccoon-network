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
import React, { SFC, useContext } from 'react';
import { GamesContext } from 'ui/contexts/games';

interface EventsProps extends WithStyles<typeof styles> {}

const styles = createStyles({
  inline: {
    display: 'inline'
  },
  screenshot: {
    width: 300
  }
});

const Events: SFC<EventsProps> = ({ classes }) => {
  const { events, infoUpdates } = useContext(GamesContext);

  return (
    <List>
      {events.map((event, i) => (
        <ListItem key={i}>
          <ListItemAvatar>
            <Avatar>LoL</Avatar>
          </ListItemAvatar>
          <ListItemText primary={event.name} secondary={JSON.stringify(event.data)} />
          {event.screenshotUrl && <img src={event.screenshotUrl} className={classes.screenshot} />}
        </ListItem>
      ))}
      {infoUpdates.map((infoUpdate, i) => (
        <ListItem key={i}>
          <ListItemAvatar>
            <Avatar>LoL</Avatar>
          </ListItemAvatar>
          <ListItemText primary={infoUpdate.feature} secondary={JSON.stringify(infoUpdate.info)} />
          {infoUpdate.screenshotUrl && (
            <img src={infoUpdate.screenshotUrl} className={classes.screenshot} />
          )}
        </ListItem>
      ))}
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
};

export default withStyles(styles)(Events);
