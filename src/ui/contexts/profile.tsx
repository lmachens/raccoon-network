import { stitchClient } from 'api/stitch';
import { StitchAuthListener, StitchUser } from 'mongodb-stitch-browser-sdk';
import React from 'react';

interface Profile {
  isLoggedIn: boolean;
  user?: StitchUser | null;
}
export const ProfileContext = React.createContext<Profile>({
  isLoggedIn: false,
  user: null
});

export class ProfileProvider extends React.Component<{}, Profile> {
  state = {
    isLoggedIn: false,
    user: null
  };

  handleAuth: StitchAuthListener = {
    onAuthEvent: auth => {
      console.log(auth);
      this.setState({
        isLoggedIn: auth.isLoggedIn,
        user: auth.user
      });
    }
  };

  componentDidMount() {
    stitchClient.auth.addAuthListener(this.handleAuth);
  }

  componentWillUnmount() {
    stitchClient.auth.removeAuthListener(this.handleAuth);
  }

  render() {
    const { children } = this.props;

    return <ProfileContext.Provider value={this.state}>{children}</ProfileContext.Provider>;
  }
}
