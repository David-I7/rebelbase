import CACHE_KEYS from "@/data/constants/cacheKeys";
import getOrSetCache from "@/lib/redis/controllers";
import { getGameNews } from "@/services/worldNewsApi";
import React from "react";
import HeroNews from "./HeroNews";
import RegularNews from "./RegularNews";

const GameNewsData = async ({ sectionId }: { sectionId: string }) => {
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
    <section
      id={sectionId}
      className="max-w-[1280px] mt-6 scroll-mt-20 mx-4 md:mx-8 [@media(min-width:1344px)]:mx-auto"
    >
      <HeroNews gameNews={filteredData} />
      <RegularNews gameNews={filteredData} />
    </section>
  );
};

export default GameNewsData;
