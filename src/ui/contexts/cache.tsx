import deepDiff from 'deep-diff';
import React from 'react';

interface ICache {
  state: {
    [key: string]: any;
  };
  setCache(key: string, value: any): void;
}

interface ICacheState {
  [key: string]: any;
}

export const CacheContext = React.createContext<ICache>({
  state: {},
  setCache: (key, value) => {
    // dummy
  }
});

export class CacheProvider extends React.Component<{}, ICacheState> {
  state = {};

  setCache = (key: string, value: any) => {
    const diff = deepDiff.diff(this.state[key], value);
    console.log(diff);
    if (diff) {
      this.setState({
        [key]: value
      });
    }
  };

  render() {
    const { children } = this.props;
    const value = {
      state: this.state,
      setCache: this.setCache
    };

    return <CacheContext.Provider value={value}>{children}</CacheContext.Provider>;
  }
}
