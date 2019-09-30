import { IInnerMessageObject } from './types/InnerMessage';
import { StateManager } from './StateManager';

export class SessionState {
    constructor(
        private readonly userMessage: IInnerMessageObject,
        private readonly stateManager: StateManager) {
    }

    public getUser() {
        return this.userMessage.user;
    }

    public getMessage() {
        return this.userMessage.message;
    }

    public async getScene(): Promise<string> {
        return await this.stateManager.getValue(this.userMessage.user.id, 'scene') as string;
    }

    public async getValue(field: string = '') {
        return this.stateManager.getValue(this.userMessage.user.id, field);
    }

    public async setValue(key: string, value: any) {
        await this.stateManager.setValue(this.userMessage.user.id, key, value);
    }

    public async setState(value: any) {
        await this.stateManager.setState(this.userMessage.user.id, value)
    }
}
