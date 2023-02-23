"use strict";
// import { ConnectionOptions } from 'typeorm';
// import { config } from "./config";
// 
// const { NODE_ENV } = config; 
// let path = (NODE_ENV?.trim() === 'production') ? 'build' : 'src';
// 
// export = {
//     type: "postgres",
//     host: config.POSTGRES_HOST || 'postgres',
//     port: Number(config.POSTGRES_PORT) || '5432',
//     username: config.POSTGRES_USER || 'postgres',
//     password: config.POSTGRES_PASSWORD || 'postgres',
//     database: config.POSTGRES_DB || 'ToDo',
//     synchronize: true,
//     dropSchema: false,
//     entities: [`./${path}/entities/**/*{.js,.ts}`],
//     migrationsRun: false,
//     migrations: [
//         "src/migration/**/*.ts"
//     ],
//     cli: {
//         "migrationsDir": "src/migration"
//     }
// } as ConnectionOptions;
