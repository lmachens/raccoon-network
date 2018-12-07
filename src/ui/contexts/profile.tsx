import { stitchClient } from 'api/stitch';
import { getProfile, IUserProfile } from 'api/stitch/profile';
import { StitchAuthListener, StitchUser } from 'mongodb-stitch-browser-sdk';
import React from 'react';

interface IProfile extends IProfileState {
  refreshProfile(): void;
}
export const ProfileContext = React.createContext<IProfile>({
  isLoggingIn: false,
  isLoggedIn: false,
  isAnonymous: false,
  user: null,
  profile: null,
  refreshProfile: () => {
    //
  }
});

interface IProfileState {
  isLoggingIn: boolean;
  isLoggedIn: boolean;
  isAnonymous: boolean;
  user?: StitchUser | null;
  profile?: IUserProfile | null;
}

export class ProfileProvider extends React.Component<{}, IProfileState> {
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
