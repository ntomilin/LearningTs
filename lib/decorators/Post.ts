import { HTTP_METHODS } from '../types/HTTP_METHODS';

export function Post(path = '') {
    return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
        const arr = Reflect.getMetadata(HTTP_METHODS.POST, target.constructor) || [];
        arr.push({ handler: descriptor, path });
        Reflect.defineMetadata(HTTP_METHODS.POST, arr, target.constructor);
    };
}
