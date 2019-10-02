import { IInnerMessageObject } from './types/InnerMessage';
import { SceneManager } from './SceneManager';
import { StateManager } from './StateManager';
import { SessionState } from './SessionState';
import { TelegramUsers } from './entities/TelegramUsers';
import { ViberUsers } from './entities/ViberUsers';

export class MessageHandler {

    private stateManager: StateManager;

    constructor() {
        this.stateManager = new StateManager();
    }

    public async processMessage(message: IInnerMessageObject, stateManager: StateManager, platformApi): Promise<any> {
        let user;
        if (message.platform === 'telegram') {
            user = await TelegramUsers.findOne(message.user.id);
        } else if (message.platform === 'viber') {
            user = await ViberUsers.findOne(message.user.id);
        }

        if (!user) {
            await stateManager.setState(message.user.id, { scene: 'Lobby' });
            message.message = { enterScene: true };
        }

        const userState: object = await stateManager.getState(message.user.id);

        const session: SessionState = new SessionState(message, userState, platformApi);
        const oldScene = session.getScene();

        const newSessionState = await SceneManager.handleMessage(session);

        const newState = newSessionState.getState();
        const newScene = newSessionState.getScene();

        await stateManager.setState(message.user.id, newState);

        if (oldScene !== newScene) {
            message.message = { enterScene: true };
            await this.processMessage(message, stateManager, platformApi);
        }

        return;
    }
}
