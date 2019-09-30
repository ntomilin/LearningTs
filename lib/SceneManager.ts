import { IInnerMessageObject } from './types/InnerMessage';
import { Logger } from './LoggerManager';
import { SessionState } from './SessionState';

export class SceneManager {

    private static readonly scenes = {};

    public static async handleMessage(state: SessionState) {
        const message = state.getMessage();
        const scene = await state.getScene();
        if (message.text) {
            if (SceneManager.scenes[scene]['onText']) {
                return SceneManager.scenes[scene]['onText'](message);
            }
        }
        if (message.contact) {
            if (SceneManager.scenes[scene]['onContact']) {
                return SceneManager.scenes[scene]['onContact'](message);
            }
        }
        if (message.location) {
            if (SceneManager.scenes[scene]['onLocation']) {
                return SceneManager.scenes[scene]['onLocation'](message);
            }
        }
        // TODO: implement other messages types
        // TODO: return new context after scene edition
    }

    public static registerScenes(serverConstructor) {
        Logger.info('Registering scenes...');
        const scenesConstructors = Reflect.getMetadata('scenes', serverConstructor);
        for (const sceneConstructor of scenesConstructors) {

            Logger.info(`Registering scene ${ sceneConstructor.name }`);
            SceneManager.scenes[sceneConstructor.name] = {};

            const handlers: Array<{ handler: { value: () => any }, event: string }> =
                Reflect.getMetadata('handlers', sceneConstructor);

            const scene = new sceneConstructor();

            for (const handler of handlers) {
                SceneManager.scenes[sceneConstructor.name][handler.event] = handler.handler.value.bind(scene);
            }
        }
        Logger.info('Finished registering scenes');
    }
}
