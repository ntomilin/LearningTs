import { SessionState } from '../SessionState';

export interface IScenePrototype {
    onText?: (ctx: SessionState) => SessionState;
    onImage?: (ctx: SessionState) => SessionState;
    onLocation?: (ctx: SessionState) => SessionState;
    onContact?: (ctx: SessionState) => SessionState;
    onAudio?: (ctx: SessionState) => SessionState;
    onVideo?: (ctx: SessionState) => SessionState;
    onUrl?: (ctx: SessionState) => SessionState;
}
