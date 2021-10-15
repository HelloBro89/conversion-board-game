import React from "react";
import { BrowserRouter as Router, Route, /* Link */ } from "react-router-dom";
import { MainPage } from "../pages/mainPage/mainPage";

 const RouteHandler = () => (
     <div>
         <Router>

             <Route exact path='/'>
               <MainPage/>
             </Route>

             <Route exact path='/game'>
                 Test Game
             </Route>

         </Router>
     </div>
 )

export default RouteHandler