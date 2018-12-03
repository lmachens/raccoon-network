import {
  Button,
  createStyles,
  FormControl,
  Input,
  InputLabel,
  Typography,
  withStyles,
  WithStyles
} from '@material-ui/core';
import { setProfile } from 'api/stitch/profile';
import React, { SFC, useContext, useRef, useState } from 'react';
import { LoadingContext } from 'ui/contexts/loading';
import { ProfileContext } from 'ui/contexts/profile';

interface UsernameProps extends WithStyles<typeof styles> {}

const styles = theme =>
  createStyles({
    root: {
      marginTop: 8,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit *
        3}px`,
      marginLeft: 'auto',
      marginRight: 'auto',
      width: '100%'
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing.unit
    },
    submit: {
      marginTop: theme.spacing.unit * 3
    }
  });

const Username: SFC<UsernameProps> = ({ classes }) => {
  const { refreshProfile } = useContext(ProfileContext);
  const { setLoading } = useContext(LoadingContext);
  const [error, setError] = useState<Error | null>(null);

  const handleSubmit = async event => {
    event.preventDefault();
    setError(null);

    const { username } = event.target;
    const usernameValue = username && username.value.trim();

    try {
      setLoading('username', 'Set username');
      await setProfile({ username: usernameValue });
      refreshProfile();
    } catch (error) {
      setError(error);
      console.error(error);
    }
    setLoading('username');
  };

  return (
    <div className={classes.root}>
      <form className={classes.form} onSubmit={handleSubmit}>
        <Typography>Please select a username</Typography>
        <FormControl margin="normal" required fullWidth>
          <InputLabel htmlFor="username">Username</InputLabel>
          <Input name="username" id="username" autoComplete="username" />
        </FormControl>
        {error && <Typography color="error">{error.message}</Typography>}
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Save
        </Button>
      </form>
    </div>
  );
};

export default withStyles(styles)(Username);
