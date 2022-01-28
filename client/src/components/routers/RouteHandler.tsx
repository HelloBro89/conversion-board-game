import { /* BrowserRouter as Router, */ Route, Routes /* HashRouter */ } from 'react-router-dom';
import { Box } from '@material-ui/core';
import { MainPage } from '../pages/mainPage/components/mainPage';
import { Lobby } from '../pages/Lobby/components/Lobby';
import { HostRoom } from '../pages/HostRoom/HostRoom';
import { NotFound } from '../pages/Errors/NotFound';

const RouteHandler = () => {
    return (
        <Box style={{ height: '89vh', width: '100%' }}>
            {/* <Router> */}
            {/* <HashRouter> */}
            <Routes>
                <Route path="/" element={<MainPage />}></Route>
                <Route path="/lobby/:nickName" element={<Lobby />}></Route>
                <Route path="/hostRoom/:hostName" element={<HostRoom />}></Route>
                <Route path="/error" element={<NotFound />}></Route>
                <Route path="*" element={<NotFound />}></Route>
            </Routes>
            {/* </HashRouter> */}
            {/* </Router> */}
        </Box>
    );
};

export default RouteHandler;
