import { Logger } from './LoggerManager';
import { HTTP_METHODS } from './types/HTTP_METHODS';
import { TelegramModule } from './TelegramModule';

export default class RouteManager {

    public static bindRoutes(app, serverConstructor, services, telegramModule) {
        const routes = Reflect.getMetadata('routes', serverConstructor);

        app.post('/wh/telegram', telegramModule.processTelegramMessage.bind(telegramModule));

        return new Promise((resolve) => {
            new RouteManager(app, routes, services);
            Logger.info('Finished registering routes');
            resolve();
        });
    }

    private constructor(app, controllers: Array<(...args) => void>, services) {
        Logger.info(`Registering routes...`);
        const methods = Object.values(HTTP_METHODS)
            .filter(isNaN);
        controllers.forEach((instance) => {
            const paramsData = Reflect.getMetadata('params', instance);
            const params = [];
            for (const param of paramsData) {
                params.push(services[param]);
            }
            const obj = new instance(...params);
            for (const httpMethod of methods) {
                const handlers = Reflect.getMetadata(HTTP_METHODS[httpMethod], instance);
                if (handlers && handlers.length) {
                    for (const handlerObject of handlers) {
                        const path = instance['path'] + handlerObject.path;
                        this.linkMethod(httpMethod, app, path, handlerObject.handler.value.bind(obj));
                        Logger.info(`Handler to ${ httpMethod } ${ path } registered`);
                    }
                }
            }
        });
    }

    private linkMethod(httpMethod: string | HTTP_METHODS, app, path, handler) {
        if (HTTP_METHODS[httpMethod] === HTTP_METHODS.GET) {
            app.get(path, handler);
        } else if (HTTP_METHODS[httpMethod] === HTTP_METHODS.POST) {
            app.post(path, handler);
        } else if (HTTP_METHODS[httpMethod] === HTTP_METHODS.PUT) {
            app.put(path, handler);
        } else if (HTTP_METHODS[httpMethod] === HTTP_METHODS.DELETE) {
            app.delete(path, handler);
        }
    }
}
