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

export enum convertedSortByKeys {
  "newReleases" = "New Releases",
  "topRated" = "Top Rated",
  "upcomingReleases" = "Upcoming Releases",
}

export enum convertedGameModeKeys {
  "singlePlayer" = 1,
  "multiplayer" = 2,
  "co-operative" = 3,
  "split-screen" = 4,
  "MMO" = 5,
  "battleRoyale" = 6,
}

export enum convertedCategoryKeys {
  "mainGame" = 0,
  "dlcAddon" = 1,
  "remaster" = 9,
  "remake" = 8,
  "bundle" = 3,
  "season" = 7,
}

const gameModes = [
  "singlePlayer",
  "multiplayer",
  "co-operative",
  "split-screen",
  "MMO",
  "battleRoyale",
] as const;

const categories = [
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
    genres: z.string().or(z.array(z.string()).min(2)).optional(),
    themes: z.string().or(z.array(z.string()).min(2)).optional(),
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
    where: [defaultSortDetails.whereCondition],
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
      undefined
    );
    const genresCondition = getWhereCondition(
      "genres.id",
      parsedSearchParams.data.genres,
      undefined
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
    };
  }

  return { queryParams: result, queryString };
}

function getWhereCondition(
  condition: string,
  targetValues: string | string[] | undefined,
  valueConverter: { [key: string]: number | string } | undefined
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
