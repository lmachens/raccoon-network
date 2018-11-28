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
import overwolf from 'api/overwolf';
import { ODK } from 'api/overwolf/overwolf';
import React, { SFC, useEffect, useState } from 'react';

interface EventsProps extends WithStyles<typeof styles> {}

const styles = createStyles({
  inline: {
    display: 'inline'
  }
});

const interestedInFeatures: ODK.GameEvents.LOL.TFeaturesLOL[] = [
  'summoner_info',
  'gameMode',
  'teams',
  'matchState',
  'spellsAndAbilities',
  'deathAndRespawn',
  'kill',
  'assist',
  'minions'
];

const setFeatures = () => {
  overwolf.games.events.setRequiredFeatures(interestedInFeatures, info => {
    if (info.status === 'error') {
      window.setTimeout(setFeatures, 2000);
      return;
    }

    console.log('Set required features:');
    console.log(JSON.stringify(info));
  });

  overwolf.games.events.onError.addListener(info => {
    console.log('Error: ' + JSON.stringify(info));
  });
};

type InfoUpdatesState = ODK.GameEvents.InfoUpdateData[];
type EventsState = Array<ODK.GameEvents.EventData<ODK.GameEvents.LOL.TEventsLOL>>;

const Events: SFC<EventsProps> = ({ classes }) => {
  const [infoUpdates, setInfoUpdates] = useState<InfoUpdatesState>([]);
  const [events, setEvents] = useState<EventsState>([]);

  const handleInfoUpdatesUpdated = newInfoUpdate => {
    console.log(newInfoUpdate);
    setInfoUpdates([newInfoUpdate, ...infoUpdates]);
  };

  const handleNewEventsUpdated = newEvents => {
    console.log(newEvents);
    setEvents([...newEvents, ...events]);
  };

  useEffect(() => {
    console.log('use events effect');
    setFeatures();
    overwolf.games.events.onInfoUpdates2.addListener(handleInfoUpdatesUpdated);
    overwolf.games.events.onNewEvents.addListener(handleNewEventsUpdated);
    return () => {
      overwolf.games.events.onInfoUpdates2.removeListener(handleInfoUpdatesUpdated);
      overwolf.games.events.onNewEvents.removeListener(handleNewEventsUpdated);
    };
  });

  return (
    <List>
      {events.map((event, i) => (
        <ListItem key={i}>
          <ListItemAvatar>
            <Avatar>LoL</Avatar>
          </ListItemAvatar>
          <ListItemText primary={event.name} secondary={JSON.stringify(event.data)} />
        </ListItem>
      ))}
      {infoUpdates.map((infoUpdate, i) => (
        <ListItem key={i}>
          <ListItemAvatar>
            <Avatar>LoL</Avatar>
          </ListItemAvatar>
          <ListItemText primary={infoUpdate.feature} secondary={JSON.stringify(infoUpdate.info)} />
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
    </List>
  );
};

export default withStyles(styles)(Events);
