import { RedisClientOptions } from "redis";

const redisOptions: RedisClientOptions = {
  url: "redis://localhost:6379",
  isolationPoolOptions: {
    max: 10,
    idleTimeoutMillis: 10000,
  },
  name: "Server",
};

export default redisOptions;

export const DEFAULT_CACHE_EXPIRATION = 60 * 60 * 24 * 7; // 7days in seconds
