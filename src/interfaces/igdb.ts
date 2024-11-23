export type Cover = {
  id: number;
  image_id: string;
};

export type Genres = {
  id: number;
  name: string;
}[];

export type Themes = {
  id: number;
  name: number;
}[];

export type GameModes = {
  id: number;
  name: string;
}[];

export type CardData = {
  id: number;
  rating?: number;
  name: string;
  genres?: Genres;
  themes?: Themes;
  cover?: Cover;
  first_release_date?: number; //Seconds ellapsed since epoc
};

export type Popularity_Source_Response = {
  id: number;
  game_id: number;
  value: number;
}[];

export enum HomeSections {
  "topNewReleases" = "topNewReleases",
  "mostAnticipated" = "mostAnticipated",
  "topRated" = "topRated",
  "casualGames" = "casualGames",
  "offlineAndOnlineGames" = "offlineAndOnlineGames",
  "upcomingReleases" = "upcomingReleases",
}

export type TopNewReleases = CardData[];
export type MostAnticipated = CardData[];
export type TopRated = CardData[];
export type OfflineAndOnlineGames = (CardData & { game_modes: GameModes })[];
export type CasualGames = (CardData & { game_modes: GameModes })[];
export type UpcomingReleases = CardData[];
