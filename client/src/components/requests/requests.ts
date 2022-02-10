import axios from '../services/api';

const checkUniqueNickName = async (nickName: string) => {
    const res = await axios.get(`/chekcNickName/${nickName}`);
    // console.log(typeof res.data.existence);
    // return res.data.existence;
    return JSON.parse(res.data.existence);
};

// const getAllTasks = async () => {
//     //  const res = await axios.get('/getAll');
//     //  return res.data;
// };

// const createTask = async (task: string, status: boolean, /*  path: string, */ date: string) => {
//     await axios({
//         // method: 'post',
//         // url: '/createTask',
//         // data: {
//         //   taskName: task,
//         //   checkBoxStatus: status,
//         //   dateOfCreation: date
//         // }
//     });
// };

// const updatedTask = async (
//     searchText: string,
//     status: boolean,
//     /* path: string, */ date: string
// ) => {
//     await axios({
//         // method: 'put',
//         // url: `/${searchText}`,
//         // data: {
//         //   taskName: task,
//         //   checkBoxStatus: status,
//         // pathToStyles: path,
//         //   dateOfCreation: date
//         // }
//     });
// };

// const deleteOneTask = async (searchText: string) => {
//     await axios({
//         // method: `delete`,
//         // url: `/${searchText}`,
//         // data: {},
//     });
// };

// const deleteAllTasks = async () => {
//     await axios({
//         // method: 'delete',
//         // url: '/deleteAllTasks',
//         // data: {},
//     });
// };

export { checkUniqueNickName };
