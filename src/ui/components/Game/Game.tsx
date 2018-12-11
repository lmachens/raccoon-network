import { Avatar, ListItem, ListItemAvatar, ListItemText, Tooltip } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { IGame } from 'api/games';
import classNames from 'classnames';
import React, { SFC } from 'react';

interface IGameProps {
  game: IGame;
  selected?: boolean;
  onClick?(): void;
}

const useStyles = makeStyles(theme => ({
  inline: {
    display: 'inline'
  },
  listItem: {
    padding: 8
  },
  selected: {
    backgroundColor: `${theme.palette.action.selected} !important`
  },
  gameIcon: {
    padding: 5
  }
}));

const Game: SFC<IGameProps> = ({ game, onClick, selected }) => {
  const classes = useStyles({});

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
            <Avatar src={game.iconSrc} className={classes.gameIcon} />
          </ListItemAvatar>
          <ListItemText primary={game.name} />
        </ListItem>
      </div>
    </Tooltip>
  );
};
export default Game;
