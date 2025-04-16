import CACHE_KEYS, { DEFAULT_CACHE_EXPIRATION } from "@/data/constants/cache";
import { unstable_cache } from "next/cache";
import { getGameNews } from "@/services/worldNewsApi";
import React from "react";
import HeroNews from "./HeroNews";
import RegularNews from "./RegularNews";

const cahcedGetGameNews = unstable_cache(getGameNews, [CACHE_KEYS.gameNews], {
  revalidate: DEFAULT_CACHE_EXPIRATION,
});

const GameNewsData = async () => {
  const { data, error } = await cahcedGetGameNews();
  if (error) throw error;
  if (!data?.news || !data.news.length) return;

  const titleSet: Set<string> = new Set();
  const filteredData = data.news.filter((article) => {
    if (titleSet.has(article.title)) return false;
    titleSet.add(article.title);
    return true;
  });

  return (
    <>
      <HeroNews gameNews={filteredData} />
      <RegularNews gameNews={filteredData} />
    </>
  );
};

export default GameNewsData;
