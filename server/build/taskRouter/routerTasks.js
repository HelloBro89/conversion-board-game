"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routerTasks = void 0;
const express_1 = require("express");
// import { getAllTasks, createTask, updateTask, deleteTask, deleteAllTasks } from './taskRepository';
const routerTasks = (0, express_1.Router)();
exports.routerTasks = routerTasks;
routerTasks.route('/').get(async (_req, res) => {
    res.status(200).json('all right');
});
