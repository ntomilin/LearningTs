import * as TelegramBot from 'node-telegram-bot-api';
import { IBotConfig } from './types/ConfigTypes';
import { ITelegramMessageObject } from './types/TelegramMessage';
import { MessageConverter } from './MessageConverter';
import { IInnerMessageObject } from './types/InnerMessage';
import { MessageHandler } from './MessageHandler';
import { SessionState } from './SessionState';
import { StateManager } from './StateManager';

export class TelegramModule {

    private tgApi: TelegramBot;

    constructor(telegramConfig: IBotConfig,
                private readonly messageHandler: MessageHandler,
                private readonly stateManager: StateManager) {
        // @ts-ignore
        this.tgApi = new TelegramBot(telegramConfig.TOKEN, { webHook: { https: telegramConfig.WEBHOOK } });
    }

    public processTelegramMessage(req, res): void {
        res.sendStatus(200);
        const telegramMessageObject: ITelegramMessageObject = req.body;
        const message: IInnerMessageObject = MessageConverter.convertTelegramMessage(telegramMessageObject);

        const session = new SessionState(message, this.stateManager);

        const reply = this.messageHandler.processMessage(session);
        const telegramObject = MessageConverter.convertToTelegramMessage(reply);

        // send message
    }
}
