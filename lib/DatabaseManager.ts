import { createConnection } from 'typeorm';

import { Logger } from './LoggerManager';
import { IDBConnection } from './types/ConfigTypes';

import { Users } from '../src/entities/Users';

export default class DatabaseManager {

    public static connectToDatabase(dbConfig: IDBConnection) {
        const dm = new DatabaseManager(dbConfig);
        return createConnection(dm.connectionConfiguration)
            .then(() => {
                Logger.info('Connected to database');
            })
            .catch((err) => {
                Logger.error('Error connecting to database');
                Logger.error(err);
                process.exit(-1);
            });
    }

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
}
