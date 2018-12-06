import blue from '@material-ui/core/colors/blue';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';

const light = () => {
  return createMuiTheme({
    palette: {
      type: 'light',
      primary: blue,
      action: {
        selected: '#d0e6ec'
      }
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
    },
    overrides: {}
  });
};

export default light;
