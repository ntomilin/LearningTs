export interface IInnerMessageObject {
    platform: 'telegram' | 'viber';
    user: IInnerUser;
    date: number;
    message: IInnerMessage;
}

export interface IInnerUser {
    id: string;
    firstName: string;
    lastName: string;
    language: string;
}

export interface IInnerMessage {
    text?: string;

    location?: any;
    contact?: any;
}
