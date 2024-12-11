import { z } from "zod";

class SortDetails {
  public sortBy!: string;
  public sortDir!: "asc" | "desc";
  public whereCondition!: string;
  constructor(sortBy: string, sortDir: "asc" | "desc", whereCondition: string) {
    this.sortBy = sortBy;
    this.sortDir = sortDir;
    this.whereCondition = whereCondition;
  }
}

export class SortDetailsFactory {
  static create(sortType: (typeof sortBy)[number]): SortDetails {
    switch (sortType) {
      case "newReleases": {
        const now = Math.floor(new Date().getTime() / 1000);

        return new SortDetails(
          "first_release_date",
          "desc",
          `first_release_date <= ${now} & cover.image_id != null & rating_count != null`
        );
      }
      case "upcomingReleases": {
        const now = Math.floor(new Date().getTime() / 1000);

        return new SortDetails(
          "first_release_date",
          "asc",
          `first_release_date > ${now} & cover.image_id != null`
        );
      }
      case "topRated": {
        return new SortDetails(
          "rating",
          "desc",
          `rating > 70 & rating_count > 500`
        );
      }
    }
  }
}

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
  "Point-and-click": "1",
  Fighting: "1",
  Shooter: "1",
  Puzzle: "1",
  "Real Time Strategy (RTS)": "1",
  "Role-playing (RPG)": "1",
  Simulator: "1",
  Sport: "1",
  Strategy: "1",
  "Turn-based strategy (TBS)": "1",
  Tactical: "1",
  "Quiz/Trivia": "1",
  Adventure: "1",
  Indie: "1",
  Arcade: "1",
  "Card & Board Game": "1",
};
export const uiFriendlyThemesKeysBiMap: { [key: string]: string } = {
  action: "Action",
  Action: "1",
  fantasy: "Fantasy",
  Fantasy: "1",
  scienceFiction: "Science fiction",
  "Science fiction": "1",
  horror: "Horror",
  Horror: "1",
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
  Thriller: "1",
  Survival: "1",
  Stealth: "1",
  "Non-fiction": "1",
  Sanbox: "1",
  Kids: "1",
  "Open world": "1",
  Warfare: "1",
  Party: "1",
  Mystery: "1",
  Educational: "1",
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

const searchParamsBrowseSchema = z
  .object({
    sortBy: z.enum(sortBy).default("newReleases"),
    sortDir: z.enum(["asc", "desc"]).optional(),
    gameModes: z
      .union([
        z.enum(gameModes),
        z.tuple([z.enum(gameModes)]).rest(z.enum(gameModes)),
      ])
      .optional(),
    tags: z.string().or(z.array(z.string()).min(2)).optional(),
    genres: z
      .union([z.enum(genres), z.tuple([z.enum(genres)]).rest(z.enum(genres))])
      .optional(),
    themes: z
      .union([z.enum(themes), z.tuple([z.enum(themes)]).rest(z.enum(themes))])
      .optional(),
    categories: z
      .union([
        z.enum(categories),
        z.tuple([z.enum(categories)]).rest(z.enum(categories)),
      ])
      .optional(),
    limit: z.coerce.number().min(1).int().optional(),
    offset: z.coerce.number().min(0).int().optional(),
  })
  .passthrough();

type SearchParamsBrowseSchema = z.infer<typeof searchParamsBrowseSchema>;

export type SearchParamsBrowse = {
  where: string[];
  sort: { field: string; order: "asc" | "desc" };
  limit: number;
  offset: number;
  sortBy: (typeof sortBy)[number];
  sortDir: "asc" | "desc";
  categories:
    | (typeof categories)[number]
    | (typeof categories)[number][]
    | undefined;
  themes: (typeof themes)[number] | (typeof themes)[number][] | undefined;
  genres: (typeof genres)[number] | (typeof genres)[number][] | undefined;
  gameModes:
    | (typeof gameModes)[number]
    | (typeof gameModes)[number][]
    | undefined;
  tags: string | string[] | undefined;
};

const DEFAULT_FILTER_LIMIT = 40;
const DEFAULT_FILTER_OFFSET = 0;

export function extractFields(
  searchParams: {
    [key: string]: string | string[] | undefined;
  },
  pathName: string
): { queryParams: SearchParamsBrowse; queryString: string } {
  const defaultSortDetails = SortDetailsFactory.create("newReleases");

  let queryString = buildQueryString(pathName, defaultSortDetails);
  let result: SearchParamsBrowse = {
    limit: DEFAULT_FILTER_LIMIT,
    offset: DEFAULT_FILTER_OFFSET,
    sort: {
      field: defaultSortDetails.sortBy,
      order: defaultSortDetails.sortDir,
    },
    sortBy: "newReleases",
    sortDir: defaultSortDetails.sortDir,
    where: [defaultSortDetails.whereCondition],
    categories: undefined,
    tags: undefined,
    themes: undefined,
    genres: undefined,
    gameModes: undefined,
  };

  const parsedSearchParams = searchParamsBrowseSchema.safeParse(searchParams);

  if (parsedSearchParams.success) {
    const where: string[] = [];
    const categoriesCondition = getWhereCondition(
      "category",
      parsedSearchParams.data.categories,
      convertedCategoryKeys
    );
    const gameModesCondition = getWhereCondition(
      "game_modes.id",
      parsedSearchParams.data.gameModes,
      convertedGameModeKeys
    );
    const tagsCondition = getWhereCondition(
      "keywords.id",
      parsedSearchParams.data.tags,
      undefined
    );
    const themesCondition = getWhereCondition(
      "themes.id",
      parsedSearchParams.data.themes,
      convertedThemesKeys
    );
    const genresCondition = getWhereCondition(
      "genres.id",
      parsedSearchParams.data.genres,
      convertedGenresKeys
    );

    categoriesCondition ? where.push(categoriesCondition) : null;
    gameModesCondition ? where.push(gameModesCondition) : null;
    themesCondition ? where.push(themesCondition) : null;
    genresCondition ? where.push(genresCondition) : null;
    tagsCondition ? where.push(tagsCondition) : null;

    const sortDetails = SortDetailsFactory.create(
      parsedSearchParams.data.sortBy
    );

    where.push(sortDetails.whereCondition);

    queryString = buildQueryString(pathName, sortDetails, parsedSearchParams);
    result = {
      ...result,
      where,
      sortBy: parsedSearchParams.data.sortBy,
      sort: {
        field: sortDetails.sortBy,
        order: parsedSearchParams.data.sortDir
          ? parsedSearchParams.data.sortDir
          : sortDetails.sortDir,
      },
      categories: parsedSearchParams.data.categories,
      gameModes: parsedSearchParams.data.gameModes,
      genres: parsedSearchParams.data.genres,
      tags: parsedSearchParams.data.tags,
      themes: parsedSearchParams.data.themes,
    };
  }

  return { queryParams: result, queryString };
}

function getWhereCondition(
  condition: string,
  targetValues: string | string[] | undefined,
  valueConverter: { [key: string]: number } | undefined
) {
  if (typeof targetValues === "string") {
    if (valueConverter) {
      return `${condition} = ${valueConverter[targetValues]}`;
    }
    return `${condition} = ${targetValues}`;
  } else if (Array.isArray(targetValues)) {
    if (valueConverter) {
      const values: (string | number)[] = [];
      targetValues.forEach((value) => values.push(valueConverter[value]));
      return `${condition} = (${values.join()})`;
    }
    return `${condition} = (${targetValues.join()})`;
  }
}

function buildQueryString(
  pathName: string,
  sortByDetails: SortDetails,
  parsedSearchParams?: z.SafeParseSuccess<SearchParamsBrowseSchema>
): string {
  if (!parsedSearchParams) {
    //default qs
    return `${pathName}?sortBy=${sortByDetails.sortBy}sortDir=${sortByDetails.sortDir}`;
  }

  const categories = getQueryStringSegment(
    "categories",
    parsedSearchParams.data.categories,
    convertedCategoryKeys
  );
  const tags = getQueryStringSegment("tags", parsedSearchParams.data.tags);
  const themes = getQueryStringSegment(
    "themes",
    parsedSearchParams.data.themes
  );
  const gameModes = getQueryStringSegment(
    "gameModes",
    parsedSearchParams.data.gameModes
  );
  const genres = getQueryStringSegment(
    "genres",
    parsedSearchParams.data.genres
  );

  return `${pathName}?sortBy=${parsedSearchParams.data.sortBy}&sortDir=${
    parsedSearchParams.data.sortDir
      ? parsedSearchParams.data.sortDir
      : sortByDetails.sortDir
  }${categories}${gameModes}${themes}${genres}${tags}`;
}

function getQueryStringSegment(
  segmentName: string,
  segmentValues: string | string[] | undefined,
  segmentValuesConverter?: { [key: string]: string | number }
): string {
  let queryString = "";
  if (Array.isArray(segmentValues)) {
    queryString = `&${segmentName}=`;

    segmentValues.forEach((segment, index) => {
      if (segmentValuesConverter) {
        if (index === segmentValues.length - 1) {
          queryString += `${segmentValuesConverter[segment]}`;
        } else {
          queryString += `${segmentValuesConverter[segment]}&${segmentName}=`;
        }
      } else {
        if (index === segmentValues.length - 1) {
          queryString += `${segment}`;
        } else {
          queryString += `${segment}&${segmentName}=`;
        }
      }
    });

    return queryString;
  } else if (typeof segmentValues === "string") {
    if (segmentValuesConverter) {
      return `&${segmentName}=${segmentValuesConverter[segmentValues]}`;
    }
    return `&${segmentName}=${segmentValues}`;
  } else {
    return queryString;
  }
}
