import React from 'react';

interface Target {
  target: {
    key: string;
    value: string;
  } | null;
  setTarget(key, value): void;
  unsetTarget(): void;
}

export const TargetContext = React.createContext<Target>({
  target: null,
  setTarget: (key, value) => {
    //
  },
  unsetTarget: () => {
    //
  }
});

interface TargetState {
  target: {
    key: string;
    value: string;
  } | null;
}

export class TargetProvider extends React.Component<{}, TargetState> {
  state = {
    target: null
  };

  setTarget = (key: string, value: string) => {
    this.setState({
      target: {
        key,
        value
      }
    });
  };

  unsetTarget = () => {
    this.setState({
      target: null
    });
  };

  render() {
    const { children } = this.props;
    const value = {
      target: this.state.target,
      setTarget: this.setTarget,
      unsetTarget: this.unsetTarget
    };

    return <TargetContext.Provider value={value}>{children}</TargetContext.Provider>;
  }
}
