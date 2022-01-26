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
let hosts: IHostData[] = [
    // { numOfPlayers: '2', gameTime: 'average', hostName: 'FOR TEST' }
];

io.on('connection', async (socket) => {
    // console.log(hosts);
    // countOfUsers.push(socket.id);
    io.sockets.emit('hostsData', hosts);

    socket.on('joinToRoom', async (mess) => {
        // console.log(`User connected to room ${mess} --- USER ID ${socket.id}}`);

        await socket.join(`${mess}`);

        // console.log(`Joined to: room ${mess} `);
        io.to(`${mess}`).emit('connectToRoom', `message to all users in - ${mess}`);

        // io.sockets.to(`room ${mess}`).emit('connectToRoom', `USER LEFT - ${mess}`);
    });

    socket.on('leaveTheRoom', async (mess) => {
        await socket.leave(`${mess}`);
        console.log(`Leave from: ${mess} USER ID ${socket.id}`);
        // io.to(`room ${mess}`).emit('connectToRoom', `USER LEFT - ${mess}`);
        // io.sockets.to(`room ${mess}`).emit('connectToRoom', `USER LEFT - ${mess}`);
    });

    socket.on('newHost', async (dataHost) => {
        hosts.push(dataHost);
        io.sockets.emit('hostsData', hosts);
        console.log(`Joined to: room ${dataHost.hostName} --- USER ID ${socket.id} `);
        socket.join(`${dataHost.hostName}`);
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
