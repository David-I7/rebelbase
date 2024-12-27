import { worldNewsApi } from "@/data/baseUrls";
import { worldNewsApiRequestOptions } from "@/data/config/requestOptions";
import ErrorFactory from "@/lib/errors/errorFactory";
import { format, subDays } from "date-fns";

export type GameNews = {
  offset: number;
  number: number;
  available: number;
  news: {
    id: number;
    title: string;
    text: string;
    summary: string;
    url: string;
    image: string;
    video: string;
    publish_date: string;
    authors: string[];
    category: string;
    language: string;
    source_country: string;
    sentiment: number;
  }[];
};

export async function getGameNews(): Promise<DataOrError<GameNews, Error>> {
  const thirtyDaysAgo = format(subDays(new Date(), 30), "yyyy-MM-dd");

  const queryParams = new URLSearchParams({
    language: "en",
    number: "10",
    "earliest-publish-date": thirtyDaysAgo,
    text: "games OR gaming OR esports",
  }).toString();

  try {
    const gameNews: GameNews = await fetch(
      `${worldNewsApi}?${queryParams}`,
      worldNewsApiRequestOptions
    ).then(async (res) => {
      if (res.status >= 400)
        throw ErrorFactory.createFetchError(
          res.status,
          res.statusText,
          await res.json()
        );

      return (await res.json()) as GameNews;
    });

    gameNews.news = gameNews.news.filter((article) => Boolean(article.image));

    gameNews.news.sort(
      (a, b) =>
        (b.publish_date ? new Date(b.publish_date).getTime() : 0) -
        (a.publish_date ? new Date(a.publish_date).getTime() : 0)
    );

    return { data: gameNews, error: undefined };
  } catch (err) {
    return { data: undefined, error: err as Error };
  }
}
