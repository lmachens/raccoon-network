import { Avatar, ListItem, ListItemAvatar, ListItemText } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { IGame } from 'api/games';
import classNames from 'classnames';
import React, { SFC } from 'react';
import Link from '../Link';

interface IGameListItemProps {
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

const GameListItem: SFC<IGameListItemProps> = ({ game, selected }) => {
  const classes = useStyles({});

  return (
    <Link to={`/games/${game.name}`}>
      <ListItem
        button
        className={classNames(classes.listItem, {
          [classes.selected]: selected
        })}
      >
        <ListItemAvatar>
          <Avatar src={game.iconSrc} className={classes.gameIcon} />
        </ListItemAvatar>
        <ListItemText primary={game.name} />
      </ListItem>
    </Link>
  );
};
export default GameListItem;
