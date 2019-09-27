import { IConfig } from '../lib/types/ConfigTypes';

enum ENV {
    DEV,
    PROD,
    TEST
}

const mode = ENV.DEV;
let config: IConfig;

switch (mode) {
    // case ENV.PROD:
    //     config = {} as IConfig;
    //     break;
    // case ENV.TEST:
    //     config = {} as IConfig;
    //     break;
    case ENV.DEV:
    default:
        config = {
            PORT: 1,

            DB: {
                type: 'postgres',
                host: '',
                port: 0,
                username: '',
                password: '',
                database: ''
            }
        };
}

export default config;
