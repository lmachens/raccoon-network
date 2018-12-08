import React, { useContext } from 'react';

interface ILoading {
  state?: {
    [key: string]: string;
  };
  setLoading(key: string, message?: string): void;
}

interface ILoadingState {
  loading: {
    [key: string]: string;
  };
}

export const LoadingContext = React.createContext<ILoading>({
  setLoading: message => {
    // dummy
  }
});

export class LoadingProvider extends React.Component<{}, ILoadingState> {
  state = {
    loading: {}
  };

  setLoading = (key: string, message?: string) => {
    this.setState(state => {
      const loading = { ...state.loading };
      if (!message) {
        delete loading[key];
      } else {
        loading[key] = message;
      }
      return { loading };
    });
  };

  render() {
    const { children } = this.props;
    const value = {
      state: this.state.loading,
      setLoading: this.setLoading
    };

    return <LoadingContext.Provider value={value}>{children}</LoadingContext.Provider>;
  }
}

export const withLoading = WrappedComponent => {
  return props => {
    const { setLoading } = useContext(LoadingContext);
    return <WrappedComponent setLoading={setLoading} {...props} />;
  };
};
