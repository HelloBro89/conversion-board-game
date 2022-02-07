// import React, { useRef } from 'react';
import { ChangeEvent, FormEvent, MouseEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
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
    setCheckHost,
    // setNickName,
} from '../../../redux/actions/appDataAction';
import { textFieldFilter, eventCode } from '../../../helpers/textFieldFilter';

export const HostSettings = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { nickName, hostName, numOfPlayers, gameTime, modalStatus } = useSelector(
        (state: RootState) => state.appData
    );
    const { connectedSocket } = useSelector((state: RootState) => state.socketsData);

    const handlerTextField = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const filteredValue = textFieldFilter(e);
        dispatch(setHostName(filteredValue));
    };

    const createRoom = () => {
        dispatch(setCheckHost(true));
        const newHostData = {
            numOfPlayers: numOfPlayers,
            gameTime: gameTime,
            hostName: hostName,
            hostID: connectedSocket.id,
            players: [],
        };
        // const jsonRoomSettings = JSON.stringify(newHostData);

        localStorage.setItem('roomData', JSON.stringify(newHostData));

        connectedSocket.emit('newHost', newHostData);

        const path = `/hostRoom/${hostName}?nickName=${nickName}&checkHost=true`;
        navigate(path);
    };

    return (
        <div className={modalStatus ? styles.activeModal : styles.hostContainer}>
            <div className={styles.hostSettings}>
                <div className={styles.blockCloseBtn}>
                    <button
                        className={styles.btnIcon}
                        onClick={() => dispatch(setModalStatus(false))}
                    >
                        <img className={styles.closeIcon} src={closedIcon}></img>
                    </button>
                </div>
                <div className={styles.inputHostName}>
                    <TextField
                        onKeyDown={(e) => eventCode(e)}
                        onChange={(e) => handlerTextField(e)}
                        id="filled-basic"
                        label="Your host name"
                        variant="filled"
                        value={hostName}
                    />
                </div>
                <div className={styles.selectNameTime}>
                    <div>
                        <label htmlFor="gameTime">Game time </label>
                        <select
                            value={gameTime}
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
                            value={numOfPlayers}
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
                        <button onClick={createRoom}>Create</button>
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
            </div>
        </div>
    );
};
