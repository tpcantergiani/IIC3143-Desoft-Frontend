import red from '@material-ui/core/colors/red';
import teal from '@material-ui/core/colors/teal';

const themes = [
  {
    id: 'default',
    color: '#1769aa',
    source: {
      palette: {
        primary: {
          main: '#1e88e5',
        },
        secondary: {
          main: '#01579b',
        },
      },
    },
  },
  {
    id: 'green',
    color: '#00695f', // red[500],
    source: {
      palette: {
        primary: teal,
        secondary: {
          main: '#009688',
        },
        error: red,
      },
    },
  },
  {
    id: 'pink',
    color: '#b25977',
    source: {
      palette: {
        primary: {
          main: '#ff80ab',
        },
        secondary: {
          main: '#ff80ab',
        },
      },
    },
  },
];

export default themes;
