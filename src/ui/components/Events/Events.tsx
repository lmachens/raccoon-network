import {
  Avatar,
  Collapse,
  createStyles,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListSubheader,
  withStyles,
  WithStyles
} from '@material-ui/core';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { GameSession, getGameSessions } from 'api/stitch/gameSessions';
import React, { SFC, useEffect, useState } from 'react';

interface EventsProps extends WithStyles<typeof styles> {
  userId: string;
}

const styles = theme =>
  createStyles({
    root: {
      backgroundColor: theme.palette.background.paper
    },
    flex: {
      display: 'flex'
    },
    grow: {
      flexGrow: 1
    },
    screenshot: {
      width: 300
    },
    listSection: {
      backgroundColor: 'inherit'
    },
    ul: {
      backgroundColor: 'inherit',
      padding: 0
    }
  });

const formatTime = time => {
  const minutes = Math.floor(time / 60000);
  const seconds = Math.floor((time % 60000) / 1000);

  const minutesString = minutes < 10 ? `0${minutes}` : `${minutes}`;
  const secondsString = seconds < 10 ? `0${seconds}` : `${seconds}`;

  return `${minutesString}:${secondsString}`;
};

const Events: SFC<EventsProps> = ({ classes, userId }) => {
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(true);

  // const { events, matchInfo } = useContext(GamesContext);
  const [gameSessions, setGameSessions] = useState<GameSession[]>([]);

  const handleExpand = () => {
    setOpen(!open);
  };

  useEffect(
    () => {
      setLoading(true);
      getGameSessions(userId).then(result => {
        setGameSessions(result);
        setLoading(false);
      });
    },
    [userId]
  );

  return (
    <List className={classes.root} subheader={<li />}>
      {!loading && gameSessions.length === 0 && (
        <ListItem>
          <ListItemText primary="No games found" />
        </ListItem>
      )}
      {gameSessions.map(({ info, events }, index) => (
        <li key={index} className={classes.listSection}>
          <ul className={classes.ul}>
            <ListSubheader className={classes.flex} onClick={handleExpand}>
              {info.champion} Alive: {info.alive ? 'true' : 'false'} Level: {info.level} KDA:{' '}
              {info.kills}/{info.deaths}/{info.assists} CS: {info.minionKills}
              <div className={classes.grow} />
              {open ? <ExpandLess /> : <ExpandMore />}
            </ListSubheader>

            <Collapse in={open} timeout="auto" unmountOnExit>
              {events.map((event, i) => (
                <ListItem key={i} component="div">
                  <ListItemAvatar>
                    <Avatar>LoL</Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={`Event: ${event.name} - ${formatTime(
                      event.timestamp - info.startedAt
                    )}`}
                    secondary={JSON.stringify(event.data)}
                  />
                  {event.screenshotUrl && (
                    <img src={event.screenshotUrl} className={classes.screenshot} />
                  )}
                  {event.replay && (
                    <video width="320" height="240" controls>
                      <source src={event.replay.url} type="video/mp4" />
                    </video>
                  )}
                </ListItem>
              ))}
            </Collapse>
          </ul>
        </li>
      ))}
    </List>
  );
};

export default withStyles(styles)(Events);
