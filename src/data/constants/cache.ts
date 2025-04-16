const CACHE_KEYS = {
  twitchAccessToken: "oAuth2_Twitch_Access_Token",
  homePage: "HOME_PAGE",
  gameNews: "GAME_NEWS",
  gameMemes: "GAME_MEMES",
  gameEvents: "GAME_EVENTS",
  channelIds: "YT_CHANNEL_IDS",
  channelData: "YT_CHANNEL_DATA",
};

export const DEFAULT_CACHE_EXPIRATION = 3600 * 24; // 1day in seconds
export const ONE_MONTH = 3600 * 24 * 31;
export default CACHE_KEYS;
