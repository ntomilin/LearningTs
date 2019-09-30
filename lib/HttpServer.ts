import * as express from 'express';
import { Logger } from './LoggerManager';
import * as core from 'express-serve-static-core';
import 'reflect-metadata';
import RouteManager from './RouteManager';
import { ServiceManager } from './ServiceManager';
import DatabaseManager from './DatabaseManager';
import { IConfig } from './types/ConfigTypes';
import { TelegramModule } from './TelegramModule';
import * as bodyParser from 'body-parser';
import { SceneManager } from './SceneManager';
import { ViberModule } from './ViberModule';
import { MessageHandler } from './MessageHandler';
import { StateManager } from './StateManager';

class HttpServer {
    public static app: core.Express;

    public constructor(config: IConfig) {
        HttpServer.app = express();
        HttpServer.app.use(bodyParser.json());
        HttpServer.app.listen(config.PORT, '127.0.0.1', async () => {
            Logger.info(`Server started on [host = 127.0.0.1] [port = ${ config.PORT }]`);
            const services = await ServiceManager.createServices(HttpServer.app, this.constructor);
            await DatabaseManager.init(config.DB, this.constructor);

            const messageHandler: MessageHandler = new MessageHandler();
            const stateManager: StateManager = new StateManager();

            const telegramModule = new TelegramModule(config.BOTS.TELEGRAM, messageHandler, stateManager);

            await RouteManager.bindRoutes(HttpServer.app, this.constructor, services, telegramModule);

            await SceneManager.registerScenes(this.constructor);
        });

    }
}

export {
    HttpServer
};
