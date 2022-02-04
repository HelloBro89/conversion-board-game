import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box } from '@material-ui/core';
import backgroundIMG from '../images/testBackground.png';
import FormNickName from '../containers/FormNickName';
import { RootState } from '../../../redux';
import { resetSocketData } from '../../../redux/actions/socketsDataAction';
import { resetAppData } from '../../../redux/actions/appDataAction';

export const MainPage = () => {
    const dispatch = useDispatch();
    const { connectedSocket } = useSelector((state: RootState) => state.socketsData);
    const socketsData = useSelector((state: RootState) => state.socketsData);
    const appData = useSelector((state: RootState) => state.appData);
    useEffect(() => {
        if (Object.keys(connectedSocket).length !== 0) {
            connectedSocket.disconnect();
            dispatch(resetAppData());
            dispatch(resetSocketData());

            console.log(`Socket disconnected`);
        }
    }, []);

    const test = () => {
        console.log(appData);
        console.log(socketsData);
    };
    return (
        <Box
            style={{
                height: '100%',
                width: '100%',
                backgroundImage: `url(${backgroundIMG})`,
                overflow: 'auto',
            }}
        >
            <FormNickName />
            <button onClick={test}>TEST </button>
        </Box>
    );
};
