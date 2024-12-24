export const IGDBRequestOptions: RequestInit = {
  method: "post",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "Client-ID": process.env.TWITCH_CLIENT_ID!,
  },
};

export const worldNewsApiRequestOptions: RequestInit = {
  headers: {
    "x-api-key": process.env.WORLD_NEWS_API_KEY!,
  },
};
