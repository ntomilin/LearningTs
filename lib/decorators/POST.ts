import { HTTP_METHODS } from '../types/HTTP_METHODS';

export function POST(path = '') {
    return function (target: any, _propertyKey: string, descriptor: PropertyDescriptor) {
        let arr = Reflect.getMetadata(HTTP_METHODS.POST, target.constructor) || [];
        arr.push({
            handler: descriptor,
            path
        });
        Reflect.defineMetadata(HTTP_METHODS.POST, arr, target.constructor);
    };
}

