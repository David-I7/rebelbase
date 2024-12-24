import CACHE_KEYS from "@/data/constants/cacheKeys";
import getOrSetCache from "@/lib/redis/controllers";
import { getGameNews } from "@/services/worldNewsApi";
import React from "react";
import GameNewsState from "./GameNewsState";

const GameNewsData = async () => {
  const { data, error } = await getOrSetCache(CACHE_KEYS.gameNews, getGameNews);
  if (error) throw error;

  return <GameNewsState gameNews={data!} />;
};

export default GameNewsData;
