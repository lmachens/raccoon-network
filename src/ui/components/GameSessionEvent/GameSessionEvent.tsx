import { ListItem, ListItemText, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { IGameSessionEvent } from 'api/stitch/gameSessions';
import React, { SFC } from 'react';

interface IGameSessionEventProps {
  event: IGameSessionEvent;
  startedAt: Date;
}

const useStyles = makeStyles({
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

interface IEventDetails {
  [key: string]: {
    [key: string]: {
      primary(data): string;
      secondary?(data): string;
    };
  };
}
const allEventDetails: IEventDetails = {
  announcer: {
    victory: {
      primary: () => 'Victory',
      secondary: () => 'The game is over!'
    },
    defeat: {
      primary: () => 'Defeat',
      secondary: () => 'The game is over!'
    },
    shutdown: {
      primary: () => 'A champion got shut down'
    },
    minions_spawn: {
      primary: () => 'Minions spawned'
    },
    minions_30_sec: {
      primary: () => 'Minions will spawn in 30 sec'
    },
    welcome_rift: {
      primary: () => 'Welcome! The match is about to start'
    },
    double_kill: {
      primary: () => 'Double Kill',
      secondary: data =>
        data === 'enemy' ? 'An enemy scored a double kill' : 'A teammate scored a double kill'
    },
    triple_kill: {
      primary: () => 'Triple Kill',
      secondary: data =>
        data === 'enemy' ? 'An enemy scored a triple kill' : 'A teammate scored a triple kill'
    },
    killing_spree: {
      primary: () => 'Killing Spree',
      secondary: data =>
        data === 'enemy' ? 'An enemy is on a killing spree' : 'A teammate is on a killing spree'
    },
    legendary: {
      primary: () => 'Legendary',
      secondary: data => (data === 'enemy' ? 'An enemy is legendary' : 'A teammate is legendary')
    },
    godlike: {
      primary: () => 'Godlike',
      secondary: data => (data === 'enemy' ? 'An enemy is godlike' : 'A teammate is godlike')
    },
    dominating: {
      primary: () => 'Dominating',
      secondary: data => (data === 'enemy' ? 'An enemy is dominating' : 'A teammate is dominating')
    },
    unstoppable: {
      primary: () => 'Unstoppable',
      secondary: data =>
        data === 'enemy' ? 'An enemy is unstoppable' : 'A teammate is unstoppable'
    },
    first_blood: {
      primary: () => 'First Blood'
    },
    inhibitor_destroy: {
      primary: () => 'Inhibitor Destroy',
      secondary: data =>
        data === 'enemy' ? 'The enemy destroyed an inhibitor' : 'Our team destroyed an inhibitor'
    },
    slain: {
      primary: () => 'Slain',
      secondary: data => (data === 'enemy' ? 'An enemy got slained' : 'A teammate got slained')
    },
    slain_self: {
      primary: () => 'Self Slain',
      secondary: data =>
        data === 'enemy' ? 'An enemy slained himself' : 'A teammate slained himself'
    },
    self_slain: {
      primary: () => 'Self Slain',
      secondary: data =>
        data === 'enemy' ? 'An enemy slained himself' : 'A teammate slained himself'
    },
    inhibitor_respawn: {
      primary: () => 'Inhibitor Respawn',
      secondary: data =>
        data === 'enemy' ? 'An enemy inhibitor respawned' : 'A team inhibitor respawned'
    },
    turret_destroy: {
      primary: () => 'Turret Destroy',
      secondary: data =>
        data === 'enemy' ? 'An enemy turret got destroyed' : 'A team turret got destroyed'
    },
    rampage: {
      primary: () => 'Rampage',
      secondary: data => (data === 'enemy' ? 'An enemy is on rampage' : 'A teammate is on rampage')
    }
  }
};

const getEventDetails = event => {
  let primary = event.name;
  let secondary;

  const eventDetails = allEventDetails[event.name]
    ? allEventDetails[event.name][event.data.name]
    : null;
  if (eventDetails) {
    primary = eventDetails.primary(event.data.data);
    secondary = eventDetails.secondary && eventDetails.secondary(event.data.data);
  } else if (event.name !== 'Highlight') {
    secondary = JSON.stringify(event.data);
  } else if (event.video) {
    secondary = <span dangerouslySetInnerHTML={{ __html: event.video.assets.iframe }} />;
  }
  return {
    primary,
    secondary
  };
};

const GameSessionEvent: SFC<IGameSessionEventProps> = ({ event, startedAt }) => {
  const classes = useStyles({});
  return (
    <ListItem>
      <Typography variant="overline">
        {formatTime(event.timestamp.getTime() - startedAt.getTime())}
      </Typography>
      <ListItemText {...getEventDetails(event)} />
    </ListItem>
  );
};

export default GameSessionEvent;
