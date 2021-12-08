import React, { ChangeEvent } from 'react';
import { NavLink } from 'react-router-dom';
import { useStyles } from '../styleMainPage';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, Box, Button } from '@material-ui/core';
import { setNickName } from '../../../redux/actions/nickNameAction';
import { RootState } from '../../../redux';

const FormNickName = () => {
    const classes = useStyles();
    const searchNickName = useSelector((state: RootState) => state.nickName);
    const dispatch = useDispatch();

    const handlerTextField = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        e.preventDefault();
        dispatch(setNickName(e.target.value));
    };

    const getNickName = () => {
        console.log(searchNickName.nickName);
    };

    return (
        <Box className={classes.boxNickName}>
            {/* <Button onClick={ addNickName }  variant="contained">Enter</Button> */}
            <TextField onChange={(e) => handlerTextField(e)} className={classes.textField} id="filled-basic" label="Enter your nick-name" variant="filled" />
            <nav style={{ backgroundColor: 'red' }}>
                <NavLink to="/lobby" className={classes.navStyle}></NavLink>
                <Button onClick={getNickName} className={classes.applyBut} variant="contained">
                    Enter
                </Button>
            </nav>
        </Box>
    );
};

export default FormNickName;
