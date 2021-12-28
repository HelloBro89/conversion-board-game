import React, { FC /* , ChangeEvent, useState, useEffect */ } from 'react';
import { AppBar, Button, Toolbar, Box } from '@material-ui/core';
import { useStyles } from './layoutStyle';
import RouteHandler from './components/routers/RouteHandler';
import { MenuListComposition } from './layoutElements/menuList';

// import { ITaskList } from './Interfaces';} from './requests/requests';

const App: FC = () => {
    const style = useStyles();
    return (
        <Box>
            <AppBar className={style.appBar}>
                <Toolbar>
                    <Button className={style.homePageBut} color="inherit" onClick={() => alert('Back to home page...')}>
                        Home Page
                    </Button>
                    <Box className={style.menuList}>
                        <MenuListComposition />
                    </Box>
                    <Box className={style.boxHelp}>HELP</Box>
                </Toolbar>
            </AppBar>

            <Box>
                <RouteHandler />
            </Box>

            <Box className={style.bottomNav}>
                <Box className={style.bottomNavText}>Here will be my post, git Repo and other contacts...</Box>
                <Box className={style.bottomNavText}>Here will be my post, git Repo and other contacts...</Box>
            </Box>
        </Box>
    );
};

export default App;
