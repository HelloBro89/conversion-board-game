// import React, { useRef } from 'react';
import { ChangeEvent, FormEvent, MouseEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { TextField } from '@material-ui/core';
import styles from '../lobbyStyle.module.css';
// import { useStyles } from '../stylesLobby';
import { RootState } from '../../../redux';
import closedIcon from '../images/cross.png';
import {
    setNumberOfPlayers,
    setModalStatus,
    setGameTime,
    setHostName,
    // setNickName,
} from '../../../redux/actions/appDataAction';
import { textFieldFilter, eventCode } from '../../../helpers/textFieldFilter';

export const HostSettings = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const data = useSelector((state: RootState) => state.appData);
    const socketClient = useSelector((state: RootState) => state.socketsData.connectedSocket);
    const foundNickName = useSelector((state: RootState) => state.appData.nickName);
    const foundHostName = useSelector((state: RootState) => state.appData.hostName);

    const handlerTextField = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const filteredValue = textFieldFilter(e);
        dispatch(setHostName(filteredValue));
    };

    const butHandler = () => {
        const newHostData = {
            numOfPlayers: data.numOfPlayers,
            gameTime: data.gameTime,
            hostName: data.hostName,
        };
        socketClient.emit('newHost', newHostData);
        const path = `/hostRoom/${foundHostName}?nickName=${foundNickName}`;
        navigate(path);
    };

    return (
        <div className={data.modalStatus ? styles.activeModal : styles.hostContainer}>
            <div className={styles.hostSettings}>
                <div className={styles.blockCloseBtn}>
                    <button
                        className={styles.btnIcon}
                        onClick={() => dispatch(setModalStatus(false))}
                    >
                        <img className={styles.closeIcon} src={closedIcon}></img>
                    </button>
                </div>
                {/* <form
                    // onSubmit={() => formHandler()}
                    action=""
                    id="form1"
                > */}
                <div className={styles.inputHostName}>
                    <TextField
                        onKeyDown={(e) => eventCode(e)}
                        onChange={(e) => handlerTextField(e)}
                        id="filled-basic"
                        label="Your host name"
                        variant="filled"
                        value={data.hostName}
                    />
                </div>
                <div className={styles.selectNameTime}>
                    <div>
                        <label htmlFor="gameTime">Game time </label>
                        <select
                            value={data.gameTime}
                            onChange={(e) => dispatch(setGameTime(e.target.value))}
                            id="gameTime"
                        >
                            <option>average</option>
                            <option>long</option>
                            <option>short</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="NumberOfPlayers">Number of players </label>
                        <select
                            value={data.numOfPlayers}
                            onChange={(e) => dispatch(setNumberOfPlayers(e.target.value))}
                            id="NumberOfPlayers"
                        >
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                        </select>
                    </div>
                </div>

                <div className={styles.footBtns}>
                    <div>
                        <button onClick={butHandler}>Create</button>
                        {/* <NavLink
                            to={`/hostRoom/${data.hostName}`}
                            // ref={enterRef}
                            id="send"
                            // type="submit"
                            onClick={formHandler}
                            // className={classes.navStyle}
                        >
                            Create
                        </NavLink> */}
                    </div>

                    <div>
                        <button
                            onClick={(e) => {
                                e.preventDefault(), dispatch(setModalStatus(false));
                            }}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
                {/* </form> */}
            </div>
        </div>
    );
};
