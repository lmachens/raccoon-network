import { createStyles, ListItem, withStyles, WithStyles } from '@material-ui/core';
import { IGameSession } from 'api/stitch/gameSessions';
import classNames from 'classnames';
import React, { SFC } from 'react';
import LeagueGame from '../Events/LeagueGame';

interface IGameSessionProps extends WithStyles<typeof styles> {
  gameSession: IGameSession;
  selected?: boolean;
  onClick?(): void;
}

const styles = theme =>
  createStyles({
    inline: {
      display: 'inline'
    },
    listItem: {
      padding: 8
    },
    selected: {
      backgroundColor: `${theme.palette.action.selected} !important`
    }
  });

const GameSession: SFC<IGameSessionProps> = ({ classes, gameSession, onClick, selected }) => {
  return (
    <ListItem
      button
      className={classNames(classes.listItem, {
        [classes.selected]: selected
      })}
      onClick={onClick}
    >
      <LeagueGame info={gameSession.info} />
    </ListItem>
  );
};
export default withStyles(styles)(GameSession);
