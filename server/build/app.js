"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.http = void 0;
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const config_1 = require("./common/config");
const app = (0, express_1.default)();
const http = (0, http_1.createServer)(app);
exports.http = http;
const io = new socket_io_1.Server(http, { cors: { origin: '*' }, pingTimeout: 5000 });
const { NODE_ENV } = config_1.config;
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cors_1.default)());
// console.log(`***** ${NODE_ENV} LENGTH ${NODE_ENV?.length}`);
if (NODE_ENV === 'production') {
    const pathToIndexHTML = path_1.default.join(__dirname, /* './' */ '../../client/build');
    app.use(express_1.default.static(pathToIndexHTML));
    app.get('/', (_req, res) => {
        res.status(200);
    });
}
// const countOfUsers: string[] = [];
let hosts = [{ numOfPlayers: '2', gameTime: 'average', hostName: 'FIRST', hostID: 'sajn3n234j2n', players: ['Pasha'] }];
io.on('connection', async (socket) => {
    // console.log(hosts);
    console.log(`The user is connected to the public room --- User ID --- ${socket.id} ---`);
    socket.emit('hostsData', hosts);
    socket.on('joinToRoom', async (data) => {
        // console.log(`User connected to room ${mess} --- USER ID ${socket.id}}`);
        // hosts.map((item) => {
        //     if (item.hostName === data.roomName) {
        //         item.players.push(data.nickName);
        //     }
        // });
        try {
            console.log(`!!!!!Connection to room data:`);
            console.log(data);
            const foundIndex = hosts.findIndex((item) => item.hostName === data.roomName);
            const neededHostObj = hosts[foundIndex];
            neededHostObj.players.push(data.nickName);
            const neededHostPlayers = neededHostObj.players;
            await socket.join(`${data.roomName}`);
            console.log(`Join to room ${data.roomName}`);
            console.log(`Current nickName in redux server side ${data.nickName}`);
            // socket.to(`${data.roomName}`).emit('connectToRoom', {
            //     message: `User has joined to room - ${data.roomName} --- User ID - ${socket.id} --- User name - ${data.nickName}`,
            //     playerNames: neededHostPlayers,
            // });
            io.to(`${data.roomName}`).emit('connectToRoom', {
                message: `User has joined to room - ${data.roomName} --- User ID - ${socket.id} --- User name - ${data.nickName}`,
                playerNames: neededHostPlayers,
            });
        }
        catch (err) {
            console.log('*************JOIN ROOM');
            console.log(err);
        }
        // socket.to(`${data.roomName}`).emit('connectToRoom', {
        //     message: `User has joined to room - ${data.roomName} --- User ID - ${socket.id} --- User name - ${data.nickName}`,
        //     playerNames: neededHostPlayers,
        // });
        // socket.to(`${data.roomName}`).emit('connectToRoom', {
        //     message: `User has joined to room - ${data.roomName} --- User ID - ${socket.id} --- User name - ${data.nickName}`,
        //     playerName: data.nickName,
        // });
        // io.sockets.to(`room ${mess}`).emit('connectToRoom', `USER LEFT - ${mess}`);
    });
    socket.on('newHost', async (newHost) => {
        try {
            console.log(`CREATE A ROOM `);
            // console.log(hosts);
            // console.log(`New host ${JSON.stringify(newHost)}`);
            hosts.push(newHost);
            console.log(`Add new host `);
            console.log(newHost);
            io.sockets.emit('addNewHost', newHost);
            console.log(`Joined to: room ${newHost.hostName} --- USER ID ${socket.id} `);
            socket.join(`${newHost.hostName}`);
        }
        catch (e) {
            console.log('*************NEW HOST');
            console.log(e);
        }
    });
    socket.on('leaveTheRoom', async (roomName) => {
        const hostIndex = hosts.findIndex((item) => item.hostID === socket.id);
        await socket.leave(`${roomName}`);
        if (hostIndex > -1) {
            const courrentRoom = hosts[hostIndex];
            socket.to(`${courrentRoom.hostName}`).emit('leavingTheRoom', {
                message: `User has left from room --- ${courrentRoom.hostName} --- USER ID --- ${socket.id} ---`,
                masterHost: false,
            });
            hosts.splice(hostIndex, 1);
        }
        else {
            socket.to(`${roomName}`).emit('leavingTheRoom', {
                message: `User has left from room --- ${roomName} --- USER ID --- ${socket.id} ---`,
                masterHost: true,
            });
        }
        console.log(`Leave from: ${roomName} USER ID ${socket.id}`);
        // io.to(`room ${mess}`).emit('connectToRoom', `USER LEFT - ${mess}`);
        // io.sockets.to(`room ${mess}`).emit('connectToRoom', `USER LEFT - ${mess}`);
    });
    // socket.on('disconnecting', () => {
    //     console.log(`************disconnecting ${JSON.stringify(socket.rooms)}`); // the Set contains at least the socket ID
    // });
    socket.on('disconnecting', async () => {
        console.log('DISCONNECTING');
        // console.log(`socket size ${socket.rooms.size}`);
        // console.log(`Socket's room:`);
        const socketRoom = [...socket.rooms.values()][1];
        const hostIndex = hosts.findIndex((item) => item.hostID === socket.id);
        if (socketRoom) {
            await socket.leave(socketRoom);
            if (hostIndex > -1) {
                const courrentRoom = hosts[hostIndex];
                socket.to(`${courrentRoom.hostName}`).emit('leavingTheRoom', {
                    message: `User has left from room --- ${courrentRoom.hostName} --- USER ID --- ${socket.id} ---`,
                    masterHost: false,
                });
                hosts.splice(hostIndex, 1);
            }
            else {
                socket.to(`${socketRoom}`).emit('leavingTheRoom', {
                    message: `User has left from room --- ${socketRoom} --- USER ID --- ${socket.id} ---`,
                    masterHost: true,
                });
            }
        }
    });
    socket.on('disconnect', async () => {
        console.log(`DISCONNECT`);
        console.log(`A user disconnected ${socket.id}`);
    });
});
// ************************************ OLD VERSION ************************************
// import Express from 'express';
// import { routerTasks } from './taskRouter/routerTasks';
// import cors from 'cors';
// // import path from 'path';
// // import { config } from './common/config';
// // const { NODE_ENV } = config;
// const app = Express();
// app.use(Express.json());
// app.use(Express.urlencoded({ extended: false }));
// app.use(cors());
// // if (NODE_ENV === 'production') {
// //     const pathToIndexHTML = path.join(
// //      __dirname,
// //       '../../client/build',
// //     );
// //     app.use(Express.static(pathToIndexHTML));
// //
// //     app.get('/', (_req, res) => {
// //       res.status(200);
// //     });
// //
// //   }
// app.use('/', routerTasks);
// export { app };
