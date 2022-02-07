import React, { ChangeEvent, MouseEvent, useRef } from 'react';
import { TextField, Box } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import { useStyles } from '../styleMainPage';
import { useDispatch, useSelector } from 'react-redux';
import { setNickName } from '../../../redux/actions/appDataAction';
import { RootState } from '../../../redux';
import { textFieldFilter, eventCode } from '../../../helpers/textFieldFilter';

const FormNickName = () => {
    const enterRef = useRef<HTMLAnchorElement>(null);
    const classes = useStyles();
    const foundNickName = useSelector((state: RootState) => state.appData);
    const dispatch = useDispatch();

    const getNickName = (e: MouseEvent) => {
        if (foundNickName.nickName.trim() === '') {
            e.preventDefault();
            alert('Enter your nick-name!');
            return;
        }
        // "proxy": "http://localhost:4000/",
    };

    const handlerTextField = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const filteredValue = textFieldFilter(e);
        dispatch(setNickName(filteredValue));
    };

    return (
        <Box className={classes.boxNickName}>
            <TextField
                onKeyDown={(e) => eventCode(e, enterRef)}
                onChange={(e) => handlerTextField(e)}
                className={classes.textField}
                label="Enter your nick-name"
                variant="filled"
                autoComplete="off"
                value={foundNickName.nickName}
            />
            {/* <nav> */}
            <NavLink
                to={`/lobby/${foundNickName.nickName}`}
                ref={enterRef}
                id="send"
                onClick={(e) => getNickName(e)}
                className={classes.navStyle}
            >
                Enter
            </NavLink>
            {/* </nav> */}
        </Box>
    );
};

export default FormNickName;
