import Express from 'express';
import { routerTasks } from './taskRouter/routerTasks';
import cors from 'cors';
// import path from 'path';
// import { config } from './common/config';

// const { NODE_ENV } = config;
const app = Express();

app.use(Express.json());
app.use(Express.urlencoded({ extended: false }));
app.use(cors());

// if (NODE_ENV === 'production') {
//     const pathToIndexHTML = path.join(
//      __dirname,
//       '../../client/build',
//     );
//     app.use(Express.static(pathToIndexHTML));
//   
//     app.get('/', (_req, res) => {
//       res.status(200);
//     });
// 
//   }

app.use('/', routerTasks);

export { app };


