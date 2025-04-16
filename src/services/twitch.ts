import ErrorFactory from "@/lib/errors/errorFactory";
import { twitchDeveloperAuthUrl } from "@/data/baseUrls";
import { ONE_MONTH } from "@/data/constants/cache";

export type TwitchOAuthRes = {
  access_token: string;
  expires_in: number;
  token_type: "bearer";
};

export async function getIGDBAccessToken(): Promise<
  DataOrError<{ access_token: string }, Error>
> {
  let error: Error | undefined;

  const requestBody = JSON.stringify({
    client_id: process.env.TWITCH_CLIENT_ID!,
    client_secret: process.env.TWITCH_CLIENT_SECRET!,
    grant_type: "client_credentials",
  });

  const data = await fetch(`${twitchDeveloperAuthUrl}`, {
    method: "post",
    body: requestBody,
    headers: { "Content-Type": "application/json" },
    cache: "force-cache",
    next: { revalidate: ONE_MONTH },
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
      access_token: data.access_token,
    },
    error: undefined,
  };
}
