import Express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import path from 'path';
import { config } from './common/config';

const app = Express();
const http = createServer(app);
const io = new Server(http, { cors: { origin: '*' }, pingTimeout: 5000 });
const { NODE_ENV } = config;

app.use(Express.json());
app.use(Express.urlencoded({ extended: false }));
app.use(cors());

// console.log(`***** ${NODE_ENV} LENGTH ${NODE_ENV?.length}`);

if (NODE_ENV === 'production') {
    const pathToIndexHTML = path.join(__dirname, /* './' */ '../../client/build');
    app.use(Express.static(pathToIndexHTML));

    app.get('/', (_req, res) => {
        res.status(200);
    });
}
interface IHostData {
    numOfPlayers: string;
    gameTime: string;
    hostName: string;
    hostID?: string;
    players: string[];
}

let hosts: IHostData[] = [
    /* { numOfPlayers: '2', gameTime: 'average', hostName: 'FIRST', hostID: 'sajn3n234j2n', players: [] } */
];

io.on('connection', async (socket) => {
    // console.log(hosts);
    console.log(`The user is connected to the public room --- User ID --- ${socket.id} ---`);

    // const socketQuery = Object.assign({}, socket.handshake.query);
    // console.log(socketQuery);

    socket.emit('hostsData', hosts);

    socket.on('joinToRoom', async (data) => {
        // console.log(`User connected to room ${mess} --- USER ID ${socket.id}}`);

        try {
            console.log(`*********** Join to room EVENT ***********`);
            // console.log(data);
            // console.log(`HOSTS: `);
            // console.log(hosts);

            const foundIndex = hosts.findIndex((item) => item.hostName === data.roomName);
            const neededHostObj = hosts[foundIndex]!;
            neededHostObj.players.push(data.nickName);
            // console.log(`JOIN JOIN JOIN `);
            // console.log(hosts);

            const neededHostPlayers = neededHostObj.players;

            await socket.join(`${data.roomName}`);
            // console.log(`Join to room ${data.roomName}`);
            // console.log(`Current nickName in redux server side ${data.nickName}`);

            // socket.to(`${data.roomName}`).emit('connectToRoom', {
            //     message: `User has joined to room - ${data.roomName} --- User ID - ${socket.id} --- User name - ${data.nickName}`,
            //     playerNames: neededHostPlayers,
            // });
            // console.log(`!!!!!!!!!!!`);
            // console.log(neededHostPlayers);

            io.to(`${data.roomName}`).emit('connectToRoom', {
                message: `User has joined to room - ${data.roomName} --- User ID - ${socket.id} --- User name - ${data.nickName}`,
                playerNames: neededHostPlayers,
            });
        } catch (err) {
            console.log('*************JOIN ROOM');
            console.log(err);
        }
    });

    socket.on('newHost', async (newHost: IHostData) => {
        try {
            console.log(`***********New host event **************`);
            if (!newHost.hostID) newHost = { ...newHost, hostID: socket.id };
            hosts.push(newHost);
            // console.log(hosts);

            io.sockets.emit('addNewHost', newHost);
            // socket.join(`${newHost.hostName}`);
        } catch (e) {
            console.log('*************NEW HOST');
            console.log(e);
        }
    });

    socket.on('leaveTheRoom', async (roomName) => {
        console.log(`*********** Leave the room EVENT ***********`);
        // console.log(`Current host -- ${JSON.stringify(hosts[0])}`);
        // console.log(`Room Name -- ${roomName}`);
        // console.log(`Socket ID -- ${socket.id}`);

        const hostIndex = hosts.findIndex((item) => item.hostID === socket.id);
        await socket.leave(`${roomName}`);
        if (hostIndex > -1) {
            const courrentRoom = hosts[hostIndex];
            console.log(`!!!!!!!!!!!!!!! ---- !!!!!!!!!!!!!!!`);
            io.sockets.emit('deleteHost', roomName);
            socket.to(`${courrentRoom!.hostName}`).emit('leavingTheRoom', {
                message: `User has left from room --- ${courrentRoom!.hostName} --- USER ID --- ${socket.id} ---`,
                masterHost: true,
            });
            hosts.splice(hostIndex, 1);
        } else {
            console.log(' !!!!!!!! LEAVE ROOM');
            const { nickName } = Object.assign({}, socket.handshake.query);
            console.log(`Nick NAME --- ${nickName}`);

            const roomIndex = hosts.findIndex((item) => item.hostName === roomName);
            const playerIndex = hosts[roomIndex]!.players.findIndex((item) => item === nickName);
            hosts[roomIndex]!.players.splice(playerIndex, 1);

            socket.to(`${roomName}`).emit('leavingTheRoom', {
                message: `User has left from room --- ${roomName} --- USER ID --- ${socket.id} ---`,
                masterHost: false,
                players: hosts[roomIndex]!.players,
            });
        }
        console.log(`Leave from: ${roomName} USER ID ${socket.id}`);
        // io.to(`room ${mess}`).emit('connectToRoom', `USER LEFT - ${mess}`);
        // io.sockets.to(`room ${mess}`).emit('connectToRoom', `USER LEFT - ${mess}`);
    });

    socket.on('disconnecting', async () => {
        try {
            console.log('**************** Disconnecting EVENT *************');

            // console.log(socketQuery['nickName']);
            // console.log(`socket size ${socket.rooms.size}`);
            // console.log(`Socket's room:`);
            const socketRoom = [...socket.rooms.values()][1];
            // console.log([...socket.rooms.values()]);
            // const hostIndex = hosts.findIndex((item) => item.hostID === socket.id);
            if (socketRoom) {
                await socket.leave(socketRoom);
                const hostIndex = hosts.findIndex((item) => item.hostID === socket.id);
                if (hostIndex > -1) {
                    const courrentRoom = hosts[hostIndex];
                    // console.log(`!!!!!!!!!!!!!!! HOST HAS LEFT !!!!!!!!!!!!!!!`);
                    io.sockets.emit('deleteHost', socketRoom);
                    socket.to(`${courrentRoom!.hostName}`).emit('leavingTheRoom', {
                        message: `User has left from room --- ${courrentRoom!.hostName} --- USER ID --- ${socket.id} ---`,
                        masterHost: true,
                    });
                    hosts.splice(hostIndex, 1);
                    console.log(hosts);
                } else {
                    const { nickName } = Object.assign({}, socket.handshake.query);
                    console.log(`Nick NAME --- ${nickName}`);

                    const roomIndex = hosts.findIndex((item) => item.hostName === socketRoom);
                    const playerIndex = hosts[roomIndex]!.players.findIndex((item) => item === nickName);
                    hosts[roomIndex]!.players.splice(playerIndex, 1);
                    // console.log(`-------------------------------`);
                    // console.log(hosts);

                    // console.log(`-------------------------------`);

                    socket.to(`${socketRoom}`).emit('leavingTheRoom', {
                        message: `User has left from room --- ${socketRoom} --- USER ID --- ${socket.id} ---`,
                        masterHost: false,
                        players: hosts[roomIndex]!.players,
                    });
                }
            }
        } catch (e) {
            console.log('*************DISCONNECTION EVENT ERROR *************');
            console.log(e);
        }
    });

    socket.on('disconnect', async () => {
        console.log(`**************** Disconnect EVENT ************`);
        console.log(`A user disconnect ${socket.id}`);
    });
});

export { http };

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
