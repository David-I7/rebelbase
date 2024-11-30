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
  name: string;
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
};

export type AgeRating = {
  id: number;
  category: number;
  rating: number;
}[];

export type Artworks = {
  id: number;
  image_id: string;
}[];

export type InvolvedCompanies = {
  id: number;
  developer: boolean;
  company: {
    id: number;
    name: string;
  };
}[];

export type Keywords = {
  id: number;
  name: string;
}[];

export type LanguageSupports = {
  id: number;
  language: { id: number; name: string; locale: string };
  language_support_type: { id: number; name: string };
}[];

export type Platforms = {
  id: string;
  name: string;
}[];

export type ReleaseDates = {
  id: number;
  date: number;
  platform: {
    id: number;
    name: string;
  };
}[];

export type Screenshots = {
  id: number;
  image_id: string;
}[];

export type Videos = {
  id: number;
  name: string;
  video_id: string;
}[];

export type Websites = {
  id: number;
  category: number;
  url: string;
}[];

export type PlayerPerspectives = {
  id: string;
  name: string;
}[];

export type GameData = [
  {
    videos?: Videos;
    websites?: Websites;
    summary?: string;
    storyline?: string;
    similar_games?: CardData[];
    release_dates?: ReleaseDates;
    player_perspectives?: PlayerPerspectives;
    platforms?: Platforms;
    language_supports?: LanguageSupports;
    keywords?: Keywords;
    involved_companies?: InvolvedCompanies;
    artworks?: Artworks;
    age_rating?: AgeRating;
  } & CardData
];

export enum HomeSections {
  topNewReleases = "topNewReleases",
  mostAnticipated = "mostAnticipated",
  topRated = "topRated",
  casualGames = "casualGames",
  offlineAndOnlineGames = "offlineAndOnlineGames",
  upcomingReleases = "upcomingReleases",
}

export type TopNewReleases = CardData;
export type MostAnticipated = CardData;
export type TopRated = CardData;
export type OfflineAndOnlineGames = CardData & { game_modes: GameModes };
export type CasualGames = CardData & { game_modes: GameModes };
export type UpcomingReleases = CardData;
