import CssBaseline from '@material-ui/core/CssBaseline';
import MuiThemeProvider, { MuiThemeProviderProps } from '@material-ui/core/styles/MuiThemeProvider';
import React, { SFC } from 'react';
import light from './light';

const ThemeProvider = ({ children }) => {
  return (
    <MuiThemeProvider theme={light()}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
};

export default ThemeProvider;
