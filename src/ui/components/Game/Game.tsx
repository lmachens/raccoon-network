import {
  Avatar,
  createStyles,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Tooltip,
  withStyles,
  WithStyles
} from '@material-ui/core';
import { IGame } from 'api/games';
import classNames from 'classnames';
import React, { SFC } from 'react';

interface IGameProps extends WithStyles<typeof styles> {
  game: IGame;
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

const Game: SFC<IGameProps> = ({ classes, game, onClick, selected }) => {
  return (
    <Tooltip title="Coming soon">
      <div>
        <ListItem
          button
          className={classNames(classes.listItem, {
            [classes.selected]: selected
          })}
          disabled
          onClick={onClick}
        >
          <ListItemAvatar>
            <Avatar>{game.name.slice(0, 2)}</Avatar>
          </ListItemAvatar>
          <ListItemText primary={game.name} />
        </ListItem>
      </div>
    </Tooltip>
  );
};
export default withStyles(styles)(Game);
