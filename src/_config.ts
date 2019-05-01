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
    //     config = {};
    //     break;
    // case ENV.TEST:
    //     config = {};
    //     break;
    case ENV.DEV:
    default:
        config = {
            PORT: 1,

            DB: {
                type: '',
                host: '',
                port: '',
                username: '',
                password: '',
                database: ''
            }
        };
}

export default config;
