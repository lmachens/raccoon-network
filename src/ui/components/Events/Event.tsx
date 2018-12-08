import {
  createStyles,
  ListItem,
  ListItemText,
  Typography,
  withStyles,
  WithStyles
} from '@material-ui/core';
import { IEvent } from 'api/stitch/gameSessions';
import React, { SFC } from 'react';

interface IEventProps extends WithStyles<typeof styles> {
  event: IEvent;
  startedAt: Date;
}

const styles = createStyles({
  listItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch'
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

const Event: SFC<IEventProps> = ({ classes, event, startedAt }) => {
  return (
    <ListItem className={classes.listItem}>
      <ListItemText
        primary={
          <>
            <Typography component="span" className={classes.inline} variant="overline">
              {formatTime(event.timestamp.getTime() - startedAt.getTime())}
            </Typography>
            <Typography className={classes.inline} component="span">
              - {event.name}
            </Typography>
          </>
        }
        secondary={getDetails(event)}
      />
      {event.video && <div dangerouslySetInnerHTML={{ __html: event.video.assets.iframe }} />}
    </ListItem>
  );
};

export default withStyles(styles)(Event);
