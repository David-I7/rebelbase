import { DEFAULT_CACHE_EXPIRATION } from "@/data/config/redisConfig";
import redisClient from "./redisConfig";

export default async function getOrSetCache<T>(
  key: string,
  freshDataCb: () => Promise<DataOrError<T, Error>>,
  cacheExpirationSec: number = DEFAULT_CACHE_EXPIRATION
): Promise<DataOrError<T, Error>> {
  try {
    const cachedData = await redisClient.get(key);

    if (cachedData) {
      console.log("Cache hit ", key);
      return { data: JSON.parse(cachedData), error: undefined };
    } else {
      console.log("Cache miss ", key);
      const { data, error } = await freshDataCb();
      if (error) throw error;

      redisClient.setEx(key, cacheExpirationSec, JSON.stringify(data));

      return { data, error: undefined };
    }
  } catch (err) {
    return { data: undefined, error: err as Error };
  }
}

export async function setToCache<T>(
  key: string,
  data: T,
  cacheExpirationSec: number = DEFAULT_CACHE_EXPIRATION
): Promise<boolean> {
  try {
    redisClient.setEx(key, cacheExpirationSec, JSON.stringify(data));
    return true;
  } catch (err) {
    return false;
  }
}
