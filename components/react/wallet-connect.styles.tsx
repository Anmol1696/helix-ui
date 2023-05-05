import { makeStyles } from '@material-ui/core/styles';
import { Theme } from '@material-ui/core/styles/createTheme';

export const useStyles = makeStyles<Theme>((theme) => ({
  button: {
    backgroundImage: `linear-gradient(109.6deg, ${theme.palette.primary.main} 11.2%, ${theme.palette.primary.dark} 83.1%)`,
    color: 'white',
    opacity: 1,
    transition: 'all .5s ease-in-out',
    '&:hover': {
      opacity: 0.75,
    },
    '&:active': {
      opacity: 0.9,
    },
  },
  icon: {
    fontSize: '1.5rem',
  },
}));
