import { Logger } from '../LoggerManager';
import { SessionState } from './SessionState';
import { Lobby } from '../scenes/Lobby';

export class SceneManager {

    private static readonly scenes = {};

    public static async handleSceneLeave(state: SessionState, scene: string) {
        if (!SceneManager.checkScene(scene)) {
            return state;
        }

        if (typeof SceneManager.scenes[scene]['onLeave'] === 'function') {
            return await SceneManager.scenes[scene]['onLeave'](state);
        }
    }

    public static async handleSceneEnter(state: SessionState, scene: string) {
        if (!SceneManager.checkScene(scene)) {
            return state;
        }

        if (typeof SceneManager.scenes[scene]['onEnter'] === 'function') {
            return await SceneManager.scenes[scene]['onEnter'](state);
        }
    }

    public static async handleMessage(state: SessionState) {
        const message = state.getMessage();
        const scene = await state.getScene();

        if (!SceneManager.checkScene(scene)) {
            return state;
        }

        if (message.text && typeof SceneManager.scenes[scene]['onText'] === 'function') {
            return await SceneManager.scenes[scene]['onText'](state);
        }
        if (message.contact && typeof SceneManager.scenes[scene]['onContact'] === 'function') {
            return await SceneManager.scenes[scene]['onContact'](state);
        }
        if (message.location && typeof SceneManager.scenes[scene]['onLocation'] === 'function') {
            return await SceneManager.scenes[scene]['onLocation'](state);
        }
        return state;
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
        SceneManager.initLobbyScene();
        Logger.info('Finished registering scenes');
    }

    private static initLobbyScene() {
        const lobbyScene = new Lobby();
        SceneManager.scenes['Lobby'] = {};
        if (lobbyScene['onLeave']) {
            SceneManager.scenes['Lobby']['onLeave'] = lobbyScene['onLeave'].bind(lobbyScene);
        }
        if (lobbyScene['onEnter']) {
            SceneManager.scenes['Lobby']['onEnter'] = lobbyScene['onEnter'].bind(lobbyScene);
        }
        if (lobbyScene['onText']) {
            SceneManager.scenes['Lobby']['onText'] = lobbyScene['onText'].bind(lobbyScene);
        }
        if (lobbyScene['onContact']) {
            SceneManager.scenes['Lobby']['onContact'] = lobbyScene['onContact'].bind(lobbyScene);
        }
        if (lobbyScene['onLocation']) {
            SceneManager.scenes['Lobby']['onLocation'] = lobbyScene['onLocation'].bind(lobbyScene);
        }
    }

    private static checkScene(scene): boolean {
        if (!SceneManager.scenes[scene]) {
            Logger.error(`Error executing scene:`);
            Logger.error(`Scene ${ scene } was not found`);
            return false;
        }
        return true;
    }
}
