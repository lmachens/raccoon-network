import {
  Avatar,
  createStyles,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
  withStyles,
  WithStyles
} from '@material-ui/core';
import React, { SFC } from 'react';

interface EventProps extends WithStyles<typeof styles> {
  event: any;
  startedAt: number;
}

const styles = createStyles({
  listItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch'
  },
  screenshot: {
    width: 300
  },
  inline: {
    display: 'inline'
  }
});

const formatTime = time => {
  const minutes = Math.floor(time / 60000);
  const seconds = Math.floor((time % 60000) / 1000);

  const minutesString = minutes < 10 ? `0${minutes}` : `${minutes}`;
  const secondsString = seconds < 10 ? `0${seconds}` : `${seconds}`;

  return `${minutesString}:${secondsString}`;
};

const getDetails = event => {
  if (event.name !== 'Highlight') {
    return JSON.stringify(event.data);
  }
  return '';
};

const Event: SFC<EventProps> = ({ classes, event, startedAt }) => {
  return (
    <ListItem className={classes.listItem}>
      <ListItemText
        primary={
          <>
            <Typography component="span" className={classes.inline} variant="overline">
              {formatTime(event.timestamp - startedAt)}
            </Typography>
            <Typography className={classes.inline} component="span">
              - {event.name}
            </Typography>
          </>
        }
        secondary={getDetails(event)}
      />
      {event.screenshotUrl && <img src={event.screenshotUrl} className={classes.screenshot} />}
      {event.replay && (
        <video width="320" height="240" controls>
          <source src={event.replay.url} type="video/mp4" />
        </video>
      )}
    </ListItem>
  );
};

export default withStyles(styles)(Event);
