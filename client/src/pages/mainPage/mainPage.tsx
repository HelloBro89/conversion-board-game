import { NavLink } from "react-router-dom";
import { TextField, Box, Button } from "@material-ui/core";
import { useStyles } from "./styleMainPage";
import backgroundIMG from './images/testPict.png'

export const MainPage = () => {
    const classes = useStyles();

    return (
        <Box style={{height: '100%', width: '100%', backgroundImage: `url(${backgroundIMG})`, overflow: 'hidden'}}>
            <Box className={classes.boxNickName} >
                <TextField className={classes.textField} id="filled-basic" label="Enter your nick-name" variant="filled" />
                <nav>
                    <NavLink to='/lobby' className={classes.navStyle}>
                        <Button className={classes.applyBut} variant="contained">Enter</Button>
                    </NavLink>
                </nav>
            </Box>
        </Box>
    );
};