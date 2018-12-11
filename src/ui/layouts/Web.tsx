import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React, { SFC, useContext } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import Auth from 'ui/components/Auth';
import ConfirmEmail from 'ui/components/ConfirmEmail';
import Loading from 'ui/components/Loading';
import ResetPassword from 'ui/components/ResetPassword';
import { ProfileContext } from 'ui/contexts/profile';
import Welcome from 'ui/pages/Welcome';

const useStyles = makeStyles({
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
  },
  loadingText: {
    marginTop: 8
  }
});

const WebLayout: SFC<RouteComponentProps<{}>> = ({ children, location }) => {
  const classes = useStyles({});
  const { isLoggedIn, isLoggingIn } = useContext(ProfileContext);
  const isConfirmEmailPage = location.pathname === '/confirm-email';
  const isResetPasswordPage = location.pathname === '/reset-password';
  const isActionPage = isConfirmEmailPage || isResetPasswordPage;

  return (
    <div className={classes.root}>
      <header className={classes.header}>
        <img src="assets/logo.png" className={classes.logo} />
        <Typography component="h1" className={classes.title}>
          Raccoon Network
        </Typography>
      </header>
      <main className={classes.main}>
        {isConfirmEmailPage && <ConfirmEmail />}
        {isResetPasswordPage && <ResetPassword />}
        {!isActionPage && isLoggingIn && <Loading />}
        {!isActionPage && !isLoggingIn && !isLoggedIn && (
          <Welcome>
            <Auth />
          </Welcome>
        )}
        {!isActionPage && !isLoggingIn && isLoggedIn && children}
      </main>
    </div>
  );
};

export default withRouter(WebLayout);
