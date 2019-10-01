export function Global(config: IGlobalObject) {
    return (constructor) => {
        Reflect.defineMetadata('routes', config.endpoints, constructor);
        Reflect.defineMetadata('services', config.services, constructor);
        Reflect.defineMetadata('entities', config.entities, constructor);
        Reflect.defineMetadata('scenes', config.scenes, constructor);
    };
}

export function Route(path: string) {
    return (constructor) => {
        const paramtypes = Reflect.getMetadata('design:paramtypes', constructor) || [];

        const params = paramtypes.map(({ name }) => name);

        Reflect.defineMetadata('params', params, constructor);

        constructor.path = path;
    };
}

export function Service() {
    return (constructor) => {
        const paramtypes = Reflect.getMetadata('design:paramtypes', constructor) || [];

        const params = paramtypes.map(({ name }) => name);

        const metadata: IServiceMetadata = {
            constructor,
            params
        };

        Reflect.defineMetadata('services', metadata, constructor);
    };
}

export function Scene(name: string) {
    return (constructor) => {
        // constructor.name = name;
    };
}

export interface IGlobalObject {
    services: any[];
    endpoints: any[];
    entities: any[];
    scenes: any[];
}

export interface IServiceMetadata {
    params: string[];

    constructor: (...args) => void;
}
