import { Avatar } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import jdenticon from 'jdenticon';
import React from 'react';

const useStyles = makeStyles({
  avatar: {
    backgroundColor: '#1a334dff'
  }
});

jdenticon.config = {
  lightness: {
    color: [0.46, 0.8],
    grayscale: [0.81, 0.81]
  },
  saturation: {
    color: 1.0,
    grayscale: 0.0
  },
  backColor: '#1a334dff'
};

const ProfilePicture = ({ username }) => {
  const classes = useStyles({});
  const svg = jdenticon.toSvg(username, 32);
  console.log(svg);
  return <Avatar className={classes.avatar} dangerouslySetInnerHTML={{ __html: svg }} />;
};

export default ProfilePicture;
