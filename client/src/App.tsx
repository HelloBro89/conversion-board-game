import React, { FC } from 'react';
import { AppBar, Toolbar, Box } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import { useStyles } from './layoutStyle';
import RouteHandler from './components/routers/RouteHandler';
import { MenuListComposition } from './layoutElements/menuList';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
// const socket = io('http://localhost:4000/');
// import { ITaskList } from './Interfaces';} from './requests/requests';

const App: FC = () => {
    const style = useStyles();

    return (
        <Box>
            <Box>
                <AppBar className={style.appBar}>
                    <Toolbar>
                        <NavLink className={style.goHomePageNav} to="/">
                            HOME PAGE
                        </NavLink>
                        <Box className={style.menuList}>
                            <MenuListComposition />
                        </Box>
                        <Box className={style.boxHelp}>HELP</Box>
                    </Toolbar>
                </AppBar>
            </Box>
            <Box>
                <RouteHandler />
            </Box>

            <Box className={style.bottomNav}>
                <Box className={style.bottomNavText}>
                    Here will be my post, git Repo and other contacts...
                </Box>
                <Box className={style.bottomNavText}>
                    Here will be my post, git Repo and other contacts...
                </Box>
            </Box>
        </Box>
    );
};

export default App;
