import { IconButton, ListItemSecondaryAction, Popover } from '@material-ui/core';
import VideoIcon from '@material-ui/icons/OndemandVideo';
import { makeStyles } from '@material-ui/styles';
import React, { useState } from 'react';

const useStyles = makeStyles({
  popover: {
    pointerEvents: 'none'
  },
  paper: {
    backgroundColor: 'black'
  },
  img: {
    width: 300
  }
});

const VideoAction = ({ video }) => {
  const classes = useStyles({});
  const [anchorEl, setAnchorEl] = useState(null);

  const handleVideoClick = () => {
    window.open(video.player);
  };

  const handlePopoverOpen = e => {
    setAnchorEl(e.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <ListItemSecondaryAction>
        <IconButton
          onClick={handleVideoClick}
          onMouseEnter={handlePopoverOpen}
          onMouseLeave={handlePopoverClose}
          aria-owns={open ? 'mouse-over-popover' : undefined}
          aria-haspopup="true"
        >
          <VideoIcon />
        </IconButton>
      </ListItemSecondaryAction>
      <Popover
        id="mouse-over-popover"
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handlePopoverClose}
        disableRestoreFocus
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left'
        }}
        className={classes.popover}
        classes={{
          paper: classes.paper
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
      >
        <img src={video.thumbnail} className={classes.img} />
      </Popover>
    </>
  );
};

export default VideoAction;
