import { apiLeague } from "@/data/baseUrls";
import { apiLeagueRequestOptions } from "@/data/config/requestOptions";
import ErrorFactory from "@/lib/errors/errorFactory";

type GamingMemes = {
  memes: {
    description: string;
    url: string;
    type: string;
  }[];

  available: number;
};

const keywords = [
  "gamer",
  "games",
  "esports",
  "game",
  "gaming",
  "good game",
  "online game",
];

export async function getGamingMemes(): Promise<
  DataOrError<GamingMemes["memes"], Error>
> {
  const dayOfWeek = new Date().getDay();

  const queryString = new URLSearchParams({
    keywords: `${keywords[dayOfWeek % 7]}`,
    "keywords-in-image": "false",
    "media-type": "image",
    number: `10`,
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

    console.log(GamingMemesData);

    const memeSet: Set<string> = new Set();

    const filteredMemes = GamingMemesData.memes.filter((meme) => {
      if (memeSet.has(meme.description) || meme.description.length > 100)
        return false;
      memeSet.add(meme.description);
      return true;
    });

    return { data: filteredMemes, error: undefined };
  } catch (err) {
    return { error: err as Error };
  }
}
