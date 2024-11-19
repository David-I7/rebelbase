import { createClient } from "redis";
import redisOptions from "@/data/config/redisConfig";

const redisClient = createClient(redisOptions);
await redisClient.connect();

export default redisClient;
