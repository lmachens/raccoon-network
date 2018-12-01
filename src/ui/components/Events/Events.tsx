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
import React, { SFC, useContext, useState } from 'react';
import { GamesContext } from 'ui/contexts/games';

interface EventsProps extends WithStyles<typeof styles> {}

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

const Events: SFC<EventsProps> = ({ classes }) => {
  const [open, setOpen] = useState(true);

  const { events, matchInfo } = useContext(GamesContext);

  const handleExpand = () => {
    setOpen(!open);
  };

  return (
    <List className={classes.root} subheader={<li />}>
      {!matchInfo && 'No Match'}
      {matchInfo && (
        <li className={classes.listSection}>
          <ul className={classes.ul}>
            <ListSubheader className={classes.flex} onClick={handleExpand}>
              {matchInfo.champion} Alive: {matchInfo.alive ? 'true' : 'false'} Level:{' '}
              {matchInfo.level} KDA: {matchInfo.kills}/{matchInfo.deaths}/{matchInfo.assists} CS:{' '}
              {matchInfo.minionKills}
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
                      event.timestamp - matchInfo.startedAt
                    )}`}
                    secondary={JSON.stringify(event.data)}
                  />
                  {event.screenshotUrl && (
                    <img src={event.screenshotUrl} className={classes.screenshot} />
                  )}
                </ListItem>
              ))}
            </Collapse>
          </ul>
        </li>
      )}
    </List>
  );
};

export default withStyles(styles)(Events);
