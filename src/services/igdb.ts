//There is a rate limit of 4 requests per second.
import apicalypse from "apicalypse";
import requestOptions from "@/data/config/apicalypseConfig";
import getOrSetCache from "@/lib/redis/controllers";
import { getIGDBAccessToken } from "./twitch";
import CACHE_KEYS from "@/data/constants/cacheKeys";

export async function getTopNewReleases() {
  const { data, error } = await getOrSetCache(
    CACHE_KEYS.twitchAccessToken,
    getIGDBAccessToken
  );
  if (error) throw error;
  const response = await apicalypse({
    ...requestOptions,
    headers: {
      ...requestOptions.headers,
      Authorization: `bearer ${data?.access_token}`,
      "Client-ID": process.env.TWITCH_CLIENT_ID!,
    },
  })
    .fields("name")
    .limit(10)
    .where("rating_count > 100")
    .sort("rating_count")
    .request("/games")
    .then((res) => res.data)
    .catch((err) => console.log(err));

  console.log(response);
}
