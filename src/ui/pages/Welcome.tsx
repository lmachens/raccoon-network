import { Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React from 'react';

const useStyles = makeStyles({
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

const Welcome = ({ children }) => {
  const classes = useStyles({});
  return (
    <Paper className={classes.paper}>
      <img src="assets/logo.png" />
      {children}
    </Paper>
  );
};

export default Welcome;
