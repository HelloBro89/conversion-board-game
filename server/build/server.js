"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const config_1 = require("./common/config");
const { PORT } = config_1.config;
// import { connectionDB } from './connection/connectionDB';
(async () => {
    // await connectionDB();
    app_1.http.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
})();
// ************************************ OLD VERSION ***********************************
// import { app } from './app';
// // import { config } from './common/config'
// // import { connectionDB } from './connection/connectionDB';
// const PORT = 4000;
// (async () => {
//     // await connectionDB();
//     app.listen(PORT, () => {
//         console.log(`Server is running on http://localhost:${PORT}`);
//     });
// })();
