import {
  createStyles,
  Hidden,
  List,
  ListItem,
  ListItemText,
  withStyles,
  WithStyles
} from '@material-ui/core';
import React, { SFC } from 'react';
import ExitButton from '../ExitButton';

interface FeedProps extends WithStyles<typeof styles> {}

const styles = createStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%'
  }
});

const Feed: SFC<FeedProps> = ({ classes }) => {
  return (
    <div className={classes.root}>
      <List>
        <ListItem>
          <Hidden smUp>
            <ExitButton />
          </Hidden>
          <ListItemText primary="Feed" />
        </ListItem>
      </List>
    </div>
  );
};

export default withStyles(styles)(Feed);
