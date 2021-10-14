import React from "react";
import { BrowserRouter as Router, Route, /* Link */ } from "react-router-dom";


 const RouteHandler = () => (
     <div>
         <Router>

             <Route exact path='/'>
             Test Route
             </Route>

             <Route exact path='/game'>
             Test Game
             </Route>

         </Router>
     </div>
 )

export default RouteHandler