import { createStyles, withStyles, WithStyles } from '@material-ui/core';
import React, { SFC, useState } from 'react';
import Events from 'ui/components/Events';
import Friends from 'ui/components/Friends';
import Profile from 'ui/components/Profile';
import Views from 'ui/components/Views';

interface MainProps extends WithStyles<typeof styles> {}

const styles = createStyles({
  root: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  grow: {
    flexGrow: 1,
    overflow: 'auto'
  }
});

const Main: SFC<MainProps> = ({ classes }) => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <Profile />
      <Views value={value} onChange={handleChange} />
      <div className={classes.grow}>
        {value === 0 && <Events />}
        {value === 1 && <Friends />}
      </div>
    </div>
  );
};

export default withStyles(styles)(Main);
