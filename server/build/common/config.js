"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({
    path: path_1.default.join(__dirname, '../../.env'),
});
exports.config = {
    NODE_ENV: process.env['NODE_ENV'],
    PORT: process.env['PORT'],
    // POSTGRES_USER: process.env['POSTGRES_USER'],
    // POSTGRES_PASSWORD: process.env['POSTGRES_PASSWORD'],
    // POSTGRES_DB: process.env['POSTGRES_DB'],
    // POSTGRES_PORT: process.env['POSTGRES_PORT'],
    // POSTGRES_HOST: process.env['POSTGRES_HOST'],
};
