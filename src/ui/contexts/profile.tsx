import { stitchClient } from 'api/stitch';
import { getProfile, UserProfile } from 'api/stitch/profile';
import { StitchAuthListener, StitchUser } from 'mongodb-stitch-browser-sdk';
import React from 'react';

interface Profile extends ProfileState {
  refreshProfile(): void;
}
export const ProfileContext = React.createContext<Profile>({
  isLoggingIn: false,
  isLoggedIn: false,
  isAnonymous: false,
  user: null,
  profile: null,
  refreshProfile: () => {
    //
  }
});

interface ProfileState {
  isLoggingIn: boolean;
  isLoggedIn: boolean;
  isAnonymous: boolean;
  user?: StitchUser | null;
  profile?: UserProfile | null;
}

export class ProfileProvider extends React.Component<{}, ProfileState> {
  state = {
    isLoggingIn: true,
    isLoggedIn: false,
    isAnonymous: false,
    user: null,
    profile: null
  };

  handleAuth: StitchAuthListener = {
    onAuthEvent: async auth => {
      const profile = auth.isLoggedIn ? await getProfile(auth.user!.id) : null;
      const isAnonymous = !!auth.user && auth.user.loggedInProviderName === 'anon-user';
      this.setState({
        isLoggingIn: false,
        isLoggedIn: auth.isLoggedIn,
        isAnonymous,
        user: auth.user,
        profile
      });
    }
  };

  componentDidMount() {
    stitchClient.auth.addAuthListener(this.handleAuth);
  }

  componentWillUnmount() {
    stitchClient.auth.removeAuthListener(this.handleAuth);
  }

  refreshProfile = async () => {
    const { user } = this.state;
    if (!user) {
      return;
    }
    // @ts-ignore
    const profile = await getProfile(user!.id);
    this.setState({
      profile
    });
  };

  render() {
    const { children } = this.props;
    const value = {
      ...this.state,
      refreshProfile: this.refreshProfile
    };

    return <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>;
  }
}
