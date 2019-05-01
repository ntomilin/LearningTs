import { HttpServer } from '../lib/HttpServer';
import { UserController } from './controllers/UserController';

export class Application extends HttpServer {

    private readonly Endpoints = [
        UserController
    ];

    constructor(port: number, host: string = '127.0.0.1') {
        super(port, host);
    }


}
