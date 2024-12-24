import { youtubeApi } from "@/data/baseUrls";
import CACHE_KEYS from "@/data/constants/cacheKeys";
import ErrorFactory from "@/lib/errors/errorFactory";
import getOrSetCache from "@/lib/redis/controllers";

type BaseResponse = {
  kind: string;
  etag: string;
  nextPageToken: string;
  prevPageToken: string;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
};

type VideoResponse = BaseResponse & {
  items: {
    snippet: {
      channelId: string;
    };
  }[];
};
type ChannelResponse = BaseResponse & {
  items: {
    id: string;
    snippet: {
      title: string;
      customUrl: string;
      thumbnails: {
        medium: {
          url: string;
          width: 240;
          height: 240;
        };
      };
    };
    statistics: {
      subscriberCount: number;
    };
  }[];
};

async function getPopularGamingVideos(): Promise<DataOrError<string[], Error>> {
  const queryString = new URLSearchParams({
    key: process.env.YOUTUBE_API_KEY!,
    regionCode: "US",
    chart: "mostPopular",
    videoCategoryId: "20",
    maxResults: "15",
    part: "snippet",
    fields: "items(snippet(channelId))",
  }).toString();

  try {
    const VideoData: VideoResponse = await fetch(
      `${youtubeApi}/videos?${queryString}`
    ).then(async (res) => {
      if (res.status >= 400)
        throw ErrorFactory.createFetchError(
          res.status,
          res.statusText,
          await res.json()
        );

      return (await res.json()) as VideoResponse;
    });

    const channelIds: Set<string> = new Set();

    VideoData.items.forEach((video) => {
      if (channelIds.has(video.snippet.channelId)) return;
      channelIds.add(video.snippet.channelId);
    });

    return { data: Array.from(channelIds), error: undefined };
  } catch (err) {
    return { data: undefined, error: err as Error };
  }
}

async function getTopGamingChannels(
  channelIds: string[]
): Promise<DataOrError<ChannelResponse, Error>> {
  const queryString = new URLSearchParams({
    key: process.env.YOUTUBE_API_KEY!,
    part: "snippet,statistics",
    fields:
      "items(id,snippet(title,customUrl,thumbnails(medium)),statistics(subscriberCount))",
    id: channelIds.join(),
  });

  try {
    const ChannelData: ChannelResponse = await fetch(
      `${youtubeApi}/channels?${queryString}`
    ).then(async (res) => {
      if (res.status >= 400)
        throw ErrorFactory.createFetchError(
          res.status,
          res.statusText,
          await res.json()
        );

      return (await res.json()) as ChannelResponse;
    });

    return { data: ChannelData, error: undefined };
  } catch (err) {
    return { data: undefined, error: err as Error };
  }
}

export async function getTopGamingChannelsFacade(): Promise<
  DataOrError<ChannelResponse, Error>
> {
  const { data: channelIds, error: videoError } = await getOrSetCache(
    CACHE_KEYS.channelIds,
    getPopularGamingVideos
  );

  if (videoError) return { error: videoError };

  const { data: channelData, error } = await getOrSetCache(
    CACHE_KEYS.channelData,
    () => getTopGamingChannels(channelIds!)
  );

  return { data: channelData, error };
}
