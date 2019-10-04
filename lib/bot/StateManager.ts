import * as redis from 'redis';
import * as Bluebird from 'bluebird';

Bluebird.promisifyAll(redis.RedisClient.prototype);
Bluebird.promisifyAll(redis.Multi.prototype);

export class StateManager {

    private client;

    constructor() {
        this.client = redis.createClient();
    }

    public async setState(userId: string, value: any): Promise<any> {
        await this.client.setAsync(userId, JSON.stringify(value));
    }

    public async getState(userId: string): Promise<any> {
        return JSON.parse(await this.client.getAsync(userId));
    }
}
