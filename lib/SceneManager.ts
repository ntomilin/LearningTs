import { IInnerMessageObject } from './types/InnerMessage';
import { Logger } from './LoggerManager';

export class SceneManager {

    private static readonly scenes = {};

    // TODO: add second parameter - state
    // TODO: Take scene from state and call needed handler
    public static handleMessage(message: IInnerMessageObject) {
        if (message.message.text) {
            if (SceneManager.scenes['MainMenu']['onText']) {
                return SceneManager.scenes['MainMenu']['onText'](message);
            }
        }
        if (message.message.contact) {
            if (SceneManager.scenes['MainMenu']['onContact']) {
                return SceneManager.scenes['MainMenu']['onContact'](message);
            }
        }
        if (message.message.location) {
            if (SceneManager.scenes['MainMenu']['onLocation']) {
                return SceneManager.scenes['MainMenu']['onLocation'](message);
            }
        }
        // TODO: implement other messages types
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
