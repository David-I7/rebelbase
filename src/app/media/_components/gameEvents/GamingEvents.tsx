import CACHE_KEYS from "@/data/constants/cacheKeys";
import getOrSetCache from "@/lib/redis/controllers";
import { getGameEvents } from "@/services/igdb";
import React from "react";

const GamingEvents = async () => {
  const { data, error } = await getOrSetCache(
    CACHE_KEYS.gameEvents,
    getGameEvents
  );

  if (error) throw error;

  return <div>GamingEvents</div>;
};

export default GamingEvents;
