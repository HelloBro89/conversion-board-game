import styles from '../lobbyStyle.module.css';

export const Lobby = () => {
    // const styles = useStyles();
    // return <div>TEST</div>;
    return (
        <div className={styles.container}>
            <div className={styles.connectionList}>
                <div className={styles.listHeader}>
                    <div>Host name</div>
                    <div>Game time</div>
                    <div>Number of persons</div>
                    {/* There will be something */}
                </div>
            </div>
            <button className={styles.createHost}>Create host</button>
        </div>
    );
};
