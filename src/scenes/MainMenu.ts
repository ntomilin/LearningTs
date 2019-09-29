import { IScenePrototype } from '../../lib/types/ScenePrototype';
import { Scene } from '../../lib/decorators/Classes';

@Scene('MainMenu')
export class MainMenu implements IScenePrototype {
    constructor(/* services here */) {

    }

    public onText(ctx) {
        // implementation
    }
}
