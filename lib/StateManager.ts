import * as redis from 'redis';
import * as Bluebird from 'bluebird';
Bluebird.promisifyAll(redis.RedisClient.prototype);
Bluebird.promisifyAll(redis.Multi.prototype);

export class StateManager {

    private client;

    constructor() {
        this.client = redis.createClient();
    }

    public async getValue(userId: string, field: string): Promise<any> {
        const state = JSON.parse(await this.client.getAsync(userId));
        if (state) {
            return state[field];
        } else {
            return {};
        }
    }

    public async setValue(userId: string, key: string, value: any): Promise<any> {
        const state = JSON.parse(await this.client.getAsync(userId));
        state[key] = value;
        this.client.setAsync(userId, JSON.stringify(state));
    }

    public async setState(userId: string, value: any): Promise<any> {
        await this.client.setASync(userId, JSON.stringify(value));
    }

}
