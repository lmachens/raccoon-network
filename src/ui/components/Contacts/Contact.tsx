import {
  Avatar,
  createStyles,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
  withStyles,
  WithStyles
} from '@material-ui/core';
import classNames from 'classnames';
import React, { SFC } from 'react';

interface ContactProps extends WithStyles<typeof styles> {
  profile: any;
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

const Contact: SFC<ContactProps> = ({ classes, profile, onClick, selected }) => {
  return (
    <ListItem
      button
      className={classNames(classes.listItem, {
        [classes.selected]: selected
      })}
      onClick={onClick}
    >
      <ListItemAvatar>
        <Avatar>{profile.username.slice(0, 2)}</Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={profile.username}
        secondary={
          <>
            <Typography component="span" className={classes.inline} color="textPrimary">
              Playing League of Legends
            </Typography>
          </>
        }
      />
    </ListItem>
  );
};
export default withStyles(styles)(Contact);
