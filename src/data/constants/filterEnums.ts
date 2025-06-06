export const uiFriendlySortByKeys: { [key: string]: string } = {
  newReleases: "New Releases",
  topRated: "Top Rated",
  upcomingReleases: "Upcoming Releases",
};
export const uiFriendlyGenreKeysBiMap: { [key: string]: string } = {
  pointAndClick: "Point-and-click",
  fighting: "Fighting",
  shooter: "Shooter",
  puzzle: "Puzzle",
  RTS: "Real Time Strategy (RTS)",
  RPG: "Role-playing (RPG)",
  simulator: "Simulator",
  sport: "Sport",
  strategy: "Strategy",
  TBS: "Turn-based strategy (TBS)",
  tactical: "Tactical",
  "quiz/trivia": "Quiz/Trivia",
  adventure: "Adventure",
  indie: "Indie",
  arcade: "Arcade",
  cardAndBoardGame: "Card & Board Game",
  MOBA: "MOBA",
  "Point-and-click": "pointAndClick",
  Fighting: "Fighting",
  Shooter: "shooter",
  Puzzle: "puzzle",
  "Real Time Strategy (RTS)": "RTS",
  "Role-playing (RPG)": "RPG",
  Simulator: "simulator",
  Sport: "sport",
  Strategy: "strategy",
  "Turn-based strategy (TBS)": "TBS",
  Tactical: "tactical",
  "Quiz/Trivia": "quiz/trivia",
  Adventure: "adventure",
  Indie: "indie",
  Arcade: "arcade",
  "Card & Board Game": "cardAndBoardGame",
};
export const uiFriendlyThemesKeysBiMap: { [key: string]: string } = {
  action: "Action",
  Action: "action",
  fantasy: "Fantasy",
  Fantasy: "fantasy",
  scienceFiction: "Science fiction",
  "Science fiction": "scienceFiction",
  horror: "Horror",
  Horror: "horror",
  thriller: "Thriller",
  survival: "Survival",
  stealth: "Stealth",
  "non-fiction": "Non-fiction",
  sandbox: "Sanbox",
  kids: "Kids",
  openWorld: "Open world",
  warfare: "Warfare",
  party: "Party",
  mystery: "Mystery",
  educational: "Educational",
  Thriller: "thriller",
  Survival: "survival",
  Stealth: "stealth",
  "Non-fiction": "non-fiction",
  Sandbox: "sandbox",
  Kids: "kids",
  "Open world": "openWorld",
  Warfare: "warfare",
  Party: "party",
  Mystery: "mystery",
  Educational: "educational",
};

export const uiFriendlyGameModeKeys: { [key: string]: string } = {
  singlePlayer: "Single player",
  multiplayer: "Multiplayer",
  "co-operative": "Co-operative",
  "split-screen": "Split-screen",
  MMO: "Massively Multiplayer Online (MMO)",
  battleRoyale: "Battle royale",
};
export const uiFriendlyCategoriesKeys: { [key: string]: string } = {
  mainGame: "Main game",
  dlcAddon: "Add-on",
  remaster: "Remaster",
  remake: "Remake",
  bundle: "Bundle",
  season: "Season",
};
export const convertedGameModeKeys: { [key: string]: number } = {
  singlePlayer: 1,
  multiplayer: 2,
  "co-operative": 3,
  "split-screen": 4,
  MMO: 5,
  battleRoyale: 6,
};

export const convertedCategoryKeys: { [key: string]: number } = {
  mainGame: 0,
  dlcAddon: 1,
  remaster: 9,
  remake: 8,
  bundle: 3,
  season: 7,
};
export const convertedThemesKeys: { [key: string]: number } = {
  action: 1,
  fantasy: 17,
  scienceFiction: 18,
  horror: 19,
  thriller: 20,
  survival: 21,
  stealth: 23,
  "non-fiction": 32,
  sandbox: 33,
  kids: 35,
  openWorld: 38,
  warfare: 39,
  party: 40,
  mystery: 43,
  educational: 34,
};
export const convertedGenresKeys: { [key: string]: number } = {
  pointAndClick: 2,
  fighting: 4,
  shooter: 5,
  puzzle: 9,
  RTS: 11,
  RPG: 12,
  simulator: 13,
  sport: 14,
  strategy: 15,
  TBS: 16,
  tactical: 24,
  adventure: 31,
  indie: 32,
  arcade: 33,
  cardAndBoardGame: 35,
  MOBA: 36,
  "quiz/trivia": 26,
};

export const themes = [
  "action",
  "fantasy",
  "scienceFiction",
  "horror",
  "thriller",
  "survival",
  "stealth",
  "non-fiction",
  "sandbox",
  "kids",
  "openWorld",
  "warfare",
  "party",
  "mystery",
  "educational",
] as const;

export const genres = [
  "pointAndClick",
  "fighting",
  "shooter",
  "puzzle",
  "RTS",
  "RPG",
  "simulator",
  "sport",
  "strategy",
  "TBS",
  "tactical",
  "quiz/trivia",
  "adventure",
  "indie",
  "arcade",
  "cardAndBoardGame",
  "MOBA",
] as const;

export const gameModes = [
  "singlePlayer",
  "multiplayer",
  "co-operative",
  "split-screen",
  "MMO",
  "battleRoyale",
] as const;

export const categories = [
  "mainGame",
  "dlcAddon",
  "remaster",
  "remake",
  "bundle",
  "season",
] as const;

export const sortBy = ["newReleases", "upcomingReleases", "topRated"] as const;

export const convertedPlatformsKeys: Record<
  (typeof platforms)[number],
  number
> = {
  windows: 6,
  mac: 14,
  browser: 82,
  ps5: 167,
  xboxSeriesXS: 169,
  android: 34,
  ios: 39,
  ps4: 48,
};
export const platforms = [
  "windows",
  "mac",
  "browser",
  "ps5",
  "xboxSeriesXS",
  "android",
  "ios",
  "ps4",
] as const;

export const uiFriendlyPlatformsMap: { [key: string]: string } = {
  windows: "Windows",
  mac: "Mac",
  browser: "Web Browser",
  ps5: "PlayStation 5",
  xboxSeriesXS: "Xbox Series X|S",
  android: "Android",
  ios: "iOS",
  ps4: "PlayStation 4",
};
