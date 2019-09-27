import { Logger } from './LoggerManager';

export class ServiceManager {
    public static createServices(app, appConstructor) {
        const services = Reflect.getMetadata('services', appConstructor);
        // console.log(`Came ${services.length} services`);
        return new Promise((resolve) => {
            new ServiceManager(services);
            Logger.info('Finished creating services');
            resolve();
        });
    }

    private constructor(services: Array<() => void>) {
        Logger.info('Creating services');
        for (const serviceConstructor of services) {
            
        }
    }
}
