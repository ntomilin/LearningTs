import * as TelegramBot from 'node-telegram-bot-api';
import { IBotConfig } from './types/ConfigTypes';
import { ITelegramMessageObject } from './types/TelegramMessage';

export class TelegramModule {

    private tgApi: TelegramBot;

    constructor(telegramConfig: IBotConfig) {
        this.tgApi = new TelegramBot(telegramConfig.TOKEN,{ webHook: { https: telegramConfig.WEBHOOK } });
    }

    public static processTelegramMessage(req, res): void {
        const message: ITelegramMessageObject = req.body;
        res.sendStatus(200);
    }
}
