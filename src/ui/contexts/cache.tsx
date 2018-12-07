import React, { useContext } from 'react';

interface Cache {
  state: {
    [key: string]: any;
  };
  setCache(key: string, value: any): void;
}

interface CacheState {
  [key: string]: any;
}

export const CacheContext = React.createContext<Cache>({
  state: {},
  setCache: (key, value) => {
    // dummy
  }
});

export class CacheProvider extends React.Component<{}, CacheState> {
  state = {};

  setCache = (key: string, value: any) => {
    this.setState({
      [key]: value
    });
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
