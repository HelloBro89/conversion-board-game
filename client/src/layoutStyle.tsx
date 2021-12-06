import {
  makeStyles,
  createStyles /* , Theme */,
} from '@material-ui/core/styles';

export const useStyles = makeStyles(() =>
  createStyles({
    appBar: {
      borderRadius: '7px',
      backgroundColor: 'rgba(19, 55, 186, 0.97)',
    },
    boxHelp: { backgroundColor: 'red', marginLeft: 'auto', marginRight: '2%' },
    bottomNav: {
      backgroundColor: 'grey',
      height: '8vh',
      display: 'flex',
      justifyContent: 'center',
      alignContent: 'center',
      flexDirection: 'column',
    },
    bottomNavText: {
      display: 'flex',
      justifyContent: 'center',
    },
  })
);
