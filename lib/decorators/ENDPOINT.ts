export function ENDPOINT(path: string) {
    return function (constructor) {
        constructor.path = path;
    };
}
