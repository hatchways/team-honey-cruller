import { createTheme } from '@material-ui/core';

export const theme = createTheme({
  typography: {
    fontFamily: '"Spartan", sans-serif',
    fontSize: 12,
    button: {
      textTransform: 'none',
      fontWeight: 700,
    },
  },
  palette: {
    common: { black: '#000', white: '#fff' },
    primary: { main: '#000' },
    secondary: { main: '#DCDCDC' },
  },
  shape: {
    borderRadius: 5,
  },
});
