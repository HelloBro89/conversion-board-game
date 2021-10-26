import { NavLink } from "react-router-dom";
import { useStyles } from "../components/styleMainPage";
import { TextField, Box, Button } from "@material-ui/core";

const FormNickName = () => {
    const classes = useStyles();
    
    const addNickName = () => {
        console.log("TEST");
    }

    return (
        <Box className={classes.boxNickName}>
            <TextField className={classes.textField} id="filled-basic" label="Enter your nick-name" variant="filled" />
            <nav>
                <NavLink to='/lobby' className={classes.navStyle}>
                    <Button onClick={ addNickName } className={classes.applyBut} variant="contained">Enter</Button>
                </NavLink>
            </nav>
        </Box>
    )
}

export default FormNickName