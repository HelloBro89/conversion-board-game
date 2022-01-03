import { Box } from '@material-ui/core';
import { useStyles } from './styleMainLobby';

export const Lobby = () => {
    const styles = useStyles();
    // return <div>TEST</div>;
    return <Box className={styles.lobby}>There will be main lobby</Box>;
};
