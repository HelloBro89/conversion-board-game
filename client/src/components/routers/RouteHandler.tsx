import React from "react";
import { BrowserRouter as Router, Route, Switch /* Link */ } from "react-router-dom";
import { Box } from "@material-ui/core";
import { MainPage } from "../pages/mainPage/components/mainPage";
import { MainLayout } from "../pages/mainLobby/mainLobby";



 const RouteHandler = () => (
    <Box style={{height: '81vh', width: '100%'}}>
         <Router>
             <Switch>
                <Route exact path='/'>
                    <MainPage/>
                </Route>
                <Route exact path='/lobby'>
                    <MainLayout/>
                </Route>
             </Switch>
        </Router>
    </Box>
 )

export default RouteHandler