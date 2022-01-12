import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styles from '../lobbyStyle.module.css';
import { ConnectInfo } from '../containers/ConnectInfo';
import { RootState } from '../../../redux';
import { setNickName } from '../../../redux/actions/nickNameAction';
// import { useDispatch, useSelector } from 'react-redux';

export const Lobby = () => {
    const dispatch = useDispatch();
    const searchNickName = useSelector((state: RootState) => state.nickName);
    const params = useParams();

    useEffect(() => {
        console.log(typeof params.nickName);
        if (params.nickName !== searchNickName.nickName) {
            dispatch(setNickName(params.nickName!));
        }
    }, []);

    const test = () => {
        console.log(searchNickName.nickName);
    };

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
            <button onClick={test} className={styles.createHost}>
                Create host
            </button>
        </div>
    );
};
