import React, { ChangeEvent, MouseEvent /* useRef */ } from 'react';
import { NavLink } from 'react-router-dom';
import { useStyles } from '../styleMainPage';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, Box } from '@material-ui/core';
import { setNickName } from '../../../redux/actions/nickNameAction';
import { RootState } from '../../../redux';

const FormNickName = () => {
    // const test = useRef<HTMLAnchorElement>(null);
    const classes = useStyles();
    const searchNickName = useSelector((state: RootState) => state.nickName);
    const dispatch = useDispatch();

    const handlerTextField = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        e.preventDefault();
        const nickValue = e.target.value;
        const regexp = /^\S/;
        const matchedValue = nickValue.match(regexp);
        // console.log(matchedValue);

        if (matchedValue) {
            dispatch(setNickName(nickValue));
        } else {
            e.target.setSelectionRange(0, 0);
            dispatch(setNickName(''));
        }
    };

    const getNickName = (e: MouseEvent) => {
        if (searchNickName.nickName.trim() === '') {
            e.preventDefault();
            alert('Enter your nick-name!');
            return;
        }
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
                autoComplete="off"
                value={searchNickName.nickName}
            />
            <nav>
                <NavLink to="/lobby" /* ref={test} */ /*  id="send" */ onClick={(e) => getNickName(e)} className={classes.navStyle}>
                    Enter
                </NavLink>
            </nav>
        </Box>
    );
};

export default FormNickName;
