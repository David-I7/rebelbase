import ErrorFactory from "@/lib/errors/errorFactory";
import { twitchDeveloperAuthUrl } from "@/data/baseUrls";

export type TwitchOAuthRes = {
  access_token: string;
  expires_in: number;
  token_type: "bearer";
};

export async function getIGDBAccessToken(): Promise<
  DataOrError<
    { payload: Pick<TwitchOAuthRes, "access_token">; revalidateIn: number },
    Error
  >
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
        const data = (await res.json()) as TwitchOAuthRes;
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

  return {
    data: {
      payload: { access_token: data.access_token },
      revalidateIn: data.expires_in,
    },
    error: undefined,
  };
}
