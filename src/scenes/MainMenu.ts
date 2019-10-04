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
        state.setScene('SomeScene');
        return state;
    }

    @SceneHandler()
    public onLocation(state): Promise<SessionState> {
        return state;
    }
}
