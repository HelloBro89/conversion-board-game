import { TextField, Box } from "@material-ui/core";
import { useStyles } from "./styleMainPage";

export const MainPage = () => {


    const classes = useStyles();

    return (
            <Box className={classes.boxNickName}>
                <TextField className={classes.textField} id="filled-basic" label="Enter your nick-name" variant="filled" />
            </Box>
    );
};