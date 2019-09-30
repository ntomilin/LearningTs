import { IInnerMessageObject } from './types/InnerMessage';
import { SceneManager } from './SceneManager';

export class MessageHandler {
    public static processMessage(message: IInnerMessageObject): any {
        // get state
        let state = {};

        SceneManager.handleMessage(message);
        // store state
        state = {};

        return state;
    }
}
