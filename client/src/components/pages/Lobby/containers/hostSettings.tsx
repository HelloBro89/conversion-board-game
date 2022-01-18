// import React, { useRef } from 'react';
import { FormEvent } from 'react';
import styles from '../lobbyStyle.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { TextField } from '@material-ui/core';
// import { useStyles } from '../stylesLobby';
import { RootState } from '../../../redux';
import closedIcon from '../images/cross.png';
import {
    setNumberOfPlayers,
    setModalStatus,
    setGameTime,
    setHostName,
} from '../../../redux/actions/appDataAction';

export const HostSettings = () => {
    // const nodeRef = useRef(null);
    // const findModalStatus = useSelector((state: RootState) => state.appData.modalStatus);
    // const findNumberOfPlayers = useSelector((state: RootState) => state.appData.numOfPlayers);
    const data = useSelector((state: RootState) => state.appData);
    const dispatch = useDispatch();
    // const classes = useStyles();

    const formHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(data);
        console.log(data.modalStatus);
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
                <form onSubmit={(e) => formHandler(e)} action="" id="form1">
                    <div className={styles.inputHostName}>
                        <TextField
                            onChange={(e) => dispatch(setHostName(e.currentTarget.value))}
                            id="filled-basic"
                            label="Your host name"
                            variant="filled"
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
                            <button
                                type="submit" /* onClick={() => console.log(findNumberOfPlayers)} */
                            >
                                Create
                            </button>
                        </div>
                        <div>
                            <button onClick={() => dispatch(setModalStatus(false))}>Cancel</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};
