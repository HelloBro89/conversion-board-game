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
    hostID: string;
}
// const countOfUsers: string[] = [];
let hosts: IHostData[] = [{ numOfPlayers: '2', gameTime: 'average', hostName: 'FIRST', hostID: 'sajn3n234j2n' }];

io.on('connection', async (socket) => {
    // console.log(hosts);
    console.log(`The user is connected to the public room --- User ID --- ${socket.id} ---`);
    socket.emit('hostsData', hosts);

    socket.on('joinToRoom', async (roomName) => {
        // console.log(`User connected to room ${mess} --- USER ID ${socket.id}}`);

        await socket.join(`${roomName}`);
        console.log(`Join to room ${socket.rooms.size}`);
        // console.log(`Socket rooms:`);

        // console.log(socket.rooms.size);
        // console.log(`Socket ID ${socket.id}`);

        // console.log(`Joined to: room ${mess} `);
        // io.to(`${mess}`).emit('connectToRoom', `User has joined to room --- ${mess} --- USER ID --- ${socket.id} ---`);

        socket
            .to(`${roomName}`)
            .emit('connectToRoom', { message: `User has joined to room --- ${roomName} --- USER ID --- ${socket.id} ---` });

        // io.sockets.to(`room ${mess}`).emit('connectToRoom', `USER LEFT - ${mess}`);
    });

    socket.on('leaveTheRoom', async (roomName) => {
        const hostIndex = hosts.findIndex((item) => item.hostID === socket.id);
        await socket.leave(`${roomName}`);
        if (hostIndex > -1) {
            const courrentRoom = hosts[hostIndex];
            socket.to(`${courrentRoom!.hostName}`).emit('connectToRoom', {
                message: `User has left from room --- ${courrentRoom!.hostName} --- USER ID --- ${socket.id} ---`,
                masterHost: false,
            });

            hosts.splice(hostIndex, 1);
        } else {
            socket.to(`${roomName}`).emit('connectToRoom', {
                message: `User has left from room --- ${roomName} --- USER ID --- ${socket.id} ---`,
                masterHost: true,
            });
        }
        console.log(`Leave from: ${roomName} USER ID ${socket.id}`);
        // io.to(`room ${mess}`).emit('connectToRoom', `USER LEFT - ${mess}`);
        // io.sockets.to(`room ${mess}`).emit('connectToRoom', `USER LEFT - ${mess}`);
    });

    socket.on('newHost', async (newHost) => {
        console.log(`CREATE A ROOM `);
        // console.log(hosts);

        // console.log(`New host ${JSON.stringify(newHost)}`);
        hosts.push(newHost);
        // console.log(hosts);
        io.sockets.emit('addNewHost', newHost);
        console.log(`Joined to: room ${newHost.hostName} --- USER ID ${socket.id} `);
        socket.join(`${newHost.hostName}`);
        // socket.join(`${newHost.masterHost}`);
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
                socket.to(`${courrentRoom!.hostName}`).emit('connectToRoom', {
                    message: `User has left from room --- ${courrentRoom!.hostName} --- USER ID --- ${socket.id} ---`,
                    masterHost: false,
                });

                hosts.splice(hostIndex, 1);
            } else {
                socket.to(`${socketRoom}`).emit('connectToRoom', {
                    message: `User has left from room --- ${socketRoom} --- USER ID --- ${socket.id} ---`,
                    masterHost: true,
                });
            }
        }
    });

    socket.on('disconnect', async () => {
        console.log(`DISCONNECT`);
        console.log(`A user disconnected ${socket.id}`);

        // const hostIndex = hosts.findIndex((item) => item.hostID === socket.id);
        // console.log(hostIndex);

        // if (hostIndex > -1) {
        //     const courrentRoom = hosts[hostIndex];
        //     await socket.leave(`${courrentRoom!.hostID}`);
        //     socket
        //         .to(`${courrentRoom!.hostName}`)
        //         .emit('connectToRoom', `User has left from room --- ${courrentRoom!.hostName} --- USER ID --- ${socket.id} ---`);

        //     hosts.splice(hostIndex, 1);
        // }

        // console.log(`Abandoned user id --- ${socket.id}`);
        // console.log(`Hosts length ${hosts.length}`);
        // console.log(`All hosts ${JSON.stringify(hosts)}`);

        // io.sockets.emit('user disconnedted');
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
