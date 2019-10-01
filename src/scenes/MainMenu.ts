import { IScenePrototype } from '../../lib/types/ScenePrototype';
import { Scene } from '../../lib/decorators/Classes';
import { SceneHandler } from '../../lib/decorators/Methods';
import { SessionState } from '../../lib/SessionState';

@Scene('MainMenu')
export class MainMenu implements IScenePrototype {
    constructor() {
    }

    @SceneHandler()
    public async onText(state: SessionState) {
        await state.sendTextMessage('Some text here');
        return state;
    }

    @SceneHandler()
    public onLocation(ctx) {

    }
}
