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
    // { numOfPlayers: '2', gameTime: 'average', hostName: 'FROM HOST' },
    // { numOfPlayers: '2', gameTime: 'average', hostName: 'FROM HOST' },
];

io.on('connection', (socket) => {
    // console.log(hosts);
    console.log(`User connected***  --- ${socket.id}}`);
    // countOfUsers.push(socket.id);
    // console.log(countOfUsers.length);
    io.sockets.emit('hostsData', hosts);

    socket.on('newHost', (dataHost) => {
        hosts.push(dataHost);
        io.sockets.emit('hostsData', hosts);
        // socket.emit('newDataHost', hosts);
        console.log(hosts);
    });
    // socket.on('test', (arg: string) => {
    //     console.log(arg);
    // });
    socket.on('disconnect', () => {
        // countOfUsers.pop();
        // console.log(countOfUsers.length);
        console.log('A user disconnected');
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
