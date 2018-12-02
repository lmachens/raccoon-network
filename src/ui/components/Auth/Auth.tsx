import {
  Avatar,
  Button,
  Checkbox,
  createStyles,
  FormControl,
  FormControlLabel,
  Input,
  InputLabel,
  Paper,
  Tab,
  Tabs,
  Typography,
  withStyles,
  WithStyles
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { handleConfirmUser, handleLogin, handleResendConfirmation, handleSignup } from 'api/stitch';
import React, { SFC, useState } from 'react';

const styles = theme =>
  createStyles({
    paper: {
      marginTop: theme.spacing.unit * 8,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit *
        3}px`,
      [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
        width: 400,
        marginLeft: 'auto',
        marginRight: 'auto'
      }
    },
    avatar: {
      margin: theme.spacing.unit,
      backgroundColor: theme.palette.primary.main
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing.unit
    },
    submit: {
      marginTop: theme.spacing.unit * 3
    }
  });

type SignInProps = WithStyles<typeof styles>;

const lables = ['Sign in', 'Sign up', 'Reset', 'Verify'];

const SignIn: SFC<SignInProps> = ({ classes }) => {
  const [tabIndex, setTabIndex] = useState(0);
  const [message, setMessage] = useState<string>('');
  const [error, setError] = useState<Error | null>(null);

  const handleSubmit = async event => {
    setError(null);
    event.preventDefault();

    const { email, password, repeatPassword, token, tokenId } = event.target;

    const emailValue = email && email.value;
    const passwordValue = password && password.value;
    const repeatPasswordValue = repeatPassword && repeatPassword.value;
    const tokenValue = token && token.value;
    const tokenIdValue = tokenId && tokenId.value;

    try {
      if (tabIndex === 0) {
        await handleLogin(emailValue, passwordValue);
      } else if (tabIndex === 1) {
        if (passwordValue !== repeatPasswordValue) {
          throw new Error("Password doesn't match");
        } else {
          await handleSignup(emailValue, passwordValue);
          setTabIndex(3);
        }
      } else if (tabIndex === 2) {
        await handleResendConfirmation(emailValue);
      } else if (tabIndex === 3) {
        await handleConfirmUser(tokenValue, tokenIdValue);
        setTabIndex(0);
      }
    } catch (error) {
      setError(error);
      console.error(error);
    }
  };

  const handleTabChange = (event, value) => {
    setError(null);
    setTabIndex(value);
  };

  return (
    <Paper className={classes.paper}>
      <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
      </Avatar>
      <Tabs
        value={tabIndex}
        onChange={handleTabChange}
        indicatorColor="primary"
        textColor="primary"
      >
        <Tab label={lables[0]} />
        <Tab label={lables[1]} />
        <Tab label={lables[2]} />
        <Tab label={lables[3]} />
      </Tabs>

      <form className={classes.form} onSubmit={handleSubmit}>
        {tabIndex !== 3 && (
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="email">Email Address</InputLabel>
            <Input id="email" name="email" autoComplete="email" autoFocus type="email" />
          </FormControl>
        )}
        {tabIndex < 2 && (
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input name="password" type="password" id="password" autoComplete="current-password" />
          </FormControl>
        )}
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
        {tabIndex === 3 && (
          <>
            <Typography>
              This is a temporary solution! Please extract the token and tokenId from the
              confirmation email.
            </Typography>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="token">Token</InputLabel>
              <Input name="token" id="token" autoComplete="token" />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="token-id">Token ID</InputLabel>
              <Input name="tokenId" id="token-id" autoComplete="token-id" />
            </FormControl>
          </>
        )}
        {error && <Typography color="error">{error.message}</Typography>}
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          {lables[tabIndex]}
        </Button>
      </form>
    </Paper>
  );
};

export default withStyles(styles)(SignIn);
