import { SessionState } from '../SessionState';

export interface IScenePrototype {
    onText?: (ctx: SessionState) => Promise<SessionState>;
    onImage?: (ctx: SessionState) => Promise<SessionState>;
    onLocation?: (ctx: SessionState) => Promise<SessionState>;
    onContact?: (ctx: SessionState) => Promise<SessionState>;
    onAudio?: (ctx: SessionState) => Promise<SessionState>;
    onVideo?: (ctx: SessionState) => Promise<SessionState>;
    onUrl?: (ctx: SessionState) => Promise<SessionState>;
}
