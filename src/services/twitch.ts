import ErrorFactory from "@/lib/errors/errorFactory";
import { setToCache } from "@/lib/redis/controllers";
import CACHE_KEYS from "@/data/constants/cacheKeys";

const twitchDeveloperAuthUrl = "https://id.twitch.tv/oauth2/token";

type TwitchOAuthRes = {
  access_token: string;
  expires_in: number;
  token_type: "bearer";
};

export async function getIGDBAccessToken(): Promise<
  DataOrError<Pick<TwitchOAuthRes, "access_token">, Error>
> {
  let data: TwitchOAuthRes | undefined;
  let error: Error | undefined;

  const requestBody = JSON.stringify({
    client_id: process.env.TWITCH_CLIENT_ID!,
    client_secret: process.env.TWITCH_CLIENT_SECRET!,
    grant_type: "client_credentials",
  });

  data = await fetch(`${twitchDeveloperAuthUrl}`, {
    method: "post",
    body: requestBody,
    headers: { "Content-Type": "application/json" },
  })
    .then(async (res) => {
      if (res.status >= 400)
        throw ErrorFactory.createFetchError(
          res.status,
          res.statusText,
          `Twitch oAuth Error: ${JSON.stringify(await res.json())}`
        );
      else {
        const data = (await res.json()) as Promise<TwitchOAuthRes>;
        return data;
      }
    })
    .catch((err) => {
      error = err;
      return undefined;
    });

  if (!data) {
    return { data, error };
  }

  console.log(data);

  setToCache(
    CACHE_KEYS.twitchAccessToken,
    JSON.stringify({ access_token: data.access_token }),
    data.expires_in - 1000
  );

  return { data: { access_token: data.access_token }, error: undefined };
}
