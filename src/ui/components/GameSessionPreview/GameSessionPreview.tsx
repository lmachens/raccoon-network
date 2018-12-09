import {
  Avatar,
  Button,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import games from 'api/games';
import { IGameSession, IMatchInfo } from 'api/stitch/gameSessions';
import { timeAgo } from 'api/utilities';
import classNames from 'classnames';
import React, { SFC } from 'react';
import Link from '../Link';

export interface IGameSessionComponent {
  info: IMatchInfo;
}

export interface IGameSessionPreviewComponent {
  info: IMatchInfo;
}

interface IGameSessionPreviewProps {
  gameSession: IGameSession;
  selected?: boolean;
  onClick?(): void;
}

const useStyles = makeStyles(theme => ({
  primary: {
    marginBottom: 4
  },
  link: {
    display: 'inline',
    fontWeight: 500
  },
  timeAgo: {
    display: 'inline',
    marginLeft: 8,
    fontWeight: 300
  },
  listItem: {
    padding: 8
  },
  selected: {
    backgroundColor: `${theme.palette.action.selected} !important`
  },
  gameSession: {
    textTransform: 'none',
    height: 100,
    width: '100%',
    position: 'relative'
  }
}));

const GameSessionPreview: SFC<IGameSessionPreviewProps> = ({ gameSession, onClick, selected }) => {
  const classes = useStyles({});
  const game = games[gameSession.gameId];
  const Component = game.GameSessionPreviewComponent;
  return (
    <ListItem
      className={classNames(classes.listItem, {
        [classes.selected]: selected
      })}
      onClick={onClick}
    >
      <ListItemAvatar>
        <Link to={`/users/${gameSession.userId}`}>
          <Avatar>{gameSession.profile.username.slice(0, 2)}</Avatar>
        </Link>
      </ListItemAvatar>
      <ListItemText
        disableTypography
        primary={
          <Typography className={classes.primary}>
            <Link to={`/users/${gameSession.userId}`}>
              <Typography color="textPrimary" component="span" className={classes.link}>
                {gameSession.profile.username}
              </Typography>
            </Link>
            {' played '}
            <Link to={`#`}>
              <Typography color="textPrimary" component="span" className={classes.link}>
                {game ? game.name : 'unknown'}
              </Typography>
            </Link>
            <Typography component="span" variant="caption" className={classes.timeAgo}>
              {timeAgo(gameSession.createdAt)}
            </Typography>
          </Typography>}
        secondary={
          <Paper>
            <Link to={`/users/${gameSession.userId}/matches/${gameSession.matchId}`}>
              <Button className={classes.gameSession}>
                <Component info={gameSession.info} />
              </Button>
            </Link>
          </Paper>
        }
      />
    </ListItem>
  );
};
export default GameSessionPreview;
