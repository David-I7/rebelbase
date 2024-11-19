import { ApicalypseConfig } from "apicalypse";

const requestOptions: ApicalypseConfig = {
  queryMethod: "body",
  baseURL: "https://api.igdb.com/v4",
  headers: {
    Accept: "application/json",
  },
  responseType: "json",
};

export default requestOptions;
