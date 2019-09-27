export function Route(path: string) {
    return (constructor) => {
        constructor.path = path;
    };
}
