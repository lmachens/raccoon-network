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
    inline: {
      display: 'inline'
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

const Events: SFC<EventsProps> = ({ classes }) => {
  const [open, setOpen] = useState(true);

  const { events, matchInfo, infoUpdates } = useContext(GamesContext);

  const handleExpand = () => {
    setOpen(!open);
  };

  return (
    <List className={classes.root} subheader={<li />}>
      {!matchInfo && 'No Match'}
      {matchInfo && (
        <li className={classes.listSection}>
          <ul className={classes.ul}>
            <ListSubheader>
              {matchInfo.champion} Alive: {matchInfo.alive ? 'true' : 'false'} Level:{' '}
              {matchInfo.level} KDA: {matchInfo.kills}/{matchInfo.deaths}/{matchInfo.assists}{' '}
              Minions: {matchInfo.minionKills} Gold: {matchInfo.gold}
            </ListSubheader>
            <ListItem button onClick={handleExpand}>
              <ListItemText inset primary="Details" />
              {open ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit>
              {events.map((event, i) => (
                <ListItem key={i} component="div">
                  <ListItemAvatar>
                    <Avatar>LoL</Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={`Event: ${event.name}`}
                    secondary={JSON.stringify(event.data)}
                  />
                  {event.screenshotUrl && (
                    <img src={event.screenshotUrl} className={classes.screenshot} />
                  )}
                </ListItem>
              ))}
              {infoUpdates.map((infoUpdate, i) => (
                <ListItem key={i}>
                  <ListItemAvatar>
                    <Avatar>LoL</Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={`InfoUpdate: ${infoUpdate.feature}`}
                    secondary={JSON.stringify(infoUpdate.info)}
                  />
                  {infoUpdate.screenshotUrl && (
                    <img src={infoUpdate.screenshotUrl} className={classes.screenshot} />
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
