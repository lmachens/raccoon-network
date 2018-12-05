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
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';

interface ContactProps extends WithStyles<typeof styles>, RouteComponentProps<{}> {
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

const Contact: SFC<ContactProps> = ({ classes, profile, location }) => {
  return (
    <Link style={{ textDecoration: 'none' }} to={`/users/${profile.userId}`}>
      <ListItem
        button
        disableGutters
        className={classNames(
          classes.listItem,
          location.pathname === `/users/${profile.userId}` ? classes.selected : classes.notSelected
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
    </Link>
  );
};
export default withStyles(styles)(withRouter(Contact));
