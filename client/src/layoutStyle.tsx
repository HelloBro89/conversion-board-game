import { makeStyles, createStyles/* , Theme */ } from "@material-ui/core/styles";

export const useStyles = makeStyles(() =>
createStyles({
    appBar: {
        borderRadius: '7px',
        backgroundColor: 'rgba(19, 55, 186, 0.97)'
    },
    helpBut: {
        marginLeft: 'auto'
    },
    bottomNav: {
        backgroundColor: 'grey',
        height: '10vh',
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',
        flexDirection: 'column'
    },
    test: {
        display: 'flex',
        justifyContent: 'center',
        // display: 'flex',
        // justifyContent: 'center',
        // alignContent: 'center',
        // flexDirection: 'row'
    }

}));