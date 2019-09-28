import { Logger } from './LoggerManager';
import { HTTP_METHODS } from './types/HTTP_METHODS';

export default class RouteManager {

    public static bindRoutes(app, serverConstructor) {
        const routes = Reflect.getMetadata('routes', serverConstructor);
        return new Promise((resolve) => {
            new RouteManager(app, routes);
            Logger.info('Finished binding routes');
            resolve();
        });
    }

    private constructor(app, controllers: Array<() => void>) {
        Logger.info(`Binding routes...`);
        const methods = Object.values(HTTP_METHODS)
            .filter(isNaN);
        controllers.forEach((instance) => {
            for (const httpMethod of methods) {
                const handlers = Reflect.getMetadata(HTTP_METHODS[httpMethod], instance);
                if (handlers && handlers.length) {
                    for (const handler of handlers) {
                        const path = instance['path'] + handler.path;
                        this.linkMethod(httpMethod, app, path, handler.handler.value);
                        Logger.info(`Link ${ httpMethod } to ${ path }`);
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
