import * as TelegramBot from 'node-telegram-bot-api';
import { IBotConfig } from '../types/ConfigTypes';
import { ITelegramMessageObject } from '../types/TelegramMessage';
import { MessageConverter } from './MessageConverter';
import { IInnerMessageObject } from '../types/InnerMessage';
import { MessageHandler } from './MessageHandler';
import { StateManager } from './StateManager';

export class TelegramModule {

    private tgApi: TelegramBot;

    constructor(telegramConfig: IBotConfig,
                private readonly messageHandler: MessageHandler,
                private readonly stateManager: StateManager) {

        this.tgApi = new TelegramBot(telegramConfig.TOKEN);
        this.tgApi.setWebHook(telegramConfig.WEBHOOK);
    }

    public async processTelegramMessage(req, res): Promise<void> {
        res.sendStatus(200);
        const telegramMessageObject: ITelegramMessageObject = req.body;
        const message: IInnerMessageObject = MessageConverter.convertTelegramMessage(telegramMessageObject);

        await this.messageHandler.processMessage(message, this.stateManager, {
            telegram: {
                sendTextMessage: this.sendTextMessage.bind(this),
            }
        });
    }

    public async sendTextMessage(userId: string, messageObject: string) {
        await this.tgApi.sendMessage(userId, messageObject);
    }
}
