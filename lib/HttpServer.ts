import * as express from 'express';
import { logger } from '../src/logger';
import * as core from 'express-serve-static-core';
import 'reflect-metadata';
import RouteManager from './RouteManager';

class HttpServer {
    public static app: core.Express;

    public constructor(port: number, host: string) {
        HttpServer.app = express();
        HttpServer.app.listen(port, host, async () => {
            logger.info(`Server started on [host = ${ host }] [port = ${ port }]`);
            await RouteManager.bindRoutes(HttpServer.app, this.Endpoints || []);
        });
    }
}

export {
    HttpServer
};
