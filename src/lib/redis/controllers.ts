import { DEFAULT_CACHE_EXPIRATION } from "@/data/config/redisConfig";
import redisClient from "./redisConfig";
import ErrorFactory from "../errors/errorFactory";

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

export async function setToCache(
  key: string,
  data: string,
  cacheExpirationSec: number = DEFAULT_CACHE_EXPIRATION
): Promise<boolean> {
  try {
    redisClient.setEx(key, cacheExpirationSec, data);
    return true;
  } catch (err) {
    return err ? false : false;
  }
}
export async function getFromCache<T>(
  key: string
): Promise<DataOrError<T, Error>> {
  try {
    const data = await redisClient.get(key);
    if (!data)
      throw ErrorFactory.createRedisError(`Key ${key} is not in the cache`);
    return { data: JSON.parse(data) as T, error: undefined };
  } catch (err) {
    return { data: undefined, error: err as Error };
  }
}
export async function getOrSetToCacheDynamicExpiration<T>(
  key: string,
  freshDataCb: () => Promise<
    DataOrError<{ payload: T; revalidateIn: number }, Error>
  >
): Promise<DataOrError<T, Error>> {
  try {
    const data = await redisClient.get(key);
    if (data) {
      console.log("Cache hit ", key);
      return { data: JSON.parse(data), error: undefined };
    } else {
      console.log("Cache miss ", key);
      const { data, error } = await freshDataCb();
      if (error) throw error;
      setToCache(key, JSON.stringify(data!.payload), data!.revalidateIn - 1000);
      return { data: data!.payload, error: undefined };
    }
  } catch (err) {
    return { data: undefined, error: err as Error };
  }
}
