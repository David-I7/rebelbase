import CACHE_KEYS from "@/data/constants/cacheKeys";
import getOrSetCache from "@/lib/redis/controllers";
import { getGameNews } from "@/services/worldNewsApi";
import React from "react";
import HeroNews from "./HeroNews";
import RegularNews from "./RegularNews";

const GameNewsData = async () => {
  const { data, error } = await getOrSetCache(CACHE_KEYS.gameNews, getGameNews);
  if (error) throw error;
  if (!data?.news || !data.news.length) return;

  const titleSet: Set<string> = new Set();
  const filteredData = data.news.filter((article) => {
    if (titleSet.has(article.title)) return false;
    titleSet.add(article.title);
    return true;
  });

  return (
    <section className="mt-[104px]">
      <HeroNews gameNews={filteredData} />
      <RegularNews gameNews={filteredData} />
    </section>
  );
};

export default GameNewsData;
