import {
  Button,
  FormControl,
  IconButton,
  Input,
  InputLabel,
  Snackbar,
  Tab,
  Tabs,
  Typography
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/styles';
import {
  handleAnonymousLogin,
  handleLogin,
  handleResendConfirmation,
  handleResetPassword,
  handleSignup
} from 'api/stitch';
import React, { useContext, useState } from 'react';
import { ProfileContext } from 'ui/contexts/profile';
import Loading from '../Loading';

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '100%'
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.primary.main
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit
  },
  submit: {
    marginTop: theme.spacing.unit * 3
  },
  skip: {
    display: 'inline',
    textDecoration: 'underline',
    cursor: 'pointer'
  },
  mailAction: {
    textDecoration: 'underline',
    cursor: 'pointer',
    margin: 2
  }
}));

const lables = ['Sign in', 'Sign up'];

const Auth = () => {
  const classes = useStyles({});
  const [loading, setLoading] = useState(false);
  const [tabIndex, setTabIndex] = useState(0);
  const [error, setError] = useState<Error | null>(null);
  const [email, setEmail] = useState('');
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const { refreshProfile } = useContext(ProfileContext);

  const handleSubmit = async event => {
    setLoading(true);
    setError(null);
    event.preventDefault();

    const { password, repeatPassword } = event.target;

    const passwordValue = password && password.value.trim();
    const repeatPasswordValue = repeatPassword && repeatPassword.value.trim();

    try {
      if (tabIndex === 0) {
        await handleLogin(email, passwordValue);
        refreshProfile();
      } else if (tabIndex === 1) {
        if (passwordValue !== repeatPasswordValue) {
          throw new Error("Password doesn't match");
        } else {
          await handleSignup(email, passwordValue);
          setTabIndex(0);
          setSnackbarMessage('Please check your E-mails');
        }
      }
    } catch (error) {
      setError(error);
      console.error(error);
    }
    setLoading(false);
  };

  const handleTabChange = (event, value) => {
    setError(null);
    setTabIndex(value);
  };

  const handleAnonymousLoginClick = event => {
    event.preventDefault();

    setLoading(true);
    handleAnonymousLogin().then(() => {
      setLoading(false);
    });
  };

  const handleResendConfimationClick = async () => {
    if (!email) {
      return setError(new Error('Please enter an Email address'));
    }
    setLoading(true);
    setError(null);
    try {
      await handleResendConfirmation(email);
      setSnackbarMessage('Please check your E-mails');
    } catch (error) {
      setError(error);
    }
    setLoading(false);
  };

  const handleResetPasswordClick = async () => {
    if (!email) {
      return setError(new Error('Please enter an Email address'));
    }
    setLoading(true);
    setError(null);
    try {
      await handleResetPassword(email);
      setSnackbarMessage('Please check your E-mails');
    } catch (error) {
      setError(error);
    }
    setLoading(false);
  };

  const handleEmailChange = event => {
    setEmail(event.target.value);
  };

  const handleCloseSnackbar = () => {
    setSnackbarMessage('');
  };

  return (
    <div className={classes.root}>
      {loading && <Loading />}
      <Typography variant="subtitle1">
        Welcome! Glad to see that you like to become part of the <i>Raccoon Network</i>! If you want
        to try out this app, you can simply{' '}
        <Typography
          component="span"
          variant="subtitle1"
          className={classes.skip}
          onClick={handleAnonymousLoginClick}
        >
          skip the authentication
        </Typography>
        .
      </Typography>
      <Tabs
        value={tabIndex}
        onChange={handleTabChange}
        indicatorColor="primary"
        textColor="primary"
      >
        <Tab label={lables[0]} />
        <Tab label={lables[1]} />
      </Tabs>

      <form className={classes.form} onSubmit={handleSubmit}>
        <FormControl margin="normal" required fullWidth>
          <InputLabel htmlFor="email">Email Address</InputLabel>
          <Input
            id="email"
            name="email"
            value={email}
            onChange={handleEmailChange}
            autoComplete="email"
            autoFocus
            type="email"
          />
        </FormControl>
        <FormControl margin="normal" required fullWidth>
          <InputLabel htmlFor="password">Password</InputLabel>
          <Input name="password" type="password" id="password" autoComplete="current-password" />
        </FormControl>
        {tabIndex === 1 && (
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="repeat-password">Repeat Password</InputLabel>
            <Input
              name="repeatPassword"
              type="password"
              id="repeat-password"
              autoComplete="repeat-password"
            />
          </FormControl>
        )}
        {error && <Typography color="error">{error.message}</Typography>}
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          disabled={loading}
        >
          {lables[tabIndex]}
        </Button>
      </form>
      {tabIndex !== 1 && (
        <>
          <Typography className={classes.mailAction} onClick={handleResetPasswordClick}>
            Reset password
          </Typography>
          <Typography className={classes.mailAction} onClick={handleResendConfimationClick}>
            Resend confirmation mail
          </Typography>
        </>
      )}
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        open={Boolean(snackbarMessage)}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        ContentProps={{
          'aria-describedby': 'message-id'
        }}
        message={<span id="message-id">{snackbarMessage}</span>}
        action={
          <IconButton aria-label="Close" color="inherit" onClick={handleCloseSnackbar}>
            <CloseIcon />
          </IconButton>}
      />
    </div>
  );
};

export default Auth;
