import React, { ChangeEvent, MouseEvent, useRef } from 'react';
import { TextField, Box } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import { useStyles } from '../styleMainPage';
import { useDispatch, useSelector } from 'react-redux';
// import io from 'socket.io-client';
// import socketIOClient from 'socket.io-client';
import { setNickName } from '../../../redux/actions/appDataAction';
import { RootState } from '../../../redux';
import { textFieldFilter, eventCode } from '../../../helpers/textFieldFilter';
// const socket = socketIOClient();

const FormNickName = () => {
    const enterRef = useRef<HTMLAnchorElement>(null);
    const classes = useStyles();
    const foundNickName = useSelector((state: RootState) => state.appData);
    const dispatch = useDispatch();
    // socket.on('test', (arg: string) => {
    //     console.log(arg);
    // });

    const getNickName = (e: MouseEvent) => {
        if (foundNickName.nickName.trim() === '') {
            e.preventDefault();
            alert('Enter your nick-name!');
            return;
        }
        // "proxy": "http://localhost:4000/",
        // const socket = socketIOClient();
        // socket.once('test', (arg: string) => {
        //     console.log(arg); // world
        // });
    };

    const handlerTextField = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const filteredValue = textFieldFilter(e);
        dispatch(setNickName(filteredValue));
    };

    // const test = () => {
    //     console.log('pre TEST');
    //     // socket.emit('test', 'Hello User');
    // };

    return (
        <Box className={classes.boxNickName}>
            {/* <button onClick={test}>TEST</button> */}
            <TextField
                onKeyDown={(e) => eventCode(e, enterRef)}
                onChange={(e) => handlerTextField(e)}
                className={classes.textField}
                label="Enter your nick-name"
                variant="filled"
                autoComplete="off"
                value={foundNickName.nickName}
            />
            <nav>
                <NavLink
                    to={`/lobby/${foundNickName.nickName}`}
                    ref={enterRef}
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
