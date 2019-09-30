import { IInnerMessageObject } from './types/InnerMessage';
import { SceneManager } from './SceneManager';
import { StateManager } from './StateManager';
import { SessionState } from './SessionState';

export class MessageHandler {

    private stateManager: StateManager;

    constructor() {
        this.stateManager = new StateManager();
    }

    public async processMessage(message: SessionState): Promise<any> {

        let state = message.getValue();
        state = SceneManager.handleMessage(message);
        await message.setState(state);

        return;
    }
}
