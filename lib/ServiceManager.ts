import { Logger } from './LoggerManager';

export class ServiceManager {

    public static createServices(app, serverConstructor) {
        const servicesConstructors = Reflect.getMetadata('services', serverConstructor);

        return new Promise((resolve) => {
            const services = new ServiceManager(servicesConstructors);
            Logger.info('Finished registering services');
            resolve(services);
        });
    }

    private constructor(servicesConstructors: Array<(...args) => void>) {
        Logger.info('Registering services...');
        const createdServices = [];
        const createdServicesNames = [];
        for (let i = 0; i < servicesConstructors.length; i++) {
            if (createdServices[i]) {
                // Skip service if it's already created
                continue;
            }
            // Get services names that should be passed to constructor
            const needParams = Reflect.getMetadata('services', servicesConstructors[i]).params;

            // Flag, that shows if all the needed services were created and current service is ready to be created
            let allParamsAreCreated = true;

            // indexes of needed services
            const paramIndexes = [];

            for (const neededParam of needParams) {
                const paramIndex = createdServicesNames.indexOf(neededParam);
                if (paramIndex === -1) {
                    allParamsAreCreated = false;
                } else {
                    paramIndexes.push(paramIndex);
                }
            }

            if (allParamsAreCreated) {
                const paramServices = [];
                for (const paramIndex of paramIndexes) {
                    paramServices.push(createdServices[paramIndex]);
                }
                createdServices[i] = new servicesConstructors[i](...paramServices);
                createdServicesNames[i] = servicesConstructors[i].name;
                Logger.info(`Service [${ createdServicesNames[i] }] created`);
            }

            if (createdServices.length === servicesConstructors.length) {
                break;
            }

            if (servicesConstructors.length - i === 1) {
                i = -1;
            }
        }

        const services = {};
        for (let i = 0; i < createdServices.length; i++) {
            services[createdServicesNames[i]] = createdServices[i];
        }

        return services;
    }
}
