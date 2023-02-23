import axios from '../services/api';

const getAllTasks = async () => {
  //  const res = await axios.get('/getAll');
  //  return res.data;
};

const createTask = async (task: string, status: boolean,/*  path: string, */ date: string) => {
      await axios({
          // method: 'post',
          // url: '/createTask',
          // data: {
          //   taskName: task,
          //   checkBoxStatus: status,
          //   dateOfCreation: date
          // }
        });
};

const updatedTask = async (searchText: string , status: boolean, /* path: string, */ date: string) => {
    await axios({
        // method: 'put',
        // url: `/${searchText}`,
        // data: {
        // //   taskName: task,
        //   checkBoxStatus: status,
        //   // pathToStyles: path,
        //   dateOfCreation: date
        // }
      });
}

const deleteOneTask = async (searchText: string) => {
    await axios ({
        // method: `delete`,
        // url: `/${searchText}`,
        // data: {},
    });
};

const deleteAllTasks = async () => {
    await axios ({
        // method: 'delete',
        // url: '/deleteAllTasks',
        // data: {},
    });
};

export { createTask, deleteAllTasks, deleteOneTask, getAllTasks, updatedTask };
