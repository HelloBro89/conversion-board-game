import React, { FC/* , ChangeEvent, useState, useEffect */ } from "react";
import { AppBar, Button, Toolbar, Box, BottomNavigation } from "@material-ui/core";
import MenuIcon from '@mui/icons-material/Menu';
import { useStyles } from "./layoutStyle";
import  Routers from './components/routers/RouteHandler';

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
     
      <Box>
        <Routers/>
      </Box>
      <BottomNavigation  showLabels className={style.bottomNav}>
        <Box className={style.test}>Here will be my post, git Repo and other contacts...</Box>
        <Box className={style.test}>Here will be my post, git Repo and other contacts...</Box>
      </BottomNavigation>
    </Box>
  )
}

export default App;