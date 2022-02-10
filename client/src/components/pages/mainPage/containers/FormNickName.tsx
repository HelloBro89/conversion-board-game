import React, { ChangeEvent, MouseEvent, useRef } from 'react';
import { TextField, Box } from '@material-ui/core';
import { Navigate, NavLink, useNavigate } from 'react-router-dom';
import { useStyles } from '../styleMainPage';
import { useDispatch, useSelector } from 'react-redux';
import { setNickName, setTemporaryNickName } from '../../../redux/actions/appDataAction';
import { RootState } from '../../../redux';
import { textFieldFilter, eventCode } from '../../../helpers/textFieldFilter';

const FormNickName = () => {
    // const enterRef = useRef<HTMLAnchorElement>(null);
    const enterRef = useRef<HTMLButtonElement>(null);
    const classes = useStyles();
    const navigate = useNavigate();
    const { nickName, temporaryNickName } = useSelector((state: RootState) => state.appData);
    const dispatch = useDispatch();

    const getNickName = async (e: MouseEvent) => {
        if (temporaryNickName.trim() === '') {
            e.preventDefault();
            alert('Enter your nick-name!');
            return;
        }
        const checkExistingNickName = await dispatch(setNickName(temporaryNickName));
        console.log('TEST');
        console.log(checkExistingNickName);
        console.log(typeof checkExistingNickName);

        if (checkExistingNickName as unknown) {
            // if ((test as unknown) === 'true') {
            alert(`Nick name already exist!!!`);
            return;
        }
        navigate(`/lobby/${temporaryNickName}`);
        // "proxy": "http://localhost:4000/",
    };

    const handlerTextField = async (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const filteredValue = textFieldFilter(e);
        console.log(filteredValue);
        dispatch(setTemporaryNickName(filteredValue));
    };

    return (
        <Box className={classes.boxNickName}>
            <TextField
                onKeyDown={(e) => eventCode(e, enterRef)}
                onChange={(e) => handlerTextField(e)}
                className={classes.textField}
                label="Enter your nick-name"
                variant="filled"
                autoComplete="off"
                value={temporaryNickName}
            />

            <button
                ref={enterRef}
                id="send"
                onClick={(e) => getNickName(e)}
                className={classes.navStyle}
            >
                Enter
            </button>
        </Box>
    );
};

export default FormNickName;

// import React, { ChangeEvent, MouseEvent, useRef } from 'react';
// import { TextField, Box } from '@material-ui/core';
// import { Navigate, NavLink, useNavigate } from 'react-router-dom';
// import { useStyles } from '../styleMainPage';
// import { useDispatch, useSelector } from 'react-redux';
// import { setNickName } from '../../../redux/actions/appDataAction';
// import { RootState } from '../../../redux';
// import { textFieldFilter, eventCode } from '../../../helpers/textFieldFilter';
// import { checkUniqueNickName } from '../../../requests/requests';

// const FormNickName = () => {
//     // const enterRef = useRef<HTMLAnchorElement>(null);
//     const enterRef = useRef<HTMLButtonElement>(null);
//     const classes = useStyles();
//     const navigate = useNavigate();
//     const { nickName } = useSelector((state: RootState) => state.appData);
//     const dispatch = useDispatch();

//     const getNickName = async (e: MouseEvent) => {
//         if (nickName.trim() === '') {
//             e.preventDefault();
//             alert('Enter your nick-name!');
//             return;
//         }
//         const nickNameInd = await checkUniqueNickName(nickName);
//         console.log(typeof nickNameInd);
//         console.log(nickNameInd);

//         if (nickNameInd !== -1) {
//             alert(`Nick name already exist!!!`);
//             return;
//         }
//         navigate(`/lobby/${nickName}`);
//         // "proxy": "http://localhost:4000/",
//     };

//     const handlerTextField = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//         const filteredValue = textFieldFilter(e);

//         dispatch(setNickName(filteredValue));
//     };

//     return (
//         <Box className={classes.boxNickName}>
//             <TextField
//                 onKeyDown={(e) => eventCode(e, enterRef)}
//                 onChange={(e) => handlerTextField(e)}
//                 className={classes.textField}
//                 label="Enter your nick-name"
//                 variant="filled"
//                 autoComplete="off"
//                 value={nickName}
//             />

//             <button
//                 ref={enterRef}
//                 id="send"
//                 onClick={(e) => getNickName(e)}
//                 className={classes.navStyle}
//             >
//                 Enter
//             </button>
//         </Box>
//     );
// };

// export default FormNickName;
