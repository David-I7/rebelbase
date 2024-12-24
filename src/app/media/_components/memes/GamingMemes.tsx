import CACHE_KEYS from "@/data/constants/cacheKeys";
import getOrSetCache from "@/lib/redis/controllers";
import { getGamingMemes } from "@/services/apiLeague";
import React from "react";

const GamingMemes = async () => {
  const { data, error } = await getOrSetCache(
    CACHE_KEYS.gameMemes,
    getGamingMemes
  );

  if (error) throw error;

  console.log(data);

  return <div>GamingMemes</div>;
};

export default GamingMemes;
