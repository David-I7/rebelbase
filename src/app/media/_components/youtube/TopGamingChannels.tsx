import { getTopGamingChannelsFacade } from "@/services/youtube";
import React from "react";

const TopGamingChannels = async () => {
  const { data, error } = await getTopGamingChannelsFacade();

  if (error) throw error;

  console.log(data);
  return <div>TopGamingChannels</div>;
};

export default TopGamingChannels;
