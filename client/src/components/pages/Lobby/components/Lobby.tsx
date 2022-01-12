import React, { useEffect } from 'react';
import styles from '../lobbyStyle.module.css';
import { ConnectInfo } from '../containers/ConnectInfo';
// import { useDispatch, useSelector } from 'react-redux';
// import { RootState } from '../../../redux';

export const Lobby = () => {
    // const dispatch = useDispatch();
    // const searchNickName = useSelector((state: RootState) => state.nickName);
    useEffect(() => {
        console.log(localStorage.getItem('nickName'));
    }, []);
    return (
        <div className={styles.container}>
            <div className={styles.connectionList}>
                <div className={styles.listHeader}>
                    <div className={styles.firstCol}>Host name</div>
                    <div className={styles.secondCol}>Game time</div>
                    <div className={styles.thirdCol}>Number of persons</div>
                </div>
                <ConnectInfo />
            </div>
            <button className={styles.createHost}>Create host</button>
        </div>
    );
};
