import { makeStyles, createStyles/* , Theme */ } from "@material-ui/core/styles";
// import { Image } from "@material-ui/icons";
// import Image from './images/mainPict.jpg'


export const useStyles = makeStyles(() =>
createStyles({
    boxNickName: {
        marginTop: '150px',
        textAlign: 'center',
        height: '150px',
        width: '300px',
        marginRight: 'auto',
        marginLeft: 'auto',
        border: '3px solid black',
        borderRadius: '15px',
        backgroundColor: 'rgba(130, 113, 101, 0.6)',
        // opacity: '0.1',
    },
    textField: {
        borderRadius: '7px',
        marginTop: '8%',
        marginRight: 'auto',
        marginLeft: 'auto',
        width: '70%',
        display: 'block',
        backgroundColor: 'white'
    },
    applyBut: {
        marginRight: 'auto',
        marginLeft: 'auto',
        marginTop: '3%',
        width: '35%',
        display: 'block',
        backgroundColor: 'green'
        
    },
    navStyle: {
        textDecoration: 'none'
    }

}));