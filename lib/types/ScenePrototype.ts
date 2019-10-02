import { SessionState } from '../SessionState';

export interface IScenePrototype {
    onText?: (state: SessionState) => Promise<SessionState>;
    onImage?: (state: SessionState) => Promise<SessionState>;
    onLocation?: (state: SessionState) => Promise<SessionState>;
    onContact?: (state: SessionState) => Promise<SessionState>;
    onAudio?: (state: SessionState) => Promise<SessionState>;
    onVideo?: (state: SessionState) => Promise<SessionState>;
    onUrl?: (state: SessionState) => Promise<SessionState>;

    onEnter?: (state: SessionState) => Promise<SessionState>;
    onLeave?: (state: SessionState) => Promise<SessionState>;
}
