import { HTTP_METHODS } from '../types/HTTP_METHODS';

export function GET() {
    return function (target: any, _propertyKey: string, descriptor: PropertyDescriptor) {
        let arr = Reflect.getMetadata(HTTP_METHODS.GET, target.constructor) || [];
        arr.push({
            handler: descriptor,
            path: ''
        });
        Reflect.defineMetadata(HTTP_METHODS.GET, arr, target.constructor);
    };
}
