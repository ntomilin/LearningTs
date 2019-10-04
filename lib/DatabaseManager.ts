import { createConnection } from 'typeorm';

import { Logger } from './LoggerManager';
import { IDBConnection } from './types/ConfigTypes';
import { TelegramUsers } from './entities/TelegramUsers';
import { ViberUsers } from './entities/ViberUsers';

export default class DatabaseManager {

    public static init(dbConfig: IDBConnection, serverConstructor) {
        const entities = Reflect.getMetadata('entities', serverConstructor);

        const { telegram, viber } = Reflect.getMetadata('bots', serverConstructor);
        if (telegram) {
            entities.push(TelegramUsers);
        }
        if (telegram) {
            entities.push(ViberUsers);
        }

        const cfg = {
            ...dbConfig,
            entities,
            synchronize: true,
            logging: false
        };
        return createConnection(cfg)
            .then(() => {
                Logger.info('Connected to database');
            })
            .catch((err) => {
                Logger.error('Error connecting to database');
                Logger.error(err);
                process.exit(-1);
            });
    }
}
