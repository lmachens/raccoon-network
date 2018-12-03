import createMuiTheme from '@material-ui/core/styles/createMuiTheme';

const dark = () => {
  return createMuiTheme({
    palette: {
      type: 'dark'
    },
    typography: {
      useNextVariants: true
    },
    breakpoints: {
      values: {
        xs: 0,
        sm: 760,
        md: 960,
        lg: 1280,
        xl: 1920
      }
    }
  });
};

export default dark;
