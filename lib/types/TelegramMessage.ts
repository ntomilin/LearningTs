export interface ITelegramMessageObject {
    update_id: number;
    message: ITelegramMessage;
}

export interface ITelegramMessage {
    message_id: number;
    from: ITelegramMessageAuthor;
    chat: ITelegramMessageChat;
    date: number;

    text?: string;
    photo?: IPhoto[];
    sticker?: ISticker;
    video?: IVideo;
    voice?: IVoice;
    location?: ILocation;
    contact?: IContact;
    invoice?: IInvoice;
    successful_payment?: ISuccessfulPayment;
}

export interface ITelegramMessageAuthor {
    id: number;
    is_bot: boolean;
    first_name: string;
    last_name: string;
    username: string;
    language_code: string;
}

export interface ITelegramMessageChat {
    id: number;
    first_name: string;
    last_name: string;
    username: string;
    type: 'private' | 'group' | 'supergroup' | 'channel';
}

export interface IPhoto {
    file_id: string;
    width: number;
    height: number;
    file_size: number;
}

export interface IContact {
    phone_number: string;
    first_name: string;
    last_name: string;
    user_id: number;
    vcard: string;
}

export interface ILocation {
    longitude: number;
    latitude: number;
}

export interface IInvoice {
    title: string;
    description: string;
    start_parameter: string;
    currency: string;
    total_amount: number; // Should be divided by 100
}

export interface ISuccessfulPayment {
    currency: string;
    total_amount: number;
    invoice_payload: string;
    shipping_option_id: string;
    order_info: {
        name: string;
        phone_number: string;
        email: string;
        shipping_address: {
            country_code: string;
            state: string;
            city: string;
            street_line1: string;
            street_line2: string;
            post_code: string;
        }
    };
    telegram_payment_charge_id: string;
    provider_payment_charge_id: string;
}

export interface ISticker {
    file_id: string;
    width: number;
    height: number;
    is_animated: boolean;
    thumb: {
        file_id: string;
        width: number;
        height: number;
        file_size: string;
    };
    emoji: string;
    set_name: string;
    file_size: number;
}

export interface IVideo {
    file_id: string;
    width: number;
    height: number;
    duration: number;
    thumb: {
        file_id: string;
        width: number;
        height: number;
        file_size: string;
    };
    mime_type: string;
    file_size: number;
}

export interface IVoice {
    file_id: string;
    duration: number;
    mime_type: string;
    file_size: number;
}
