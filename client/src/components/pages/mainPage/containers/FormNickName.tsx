import React, { ChangeEvent } from 'react';
import { NavLink } from 'react-router-dom';
import { useStyles } from '../styleMainPage';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, Box } from '@material-ui/core';
import { setNickName } from '../../../redux/actions/nickNameAction';
import { RootState } from '../../../redux';

const FormNickName = () => {
    const classes = useStyles();
    const searchNickName = useSelector((state: RootState) => state.nickName);
    const dispatch = useDispatch();

    const handlerTextField = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        e.preventDefault();
        const nickValue = e.target.value;
        if (nickValue.trim() === ' ') {
            alert('Enter your nick-name!');
            return;
        }
        dispatch(setNickName(nickValue));
    };

    const getNickName = () => {
        console.log(searchNickName.nickName);
    };

    return (
        <Box className={classes.boxNickName}>
            <TextField
                onChange={(e) => handlerTextField(e)}
                className={classes.textField}
                id="filled-basic"
                label="Enter your nick-name"
                variant="filled"
            />
            <nav>
                <NavLink to="/lobby" type="button" onClick={getNickName} className={classes.navStyle}>
                    Enter
                </NavLink>
            </nav>
        </Box>
    );
};

export default FormNickName;
