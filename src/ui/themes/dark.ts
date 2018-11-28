import createMuiTheme from '@material-ui/core/styles/createMuiTheme';

const dark = () => {
  return createMuiTheme({
    palette: {
      type: 'dark'
    },
    typography: {
      useNextVariants: true
    }
  });
};

export default dark;
