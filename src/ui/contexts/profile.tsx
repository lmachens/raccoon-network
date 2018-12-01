import overwolf from 'api/overwolf';
import React from 'react';

interface Profile {
  username: string | null;
  userId: string | null;
  machineId: string | null;
  partnerId: number | null;
  channel: string | null;
}
export const ProfileContext = React.createContext<Profile>({
  username: null,
  userId: null,
  machineId: null,
  partnerId: null,
  channel: null
});

export class ProfileProvider extends React.Component<{}, Profile> {
  state = {
    username: null,
    userId: null,
    machineId: null,
    partnerId: null,
    channel: null
  };

  componentDidMount() {
    overwolf.profile.onLoginStateChanged.addListener(this.handleLoginStateChanged);
    overwolf.profile.getCurrentUser(this.handleCurrentUser);
  }

  componentWillUnmount() {
    overwolf.profile.onLoginStateChanged.removeListener(this.handleLoginStateChanged);
  }

  handleLoginStateChanged = loginState => {
    overwolf.profile.getCurrentUser(this.handleCurrentUser);
  };

  handleCurrentUser = currentUser => {
    this.setState({
      username: currentUser.username,
      userId: currentUser.userId,
      machineId: currentUser.machineId,
      partnerId: currentUser.partnerId,
      channel: currentUser.channel
    });
  };

  render() {
    const { children } = this.props;

    return <ProfileContext.Provider value={this.state}>{children}</ProfileContext.Provider>;
  }
}
