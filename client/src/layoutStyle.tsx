import { makeStyles, createStyles/* , Theme */ } from "@material-ui/core/styles";

export const useStyles = makeStyles(() =>
createStyles({
    appBar: {
        borderRadius: '7px',
        backgroundColor: 'rgba(19, 55, 186, 0.97)'
    },
    helpBut: {
        marginLeft: 'auto'
    }

}));