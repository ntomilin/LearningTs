import { logger } from '../src/logger';
import { HTTP_METHODS } from './types/HTTP_METHODS';

export default class RouteManager {

    private constructor(app, controllers: Array<Function>) {
        logger.info(`Binding routes...`);
        let methods = Object.keys(HTTP_METHODS).filter(isNaN);
        controllers.forEach(instance => {
            for (const httpMethod of methods) {
                let handlers = Reflect.getMetadata(HTTP_METHODS[httpMethod], instance);
                if (handlers && handlers.length) {
                    for (const handler of handlers) {
                        let path = instance['path'] + handler.path;
                        linkMethod(httpMethod, app, path, handler.handler.value);
                        logger.info(`Link ${httpMethod} to ${path}`)
                    }
                }
            }
        });
    }

    public static bindRoutes(app, controllers: Array<Function>) {
        return new Promise((resolve) => {
            new RouteManager(app, controllers);
            logger.info(`Finished binding routes`);
            resolve();
        });
    }
}

function linkMethod(httpMethod: string, app, path, handler) {
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
