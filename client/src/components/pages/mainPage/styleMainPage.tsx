import { makeStyles, createStyles /* , Theme */ } from '@material-ui/core/styles';
// import { Image } from "@material-ui/icons";
// import Image from './images/mainPict.jpg'

export const useStyles = makeStyles(() =>
    createStyles({
        boxNickName: {
            marginTop: '20vh',
            textAlign: 'center',
            height: '150px',
            width: '300px',
            marginRight: 'auto',
            marginLeft: 'auto',
            border: '3px solid black',
            borderRadius: '15px',
            backgroundColor: 'rgba(130, 113, 101, 0.6)',
        },
        textField: {
            borderRadius: '7px',
            width: '70%',
            backgroundColor: 'white',
            marginTop: '8%',
        },
        navStyle: {
            border: '1px solid black',
            textDecoration: 'none',
            marginRight: 'auto',
            marginLeft: 'auto',
            marginTop: '5%',
            width: '35%',
            height: '30px',
            display: 'flex',
            backgroundColor: 'green',
            borderRadius: '10px',
            justifyContent: 'center',
            alignItems: 'center',
            color: 'black',
            '&:active': {
                borderWidth: '2.5px',
                borderColor: 'grey',
                borderRadius: '10px',
                background:
                    'rgb(100,100,100) radial-gradient(circle at 0 0, rgba(255,255,255,.65), rgba(255,255,255,.35))',
            },
        },
    })
);
