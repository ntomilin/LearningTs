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

export interface IServiceMetadata {
    params: string[];

    constructor: (...args) => void;
}
