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
      <h3 className="text-base">{channel.snippet.title}</h3>
      <div className="flex-wrap flex">
        <div>{channel.snippet.customUrl}</div>
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
  return "";
}
