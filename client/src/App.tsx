import React, { FC/* , ChangeEvent, useState, useEffect */ } from "react";
// import { BrowserRouter as Router/* , Route, Link */ } from "react-router-dom";
import  Routers  from './routers/RouteHandler';

// import {Button, Input} from "@material-ui/core";
// import { useStyles } from "./styles";
// import { ITaskList } from './Interfaces';
// import { updatedTask, createTask, deleteAllTasks, deleteOneTask, getAllTasks } from './requests/requests';

const App: FC = () => (
  <div>
    <Routers/>
  </div>

)

export default App;