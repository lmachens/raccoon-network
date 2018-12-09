import { CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React from 'react';

const useStyles = makeStyles({
  loading: {
    zIndex: 1,
    position: 'absolute',
    left: 'calc(50% - 20px)',
    top: 'calc(50% - 20px)'
  }
});

const Loading = () => {
  const classes = useStyles({});
  return <CircularProgress className={classes.loading} />;
};

export default Loading;
