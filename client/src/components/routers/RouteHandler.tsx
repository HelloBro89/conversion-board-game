import React from 'react';
import { BrowserRouter as Router, Route, Routes /* HashRouter */ } from 'react-router-dom';
import { Box } from '@material-ui/core';
import { MainPage } from '../pages/mainPage/components/mainPage';
import { Lobby } from '../pages/Lobby/components/Lobby';

const RouteHandler = () => (
    <Box style={{ height: '89vh', width: '100%' }}>
        <Router>
            {/* <HashRouter> */}
            <Routes>
                <Route path="/" element={<MainPage />}></Route>
                <Route path="/lobby/:nickName" element={<Lobby />}></Route>
            </Routes>
            {/* </HashRouter> */}
        </Router>
    </Box>
);

export default RouteHandler;
