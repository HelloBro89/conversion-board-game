// import { getRepository } from 'typeorm';
// import { Task } from '../entities/tasks';

// const getAllTasks = async () => {
//     const tasksRepo =  getRepository(Task);
//     return tasksRepo.find({ where: {} });
//   };

// const deleteTask = async (textDataForSearch: string) => {
// 
//   const tasksRepo = getRepository(Task);
//   const deletedTask = await tasksRepo.delete({ dateOfCreation: textDataForSearch });
//   return deletedTask;
// }
// 
// const updateTask = async (data: {
//     taskName: string;
//     checkBoxStatus: boolean;
//     dateOfCreation: string;
//   }, textDataForSearch: string) => {
//     const tasksRepo = getRepository(Task);
//     await tasksRepo.update({ taskName: textDataForSearch }, data);
//     return data;
//   }
// 
// const createTask = async (data: {
//   taskName: string;
//   checkBoxStatus: boolean;
//   dateOfCreation: string;
// }) => {
//   const tasksRepo = getRepository(Task);
//   const newUser = tasksRepo.create(data);
//   const addedUser = await tasksRepo.save(newUser);
//   return addedUser;
// 
// }
// 
// const deleteAllTasks = async () => {
//   const tasksRepo = getRepository(Task);
//   const res = await tasksRepo.delete({});
//   return res.raw;
// }

// export { getAllTasks, createTask, updateTask, deleteTask, deleteAllTasks };