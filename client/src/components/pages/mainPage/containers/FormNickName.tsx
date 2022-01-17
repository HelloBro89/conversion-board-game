import React, { ChangeEvent, MouseEvent, KeyboardEvent, useRef } from 'react';
import { TextField, Box } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import { useStyles } from '../styleMainPage';
import { useDispatch, useSelector } from 'react-redux';
// import io from 'socket.io-client';
import { setNickName } from '../../../redux/actions/appDataAction';
import { RootState } from '../../../redux';

const FormNickName = () => {
    const ref = useRef<HTMLAnchorElement>(null);
    const classes = useStyles();
    const searchNickName = useSelector((state: RootState) => state.appData);
    const dispatch = useDispatch();

    const handlerTextField = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        e.preventDefault();
        const nickValue = e.currentTarget.value;
        const regexp = /^\S/;
        const matchedValue = nickValue.match(regexp);

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
        // "proxy": "http://localhost:4000/",
        // io();
    };

    const pushEnter = (e: KeyboardEvent) => {
        if (e.code === 'Enter' || e.code === 'NumpadEnter') {
            const elemTest = ref.current as HTMLElement;
            elemTest.click();
        }
        return;
    };

    return (
        <Box className={classes.boxNickName}>
            <TextField
                onKeyDown={(e) => pushEnter(e)}
                onChange={(e) => handlerTextField(e)}
                className={classes.textField}
                // id="filled-basic"
                label="Enter your nick-name"
                variant="filled"
                autoComplete="off"
                value={searchNickName.nickName}
            />
            <nav>
                <NavLink
                    to={`/lobby/${searchNickName.nickName}`}
                    ref={ref}
                    id="send"
                    onClick={(e) => getNickName(e)}
                    className={classes.navStyle}
                >
                    Enter
                </NavLink>
            </nav>
        </Box>
    );
};

export default FormNickName;
