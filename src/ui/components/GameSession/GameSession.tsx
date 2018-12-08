import {
  Avatar,
  Button,
  createStyles,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Typography,
  withStyles,
  WithStyles
} from '@material-ui/core';
import games from 'api/games';
import { IGameSession } from 'api/stitch/gameSessions';
import { timeAgo } from 'api/times';
import classNames from 'classnames';
import React, { SFC } from 'react';
import LeagueGame from '../Events/LeagueGame';
import Link from '../Link';

interface IGameSessionProps extends WithStyles<typeof styles> {
  gameSession: IGameSession;
  selected?: boolean;
  onClick?(): void;
}

const styles = theme =>
  createStyles({
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
    }
  });

const GameSession: SFC<IGameSessionProps> = ({ classes, gameSession, onClick, selected }) => {
  const game = games[gameSession.gameId];
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
            <Link to={`#`}>
              <Button>
                <LeagueGame info={gameSession.info} />
              </Button>
            </Link>
          </Paper>
        }
      />
    </ListItem>
  );
};
export default withStyles(styles)(GameSession);
