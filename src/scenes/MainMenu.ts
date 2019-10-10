import { IScenePrototype } from '../../lib/types/ScenePrototype';
import { Scene } from '../../lib/decorators/Classes';
import { SceneHandler } from '../../lib/decorators/Methods';
import { SessionState } from '../../lib/bot/SessionState';

@Scene('MainMenu')
export class MainMenu implements IScenePrototype {
    constructor() {
    }

    @SceneHandler()
    public async onText(state: SessionState): Promise<SessionState> {
        console.log(`MainMenu onText`);
        state.setScene('SomeScene');
        return state;
    }

    @SceneHandler()
    public onLocation(state): Promise<SessionState> {
        return state;
    }

    @SceneHandler()
    public onLeave(state): Promise<SessionState> {
        console.log(`MainMenu onLeave`);
        return state;
    }
}
