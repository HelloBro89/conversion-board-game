import React from 'react';
import { BrowserRouter as Router, Route, Switch /* Link */ } from 'react-router-dom';
import { Box } from '@material-ui/core';
import { MainPage } from '../pages/mainPage/components/mainPage';
import { Lobby } from '../pages/Lobby/Lobby';

const RouteHandler = () => (
    <Box style={{ height: '89vh', width: '100%' }}>
        <Router>
            <Switch>
                <Route exact path="/">
                    <MainPage />
                </Route>
                <Route exact path="/">
                    <Lobby />
                </Route>
            </Switch>
        </Router>
    </Box>
);

export default RouteHandler;
