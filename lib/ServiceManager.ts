import { Logger } from './LoggerManager';
import { IServiceMetadata } from './decorators/Service';

export class ServiceManager {

    public static createServices(app, serverConstructor) {
        const servicesConstructors = Reflect.getMetadata('services', serverConstructor);

        return new Promise((resolve) => {
            new ServiceManager(servicesConstructors);
            Logger.info('Finished creating services');
            resolve();
        });
    }

    private constructor(servicesConstructors: Array<() => void>) {
        Logger.info('Creating services...');
        const createdServices = {};

        for (const construct of servicesConstructors) {
            const metadata: IServiceMetadata = Reflect.getMetadata('services', construct);

            // build graph to create services in correct order

            const params = [];
            for (const param of metadata.params) {
                params.push(createdServices[param]);
            }
        }
    }
}
