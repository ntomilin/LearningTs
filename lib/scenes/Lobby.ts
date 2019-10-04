import { IScenePrototype } from '../types/ScenePrototype';
import { SessionState } from '../bot/SessionState';
import { TelegramUsers } from '../entities/TelegramUsers';
import { ViberUsers } from '../entities/ViberUsers';
import { Logger } from '../LoggerManager';

export class Lobby implements IScenePrototype {
    public async onEnter(state: SessionState): Promise<SessionState> {
        let user: TelegramUsers | ViberUsers;
        const platform = state.getPlatform();
        if (platform === 'telegram') {
            user = new TelegramUsers();
        } else if (platform === 'viber') {
            user = new ViberUsers();
        }

        user.blockedBot = false;
        user.firstConnect = new Date();
        user.lastInteraction = new Date();
        user.fullName = `${state.getUser().firstName} ${state.getUser().lastName}`;
        user.id = state.getUser().id;
        user.messagesAmount = 1;
        user.language = state.getUser().language;

        try {
            user = await user.save();
            Logger.info(`New user [id=${user.id}] was created from [${platform}]`);
        } catch (err) {
            Logger.error(`Error creating new user [userId=${state.getUser().id}]`);
            Logger.error(err);
        }

        state.setScene('MainMenu');
        return state;
    }
}
