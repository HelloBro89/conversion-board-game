import React, { FC /* , ChangeEvent, useState, useEffect */ } from 'react';
import { AppBar, Button, Toolbar, Box } from '@material-ui/core';
import MenuIcon from '@mui/icons-material/Menu';
import { useStyles } from './layoutStyle';
import Routers from './components/routers/RouteHandler';
import IconButton from '@mui/material/IconButton';

// import { ITaskList } from './Interfaces';} from './requests/requests';

const App: FC = () => {
    const style = useStyles();
    return (
        <Box>
            <AppBar className={style.appBar} /* position="static" */>
                <Toolbar>
                    <Button color="inherit" onClick={() => alert('Back to home page...')}>
                        Home Page
                    </Button>
                    <Box className={style.boxHelp}>
                        <IconButton
                            color="inherit"
                            onClick={() => alert('Here will be About and Regulations and other')}
                        >
                            <MenuIcon />
                        </IconButton>
                        HELP
                    </Box>
                </Toolbar>
            </AppBar>

            <Box>
                <Routers />
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
