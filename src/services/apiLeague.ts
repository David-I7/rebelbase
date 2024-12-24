import { apiLeague } from "@/data/baseUrls";
import { apiLeagueRequestOptions } from "@/data/config/requestOptions";
import ErrorFactory from "@/lib/errors/errorFactory";

//consider filtering data if you see duplicates

type GamingMemes = {
  memes: {
    description: string;
    url: string;
    type: string;
  }[];

  available: 156;
};

export async function getGamingMemes(): Promise<
  DataOrError<GamingMemes, Error>
> {
  const queryString = new URLSearchParams({
    keywords: "gamer",
    "keywords-in-image": "false",
    "media-type": "image",
    number: "10",
  });

  try {
    const GamingMemesData: GamingMemes = await fetch(
      `${apiLeague}?${queryString}`,
      apiLeagueRequestOptions
    ).then(async (res) => {
      if (res.status >= 400)
        throw ErrorFactory.createFetchError(
          res.status,
          res.statusText,
          await res.json()
        );
      return (await res.json()) as GamingMemes;
    });

    return { data: GamingMemesData, error: undefined };
  } catch (err) {
    return { error: err as Error };
  }
}
