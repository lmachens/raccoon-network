import { createStyles, Paper, withStyles, WithStyles } from '@material-ui/core';
import React, { SFC } from 'react';

interface IWelcomeProps extends WithStyles<typeof styles> {}

const styles = createStyles({
  paper: {
    marginTop: 20,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    maxWidth: 700,
    marginLeft: 'auto',
    marginRight: 'auto',
    textAlign: 'center'
  }
});

const Welcome: SFC<IWelcomeProps> = ({ classes, children }) => {
  return (
    <Paper className={classes.paper}>
      <img src="assets/logo.png" />
      {children}
    </Paper>
  );
};

export default withStyles(styles)(Welcome);
