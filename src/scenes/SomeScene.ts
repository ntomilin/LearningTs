import { IScenePrototype } from '../../lib/types/ScenePrototype';
import { Scene } from '../../lib/decorators/Classes';
import { SceneHandler } from '../../lib/decorators/Methods';
import { SessionState } from '../../lib/bot/SessionState';

@Scene('SomeScene')
export class SomeScene implements IScenePrototype {
    constructor() {
    }

    @SceneHandler()
    public async onEnter(state: SessionState): Promise<SessionState> {
        console.log('SomeScene onEnter');
        return state;
    }
}
