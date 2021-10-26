import React, { ChangeEvent } from "react";
import { NavLink } from "react-router-dom";
import { useStyles } from "../components/styleMainPage";
import { useDispatch, useSelector } from 'react-redux';
import { TextField, Box, Button } from "@material-ui/core";
import { setNickName } from "../../../redux/actions/nickNameAction";
import { RootState } from "../../../redux";

const FormNickName = () => {
    const classes = useStyles();
    const searchNickName = useSelector((state: RootState) => state.nickName);
    const dispatch = useDispatch();
    
    const handlerTextField = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        e.preventDefault();
        dispatch(setNickName(e.target.value));

    }

    const addNickName = () => {
        console.log(searchNickName.nickName);
    }

    return (
        <Box className={classes.boxNickName}>
            {/* <Button onClick={ addNickName }  variant="contained">Enter</Button> */}
            <TextField  onChange={(e) => handlerTextField(e)} className={classes.textField} id="filled-basic" label="Enter your nick-name" variant="filled" />
            <nav>
                <NavLink to='/lobby' className={classes.navStyle}>
                    <Button onClick={ addNickName } className={classes.applyBut} variant="contained">Enter</Button>
                    

                </NavLink>
            </nav>
        </Box>
    )
}

export default FormNickName