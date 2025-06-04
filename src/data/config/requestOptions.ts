export const IGDBRequestOptions: RequestInit = {
  method: "post",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "Client-ID": process.env.TWITCH_CLIENT_ID!,
  },
};
