import { Logger } from './LoggerManager';
import { IServiceMetadata } from './decorators/Service';

export class ServiceManager {
    public static createServices(app, appConstructor) {
        const servicesConstructors = Reflect.getMetadata('services', appConstructor);

        // let serviceData = Reflect.getMetadata('services', servicesConstructors[0]);
        // console.log(serviceData);

        return new Promise((resolve) => {
            new ServiceManager(servicesConstructors);
            Logger.info('Finished creating services');
            resolve();
        });
    }

    private constructor(servicesConstructors: Array<() => void>) {
        const createdServices = {};


        for (const construct of servicesConstructors) {
            const metadata: IServiceMetadata = Reflect.getMetadata('services', construct);
            // console.log(metadata);

            // build graph to create in correct order
            const params = [];
            for (const param of metadata.params) {
                params.push(createdServices[param]);
            }
        }
    }
}

