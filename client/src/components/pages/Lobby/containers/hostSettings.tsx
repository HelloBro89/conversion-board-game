import styles from '../lobbyStyle.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux';
import closedIcon from '../images/cross.png';
import { /* setNickName, */ setModalStatus } from '../../../redux/actions/appDataAction';

export const HostSettings = () => {
    const findModalStatus = useSelector((state: RootState) => state.appData.modalStatus);
    const dispatch = useDispatch();
    return (
        <div className={findModalStatus ? styles.activeModal : styles.hostContainer}>
            <div className={styles.hostSettings}>
                <button onClick={() => dispatch(setModalStatus(false))} className={styles.btnIcon}>
                    <img className={styles.closeIcon} src={closedIcon}></img>
                </button>
                <div className={styles.test}>
                    <div>
                        Host name
                        <input type="text" name="" id="" />
                    </div>
                    <div>
                        Gane time
                        <select>
                            <option>average</option>
                            <option>long</option>
                            <option>short</option>
                        </select>
                        Number of players
                        <select>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                        </select>
                    </div>
                </div>
                <div className={styles.footBtns}>
                    <button>Create</button>
                    <button onClick={() => dispatch(setModalStatus(false))}>Cancel</button>
                </div>
            </div>
        </div>
    );
};
