import { createStyles, Paper, Typography, withStyles, WithStyles } from '@material-ui/core';
import React, { SFC } from 'react';

interface WelcomeProps extends WithStyles<typeof styles> {}

const styles = theme =>
  createStyles({
    paper: {
      marginTop: 20,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      maxWidth: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
      textAlign: 'center'
    }
  });

const Welcome: SFC<WelcomeProps> = ({ classes, children }) => {
  return (
    <Paper className={classes.paper}>
      <img src="/assets/logo.png" />
      {children}
    </Paper>
  );
};

export default withStyles(styles)(Welcome);
