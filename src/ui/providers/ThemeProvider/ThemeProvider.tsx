import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/styles';
import React from 'react';
import light from 'ui/themes/light';

const ThemeProvider = ({ children }) => {
  return (
    <MuiThemeProvider theme={light()}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
};

export default ThemeProvider;
