import { ITelegramMessageObject } from './types/TelegramMessage';
import { IInnerMessage, IInnerMessageObject } from './types/InnerMessage';

export class MessageConverter {
    constructor() {
    }

    public static convertViberMessage(message: any): any {
        const convertedMessage: any = {};
        return convertedMessage;
    }

    public static convertTelegramMessage(tgMessage: ITelegramMessageObject): IInnerMessageObject {
        const message: IInnerMessage = {};

        if (tgMessage.message.text) {
            message.text = tgMessage.message.text;
        }
        if (tgMessage.message.location) {
            message.location = tgMessage.message.location; // TODO: create types
        }
        if (tgMessage.message.contact) {
            message.contact = tgMessage.message.contact; // TODO: create types
        }

        return {
            platform: 'telegram',
            user: {
                id: (tgMessage.message.from.id.toString()),
                firstName: tgMessage.message.from.first_name,
                lastName: tgMessage.message.from.last_name,
                language: tgMessage.message.from.language_code
            },
            date: tgMessage.message.date,
            message
        };
    }
}
