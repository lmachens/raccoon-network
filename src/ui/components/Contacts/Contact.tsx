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
import React, { SFC, useContext } from 'react';
import { TargetContext } from 'ui/contexts/target';

interface ContactProps extends WithStyles<typeof styles> {
  profile: any;
}

const styles = createStyles({
  inline: {
    display: 'inline'
  },
  listItem: {
    padding: 8
  },
  selected: {
    backgroundColor: '#d0e6ec'
  },
  notSelected: {
    '&:hover': {
      backgroundColor: '#e1edf1'
    }
  }
});

const Contact: SFC<ContactProps> = ({ classes, profile }) => {
  const { target, setTarget } = useContext(TargetContext);
  const handleClick = () => {
    setTarget('profile', profile.userId);
  };

  return (
    <ListItem
      onClick={handleClick}
      button
      disableGutters
      className={classNames(
        classes.listItem,
        target && target.key === 'profile' && profile!.userId === target.value
          ? classes.selected
          : classes.notSelected
      )}
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
