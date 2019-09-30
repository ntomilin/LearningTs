import { HTTP_METHODS } from '../types/HTTP_METHODS';

export function Get(path = '') {
    return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
        const arr = Reflect.getMetadata(HTTP_METHODS.GET, target.constructor) || [];
        arr.push({ handler: descriptor, path });
        Reflect.defineMetadata(HTTP_METHODS.GET, arr, target.constructor);
    };
}

export function Post(path = '') {
    return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
        const arr = Reflect.getMetadata(HTTP_METHODS.POST, target.constructor) || [];
        arr.push({ handler: descriptor, path });
        Reflect.defineMetadata(HTTP_METHODS.POST, arr, target.constructor);
    };
}

export function Delete(path = '') {
    return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
        const arr = Reflect.getMetadata(HTTP_METHODS.DELETE, target.constructor) || [];
        arr.push({ handler: descriptor, path });
        Reflect.defineMetadata(HTTP_METHODS.DELETE, arr, target.constructor);
    };
}

export function Put(path = '') {
    return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
        const arr = Reflect.getMetadata(HTTP_METHODS.PUT, target.constructor) || [];
        arr.push({ handler: descriptor, path });
        Reflect.defineMetadata(HTTP_METHODS.PUT, arr, target.constructor);
    };
}

export function SceneHandler() {
    return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
        const arr = Reflect.getMetadata('handlers', target.constructor) || [];
        arr.push({ handler: descriptor, event: propertyKey });
        Reflect.defineMetadata('handlers', arr, target.constructor);
    };
}
