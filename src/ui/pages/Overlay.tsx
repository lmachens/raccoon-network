import { createStyles, Hidden, withStyles, WithStyles } from '@material-ui/core';
import React from 'react';

const styles = theme =>
  createStyles({
    root: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: '#f3f3f3'
    }
  });

const Overlay = () => <div>Overlay</div>;

export default Overlay;
