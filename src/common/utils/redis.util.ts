import Redis from 'ioredis';
import { ENVIRONMENT } from '../configs/environment';

export class CacheHelper {
  private redis: Redis;

  constructor() {
    this.redis = new Redis(ENVIRONMENT.REDIS.URL);
  }

  setCache = async (key: string, value: string | object, expiry?: number) => {
    try {
      const json = JSON.stringify(value);
      if (expiry) {
        await this.redis.set(key, json, 'EX', expiry);
      } else {
        await this.redis.set(key, json);
      }
    } catch (error) {
      console.error('Error while setting cache', error);
    }
  };

  getCache = async (key: string) => {
    try {
      const json = await this.redis.get(key);
      if (json) return JSON.parse(json);
      return null;
    } catch (error) {
      console.error('Error while getting cache', error);
      return null;
    }
  };

  removeFromCache = async (key: string) => {
    try {
      if (!key) {
        throw new Error('Invalid key provided');
      }

      const data = await this.redis.del(key);

      if (!data) {
        return null;
      }

      return data;
    } catch (error) {
      console.error('Error while removing cache', error);
      return null;
    }
  };
}

export const cacheHelper = new CacheHelper();
