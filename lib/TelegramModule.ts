import * as TelegramBot from 'node-telegram-bot-api';
import { IBotConfig } from './types/ConfigTypes';
import { ITelegramMessageObject } from './types/TelegramMessage';
import { MessageConverter } from './MessageConverter';
import { IInnerMessageObject } from './types/InnerMessage';
import { SceneManager } from './SceneManager';
import { MessageHandler } from './MessageHandler';

export class TelegramModule {

    private tgApi: TelegramBot;

    constructor(telegramConfig: IBotConfig) {
        // @ts-ignore
        this.tgApi = new TelegramBot(telegramConfig.TOKEN, { webHook: { https: telegramConfig.WEBHOOK } });
    }

    public static processTelegramMessage(req, res): void {
        res.sendStatus(200);
        const telegramMessageObject: ITelegramMessageObject = req.body;

        const message: IInnerMessageObject = MessageConverter.convertTelegramMessage(telegramMessageObject);
        const reply = MessageHandler.processMessage(message);
        const telegramObject = MessageConverter.convertToTelegramMessage(reply);

        // send message
    }
}
