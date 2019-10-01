import { IInnerMessageObject } from './types/InnerMessage';
import { SceneManager } from './SceneManager';
import { StateManager } from './StateManager';
import { SessionState } from './SessionState';

export class MessageHandler {

    private stateManager: StateManager;

    constructor() {
        this.stateManager = new StateManager();
    }

    public async processMessage(message: IInnerMessageObject, stateManager: StateManager): Promise<any> {
        const userState: object = await stateManager.getState(message.user.id);
        const session: SessionState = new SessionState(message, userState);
        const newState = (await SceneManager.handleMessage(session)).getState();
        await stateManager.setState(message.user.id, newState);
        return;
    }
}
