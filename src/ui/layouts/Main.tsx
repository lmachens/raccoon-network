import { ButtonBase, createStyles, Typography, withStyles, WithStyles } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import MaximizeIcon from '@material-ui/icons/CropSquare';
import MinimizeIcon from '@material-ui/icons/Minimize';
import overwolf from 'api/overwolf';
import React, { SFC, useContext } from 'react';
import Auth from 'ui/components/Auth';
import { ProfileContext } from 'ui/contexts/profile';

const dragResize = edge => () => {
  overwolf.windows.getCurrentWindow(result => {
    if (result.status === 'success') {
      overwolf.windows.dragResize(result.window.id, edge);
    }
  });
};

const dragMove = () => {
  overwolf.windows.getCurrentWindow(result => {
    if (result.status === 'success') {
      overwolf.windows.dragMove(result.window.id);
    }
  });
};

const closeWindow = () => {
  overwolf.windows.getCurrentWindow(result => {
    if (result.status === 'success') {
      overwolf.windows.close(result.window.id);
    }
  });
};

const maximizeWindow = () => {
  overwolf.windows.getCurrentWindow(result => {
    if (result.status === 'success') {
      if (result.window.state === 'Maximized') {
        overwolf.windows.restore(result.window.id);
      } else {
        overwolf.windows.maximize(result.window.id);
      }
    }
  });
};

const minimizeWindow = () => {
  overwolf.windows.getCurrentWindow(result => {
    if (result.status === 'success') {
      overwolf.windows.minimize(result.window.id);
    }
  });
};

interface MainLayoutProps extends WithStyles<typeof styles> {}

const styles = createStyles({
  root: {
    userSelect: 'none',
    height: '100vh',
    width: '100vw',
    border: '1px solid #a7a7a7',
    overflow: 'hidden'
  },
  dragResize: {
    width: 20,
    height: 20,
    bottom: 0,
    right: 0,
    position: 'absolute',
    cursor: 'se-resize',
    zIndex: 1
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    height: 28
  },
  title: {
    fontWeight: 500
  },
  logo: {
    height: 24,
    marginLeft: 4,
    marginRight: 4
  },
  grow: {
    flexGrow: 1
  },
  button: {
    height: '100%',
    width: 40,
    '&:hover': {
      backgroundColor: '#d0d0d0'
    }
  },
  main: {
    height: 'calc(100% - 28px)'
  }
});

const MainLayout: SFC<MainLayoutProps> = ({ children, classes }) => {
  const { isLoggedIn } = useContext(ProfileContext);

  return (
    <div className={classes.root}>
      <header className={classes.header} onMouseDown={dragMove}>
        <img src="/assets/logo.png" className={classes.logo} />
        <Typography component="h1" className={classes.title}>
          Raccoon Network
        </Typography>
        <div className={classes.grow} />
        <ButtonBase className={classes.button} focusRipple onClick={minimizeWindow}>
          <MinimizeIcon color="action" />
        </ButtonBase>
        <ButtonBase className={classes.button} focusRipple onClick={maximizeWindow}>
          <MaximizeIcon color="action" />
        </ButtonBase>
        <ButtonBase className={classes.button} focusRipple onClick={closeWindow}>
          <CloseIcon color="action" />
        </ButtonBase>
      </header>
      <div className={classes.dragResize} onMouseDown={dragResize('BottomRight')} />
      <main className={classes.main}>
        {!isLoggedIn && <Auth />}
        {isLoggedIn && children}
      </main>
    </div>
  );
};

export default withStyles(styles)(MainLayout);
