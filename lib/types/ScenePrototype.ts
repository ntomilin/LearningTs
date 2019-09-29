export interface IScenePrototype {
    onText?: (ctx) => any;
    onImage?: (ctx) => any;
    onLocation?: (ctx) => any;
    onContent?: (ctx) => any;
    onAudio?: (ctx) => any;
    onVideo?: (ctx) => any;
    onUrl?: (ctx) => any;
}
