interface IConfig {
    PORT: number;
    DB: IDBConnection;
    BOTS?: {
      TELEGRAM?: IBotConfig;
      VIBER?: IBotConfig;
    };
}

export interface IBotConfig {
    TOKEN: string;
    WEBHOOK: string;
}

interface IDBConnection {
    type: 'postgres' | 'mysql' | 'sqlite' | 'mongodb';
    database: string;
    host: string;
    port: number;
    username: string;
    password: string;
}

export {
    IConfig,
    IDBConnection
};
