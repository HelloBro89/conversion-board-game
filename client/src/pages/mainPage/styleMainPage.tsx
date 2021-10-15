import { makeStyles, createStyles/* , Theme */ } from "@material-ui/core/styles";
// import { Image } from "@material-ui/icons";
// import Image from './images/mainPict.jpg'


export const useStyles = makeStyles(() =>
createStyles({
    appBar: {
        backgroundColor: 'rgba(58, 51, 46, 0.6)'
    },
    boxNickName: {
        marginTop: '150px',
        textAlign: 'center',
        height: '150px',
        width: '300px',
        marginRight: 'auto',
        marginLeft: 'auto',
        border: '3px solid black',
        borderRadius: '15px',
        backgroundColor: 'rgba(58, 51, 46, 0.6)',
        // opacity: '0.1',
    },
    textField: {
        marginTop: '40px',
        backgroundColor: 'white'
    },
    helpBut: {
        marginLeft: 'auto'
    }

}));