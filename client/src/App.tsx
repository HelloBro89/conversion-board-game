import React, { FC/* , ChangeEvent, useState, useEffect */ } from "react";
// import { BrowserRouter as Router/* , Route, Link */ } from "react-router-dom";
import { AppBar, Button, Toolbar, Box} from "@material-ui/core";
import MenuIcon from '@mui/icons-material/Menu';
import { useStyles } from "./pages/mainPage/styleMainPage";
import  Routers from './routers/RouteHandler';
import backgroundIMG from './pages/mainPage/images/testPict.png'

// import { ITaskList } from './Interfaces';} from './requests/requests';

const App: FC = () => {
  const style = useStyles();
  return (
    <Box>
    <AppBar className={style.appBar} position='static'>
      <Toolbar>
        <Button color="inherit">Main Page</Button>
        <Button className={style.helpBut} color="inherit"> 
        <MenuIcon/>help
        </Button>
        
      </Toolbar>
     </AppBar>
     
     <div style={{height: '1000px', backgroundImage: `url(${backgroundIMG})`, overflow: 'hidden'}}>
      <Routers/>
    </div>
    </Box>
  )
}

export default App;