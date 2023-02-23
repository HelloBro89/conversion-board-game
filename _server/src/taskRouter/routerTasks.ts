import { Request, Response, Router } from 'express';
// import { getAllTasks, createTask, updateTask, deleteTask, deleteAllTasks } from './taskRepository';

const routerTasks = Router();

routerTasks.route('/').get( async (_req: Request, res: Response) => {
    res.status(200).json('all right');
});

// routerTasks.route('/getAll').get( async (_req: Request, res: Response) => {
//     const tasks = await getAllTasks(); 
//     res.status(200).json(tasks); 
// });
// 
// routerTasks.route('/:updateTask').put(async (req: Request, res: Response) => {
//     const { body } = req;
//     const textDataForSearch = req.params["updateTask"];
//     
//     if (!textDataForSearch) return res.status(404).json({message : "Search data not specified..."});
// 
//     const updatedTask = await updateTask(body, textDataForSearch);
//     return res.status(201).json({ message: `Task ${updatedTask.taskName} has been updated...` });
// });
// 
// routerTasks.route('/deleteAllTasks').delete( async (_req: Request, res: Response) => {
//     await deleteAllTasks();
//     res.status(200).json({ message: "All tasks have been deleted..." });
// });
// 
// routerTasks.route('/:deleteOneTask').delete( async (req, res) => {
//     const textDataForSearch = req.params["deleteOneTask"];
//     const deletedTask = await deleteTask(textDataForSearch);
// 
//     if (deletedTask) res.status(200).json({ message: "Task has been deleted..." });
// });
// 
// routerTasks.route('/createTask').post( async (req, res) => {
//     const { body } = req;
//     const createdTask = await createTask(body);
//     res.status(201).json({ message: createdTask });
// });

export { routerTasks }
