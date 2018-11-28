import createMuiTheme from '@material-ui/core/styles/createMuiTheme';

const light = () => {
  return createMuiTheme({
    palette: {
      type: 'light'
    },
    typography: {
      useNextVariants: true
    }
  });
};

export default light;
