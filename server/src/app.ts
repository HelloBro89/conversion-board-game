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

const countOfUsers: string[] = [];
const dataHosts = [{ numOfPlayers: '2', gameTime: 'average', hostName: 'FROM HOST' }];

io.on('connection', (socket) => {
    console.log(`User connected***  --- ${socket.id}}`);
    countOfUsers.push(socket.id);
    // console.log(countOfUsers.length);
    socket.emit('hostsData', dataHosts);
    // socket.on('test', (arg: string) => {
    //     console.log(arg);
    // });
    socket.on('disconnect', () => {
        countOfUsers.pop();
        console.log(countOfUsers.length);
        console.log('A user disconnected');
        // io.sockets.emit('user disconnedted');
    });

    // console.log('A user disconnected');
    // countOfUsers.pop();
    // console.log(countOfUsers.length);
    // io.sockets.emit('checkWhoStayed');
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
