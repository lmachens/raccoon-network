import { createStyles, withStyles, WithStyles } from '@material-ui/core';
import React, { SFC, useState } from 'react';
import Events from 'ui/components/Events';
import Friends from 'ui/components/Friends';
import Profile from 'ui/components/Profile';
import Views from 'ui/components/Views';

interface MainProps extends WithStyles<typeof styles> {}

const styles = createStyles({
  profile: {
    display: 'flex',
    alignItems: 'center'
  },
  avatar: {
    marginRight: 4
  },
  grow: {
    flexGrow: 1
  }
});

const Main: SFC<MainProps> = ({ classes }) => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <Profile />
      <Views value={value} onChange={handleChange} />
      {value === 0 && <Events />}
      {value === 1 && <Friends />}
    </div>
  );
};

export default withStyles(styles)(Main);
