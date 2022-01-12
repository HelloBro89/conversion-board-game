import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
    path: path.join(__dirname, '../../.env'),
});

export const config = {
    NODE_ENV: process.env['NODE_ENV'],
    PORT: process.env['PORT'],
    // POSTGRES_USER: process.env['POSTGRES_USER'],
    // POSTGRES_PASSWORD: process.env['POSTGRES_PASSWORD'],
    // POSTGRES_DB: process.env['POSTGRES_DB'],
    // POSTGRES_PORT: process.env['POSTGRES_PORT'],
    // POSTGRES_HOST: process.env['POSTGRES_HOST'],
};
