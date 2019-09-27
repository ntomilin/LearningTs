export function Global(config: IGlobalObject) {
    return (constructor) => {
        Reflect.defineMetadata('routes', config.endpoints, constructor);
        Reflect.defineMetadata('services', config.services, constructor);
        Reflect.defineMetadata('entities', config.entities, constructor);
    };
}

interface IGlobalObject {
    services: any[];
    endpoints: any[];
    entities: any[];
}
