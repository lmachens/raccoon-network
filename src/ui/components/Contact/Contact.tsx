import { ListItem, ListItemAvatar, ListItemText, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { IUserProfile } from 'api/stitch/profile';
import classNames from 'classnames';
import React, { SFC } from 'react';
import ProfilePicture from '../ProfilePicture';

interface IContactProps {
  profile: IUserProfile;
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
  }
}));

const Contact: SFC<IContactProps> = ({ profile, onClick, selected }) => {
  const classes = useStyles({});
  return (
    <ListItem
      button
      className={classNames(classes.listItem, {
        [classes.selected]: selected
      })}
      onClick={onClick}
    >
      <ListItemAvatar>
        <ProfilePicture username={profile.username.slice(0, 2)} />
      </ListItemAvatar>
      <ListItemText
        primary={profile.username}
        secondary={
          <>
            <Typography component="span" className={classes.inline} color="textPrimary">
              TBA
            </Typography>
          </>
        }
      />
    </ListItem>
  );
};
export default Contact;
