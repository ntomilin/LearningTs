import { IInnerMessage, IInnerMessageObject } from './types/InnerMessage';

export class SessionState {
    constructor(
        private readonly userMessage: IInnerMessageObject,
        private readonly userState: object) {
    }

    // State methods
    public getScene(): string {
        return this.userState['scene'];
    }
    public setScene(scene: string) {
        this.userState['scene'] = scene;
    }
    public setValue(key: string, value: string) {
        this.userState[key] = value;
    }
    public getValue(key: string) {
        return this.userState[key];
    }
    public getState() {
        return this.userState;
    }

    // Message methods
    public getUser() {
        return this.userMessage.user;
    }
    public getMessage(): IInnerMessage {
        return this.userMessage.message;
    }
    public getTextMessage() {
        return this.userMessage.message.text;
    }
    public getLocationMessage() {
        return this.userMessage.message.location;
    }
    public getContactMessage() {
        return this.userMessage.message.contact;
    }
}
