import {
  ButtonBase,
  Collapse,
  createStyles,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  withStyles,
  WithStyles
} from '@material-ui/core';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { GameSession, getGameSessions } from 'api/stitch/gameSessions';
import React, { SFC, useContext, useEffect, useState } from 'react';
import { CacheContext } from 'ui/contexts/cache';
import Event from './Event';
import LeagueGame from './LeagueGame';

interface EventsProps extends WithStyles<typeof styles> {
  userId: string;
}

const styles = theme =>
  createStyles({
    root: {
      backgroundColor: theme.palette.background.paper,
      overflow: 'auto'
    },
    listButton: {
      display: 'block',
      width: '100%'
    },
    flex: {
      display: 'flex',
      alignItems: 'center'
    },
    grow: {
      flexGrow: 1
    },
    listSection: {
      backgroundColor: 'inherit'
    },
    ul: {
      backgroundColor: 'inherit',
      padding: 0
    }
  });

const sortEvent = (a, b) => {
  return b.timestamp - a.timestamp;
};

const Events: SFC<EventsProps> = ({ classes, userId }) => {
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState({});

  const { state, setCache } = useContext(CacheContext);
  const cacheKey = `${userId}-gameSessions`;
  const gameSessions: GameSession[] = state[cacheKey] || [];

  const handleExpand = index => () => {
    setOpen({ ...open, [index]: !open[index] });
  };

  useEffect(
    () => {
      setLoading(true);
      getGameSessions(userId).then(result => {
        setCache(cacheKey, result);
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
            <ButtonBase className={classes.listButton}>
              <ListSubheader className={classes.flex} onClick={handleExpand(index)}>
                <LeagueGame info={info} />
                <div className={classes.grow} />
                {open[index] ? <ExpandLess /> : <ExpandMore />}
              </ListSubheader>
            </ButtonBase>
            <Collapse in={open[index]} timeout="auto" unmountOnExit>
              {events.sort(sortEvent).map((event, i) => (
                <Event key={i} event={event} startedAt={info.startedAt} />
              ))}
            </Collapse>
          </ul>
        </li>
      ))}
    </List>
  );
};

export default withStyles(styles)(Events);
