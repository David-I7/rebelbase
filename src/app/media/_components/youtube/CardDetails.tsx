import Dot from "@/_components/Dot";
import { ChannelResponse } from "@/services/youtube";
import React from "react";

const CardDetails = ({
  channel,
}: {
  channel: ChannelResponse["items"][number];
}) => {
  return (
    <div className="text-center">
      <h3 className="text-base text-ellipsis text-nowrap overflow-hidden mb-1">
        {channel.snippet.title}
      </h3>
      <div className="flex-wrap flex font-body-s items-center gap-x-2 justify-center">
        <div className="break-all">{channel.snippet.customUrl}</div>
        <Dot />
        <div>
          {formatChannelSubs(channel.statistics.subscriberCount)} subscribers
        </div>
      </div>
    </div>
  );
};

export default CardDetails;

function formatChannelSubs(channelSubs: number): string {
  if (channelSubs < 1000) return channelSubs.toString();
  else if (channelSubs >= 1000 && channelSubs < 1000000) {
    return `${(channelSubs / 1000).toString().slice(0, 4)}K`;
  } else if (channelSubs >= 1000000 && channelSubs < 1000000000) {
    return `${(channelSubs / 1000000).toString().slice(0, 4)}M`;
  } else if (channelSubs >= 1000000000 && channelSubs < 1000000000000) {
    return `${(channelSubs / 1000000000).toString().slice(0, 4)}B`;
  } else return "";
}
