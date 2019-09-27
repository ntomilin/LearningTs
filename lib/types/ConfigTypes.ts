interface IConfig {
    PORT: number;
    DB: IDBConnection;
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
