import { createConnection } from 'typeorm';

import { logger } from '../src/logger';
import { IDBConnection } from './types/ConfigTypes';

import { Users } from '../src/entities/Users';

export default class DatabaseManager {
    private connectionConfiguration;

    private constructor(dbConfig: IDBConnection) {
        this.connectionConfiguration = {
            ...dbConfig,
            entities: [
                Users
            ],
            synchronize: true,
            logging: false
        };
    }

    public static connectToDatabase(dbConfig: IDBConnection) {
        let dm = new DatabaseManager(dbConfig);
        return createConnection(dm.connectionConfiguration)
            .then(() => {
                logger.info('Connected to database')
            })
            .catch((err) => {
                logger.error(err);
                process.exit(-1);
            });
    }
}



