import * as express from 'express';
import { Logger } from './LoggerManager';
import * as core from 'express-serve-static-core';
import 'reflect-metadata';
import RouteManager from './RouteManager';
import { ServiceManager } from './ServiceManager';

class HttpServer {
    public static app: core.Express;

    public constructor(port: number, host: string) {
        HttpServer.app = express();
        HttpServer.app.listen(port, host, async () => {
            Logger.info(`Server started on [host = ${ host }] [port = ${ port }]`);
            const services = await ServiceManager.createServices(HttpServer.app, this.constructor);
            await RouteManager.bindRoutes(HttpServer.app, this.constructor, services);
        });
    }
}

export {
    HttpServer
};
