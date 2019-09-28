export function Route(path: string) {
    return (constructor) => {
        const paramtypes = Reflect.getMetadata('design:paramtypes', constructor) || [];

        const params = paramtypes.map(({ name }) => name);

        Reflect.defineMetadata('params', params, constructor);

        constructor.path = path;
    };
}
