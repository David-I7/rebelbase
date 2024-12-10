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

class SortDetailsFactory {
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
    category: z.enum(categories).optional(),
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

export function extractFields(searchParams: {
  [key: string]: string | string[] | undefined;
}): { queryParams: SearchParamsBrowse; queryString: string } {
  const defaultSortDetails = SortDetailsFactory.create("newReleases");

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
      parsedSearchParams.data.category,
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
    console.log(result);
  }

  return { queryParams: result, queryString: "" };
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
  parsedSearchParams?: SearchParamsBrowseSchema
): string {
  if (!parsedSearchParams) {
    //default qs
    return `${pathName}?sortBy=${sortByDetails.sortBy}sortDir=${sortByDetails.sortDir}`;
  }

  const category = parsedSearchParams.category
    ? `category=${parsedSearchParams.category}`
    : "";
  const tags = parsedSearchParams.tags ? `` : "";
  const themes = parsedSearchParams.themes ? `` : "";
  const gameModes = parsedSearchParams.gameModes ? `` : "";
  const genres = parsedSearchParams.genres ? `` : "";

  return `${pathName}?sortBy=${parsedSearchParams.sortBy}&sortDir=${
    parsedSearchParams.sortDir
      ? parsedSearchParams.sortDir
      : sortByDetails.sortDir
  }&`;
}
