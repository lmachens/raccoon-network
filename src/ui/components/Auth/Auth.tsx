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
import { handleLogin, handleResendConfirmation, handleSignup } from 'api/stitch';
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

const lables = ['Sign in', 'Sign up', 'Reset'];

const SignIn: SFC<SignInProps> = ({ classes }) => {
  const [tabIndex, setTabIndex] = useState(0);

  const handleSubmit = event => {
    event.preventDefault();

    const { email, password, repeatPassword } = event.target;

    const emailValue = email.value;
    const passwordValue = password && password.value;
    const repeatPasswordValue = repeatPassword && repeatPassword.value;

    if (tabIndex === 0) {
      handleLogin(emailValue, passwordValue);
    } else if (tabIndex === 1) {
      if (passwordValue !== repeatPasswordValue) {
        console.errror("Password doesn't match");
      } else {
        handleSignup(emailValue, passwordValue);
      }
    } else if (tabIndex === 2) {
      handleResendConfirmation(emailValue);
    }
  };

  const handleTabChange = (event, value) => {
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
      </Tabs>

      <form className={classes.form} onSubmit={handleSubmit}>
        <FormControl margin="normal" required fullWidth>
          <InputLabel htmlFor="email">Email Address</InputLabel>
          <Input id="email" name="email" autoComplete="email" autoFocus type="email" />
        </FormControl>
        {tabIndex !== 2 && (
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
