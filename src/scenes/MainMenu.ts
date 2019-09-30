import { IScenePrototype } from '../../lib/types/ScenePrototype';
import { Scene } from '../../lib/decorators/Classes';
import { SceneHandler } from '../../lib/decorators/Methods';

@Scene('MainMenu')
export class MainMenu implements IScenePrototype {
    constructor(/* services here */) {

    }

    @SceneHandler()
    public onText(ctx) {
        console.log(`on text implementation`);
        // implementation
    }

    @SceneHandler()
    public onLocation(ctx) {
        // implementation
    }
}
