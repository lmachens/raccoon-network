import { ListItem, ListItemText, Typography } from '@material-ui/core';
import { IGameSessionEvent } from 'api/stitch/gameSessions';
import React, { SFC } from 'react';

interface IGameSessionEventProps {
  event: IGameSessionEvent;
  startedAt: Date;
}

const formatTime = time => {
  if (time < 0) {
    return '00:00';
  }
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
export const allEventDetails: IEventDetails = {
  announcer: {
    victory: {
      primary: () => 'Victory',
      secondary: () => 'The game is over!'
    },
    defeat: {
      primary: () => 'Defeat',
      secondary: () => 'The game is over!'
    },
    minions_spawn: {
      primary: () => 'Minions spawned'
    },
    welcome_rift: {
      primary: () => 'Welcome! The match is about to start'
    },
    inhibitor_destroy: {
      primary: () => 'Inhibitor Destroy',
      secondary: data =>
        data === 'enemy' ? 'An enemy inhibitor got destroyed' : 'Own inhibitor got destroyed'
    },
    inhibitor_respawn: {
      primary: () => 'Inhibitor Respawn',
      secondary: data =>
        data === 'enemy' ? 'An enemy inhibitor respawned' : 'Own inhibitor respawned'
    },
    turret_destroy: {
      primary: () => 'Turret Destroy',
      secondary: data =>
        data === 'enemy' ? 'An enemy turret got destroyed' : 'Own turret got destroyed'
    }
  }
};

const getEventDetails = event => {
  if (event.name === 'highlight') {
    const primary = event.title;
    const secondary = <span dangerouslySetInnerHTML={{ __html: event.video.assets.iframe }} />;
    return {
      primary,
      secondary
    };
  }

  const eventDetails = allEventDetails[event.name] && allEventDetails[event.name][event.data.name];
  if (eventDetails) {
    const primary = eventDetails.primary(event.data.data);
    const secondary = eventDetails.secondary && eventDetails.secondary(event.data.data);
    return {
      primary,
      secondary
    };
  }
  return {};
};

const GameSessionEvent: SFC<IGameSessionEventProps> = ({ event, startedAt }) => {
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
