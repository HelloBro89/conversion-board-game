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
}
// const countOfUsers: string[] = [];
let hosts: IHostData[] = [{ numOfPlayers: '2', gameTime: 'average', hostName: 'TEST' }];

io.on('connection', async (socket) => {
    // io.sockets.emit('hostsData', hosts);
    console.log(`The user is connected to the public room --- USER ID --- ${socket.id}} ---`);
    console.log(socket);
    socket.emit('hostsData', hosts);

    socket.on('joinToRoom', async (roomName) => {
        // console.log(`User connected to room ${mess} --- USER ID ${socket.id}}`);

        await socket.join(`${roomName}`);
        console.log(socket.rooms.size);
        // console.log(`Joined to: room ${mess} `);
        // io.to(`${mess}`).emit('connectToRoom', `User has joined to room --- ${mess} --- USER ID --- ${socket.id} ---`);

        socket.to(`${roomName}`).emit('connectToRoom', `User has joined to room --- ${roomName} --- USER ID --- ${socket.id} ---`);

        // io.sockets.to(`room ${mess}`).emit('connectToRoom', `USER LEFT - ${mess}`);
    });

    socket.on('leaveTheRoom', async (roomName) => {
        await socket.leave(`${roomName}`);
        console.log(`Leave from: ${roomName} USER ID ${socket.id}`);
        // io.to(`room ${mess}`).emit('connectToRoom', `USER LEFT - ${mess}`);
        // io.sockets.to(`room ${mess}`).emit('connectToRoom', `USER LEFT - ${mess}`);
        socket.to(`${roomName}`).emit('connectToRoom', `User has left from room --- ${roomName} --- USER ID --- ${socket.id} ---`);
    });

    socket.on('newHost', async (newHost) => {
        hosts.push(newHost);
        io.sockets.emit('addNewHost', newHost);
        console.log(`Joined to: room ${newHost.hostName} --- USER ID ${socket.id} `);
        socket.join(`${newHost.hostName}`);
    });

    // socket.on('disconnecting', () => {
    //     console.log(`************disconnecting ${JSON.stringify(socket.rooms)}`); // the Set contains at least the socket ID
    // });

    socket.on('disconnect', () => {
        // countOfUsers.pop();
        // console.log(countOfUsers.length);
        console.log(`A user disconnected ${socket.id}`);
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
