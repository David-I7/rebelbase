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
          `first_release_date <= ${now}`
        );
      }
      case "upcomingReleases": {
        const now = Math.floor(new Date().getTime() / 1000);

        return new SortDetails(
          "first_release_date",
          "asc",
          `first_release_date > ${now}`
        );
      }
      case "topRated": {
        return new SortDetails(
          "rating_count",
          "desc",
          `rating > 70 & rating_count > 500`
        );
      }
    }
  }
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

const sortBy = ["newReleases", "upcomingReleases", "topRated"] as const;

const searchParamsBrowseSchema = z
  .object({
    sortBy: z.enum(sortBy).default("newReleases"),
    sortDir: z.enum(["asc", "desc"]).optional().default("asc"),
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
      .default(categories[0]),
    limit: z.coerce.number().min(1).int().optional().default(40),
    offset: z.coerce.number().min(0).int().optional().default(0),
  })
  .passthrough();

export type SearchParamsBrowse = z.infer<typeof searchParamsBrowseSchema> & {
  where: string[];
};

const DEFAULT_FILTER_LIMIT = 40;
const DEFAULT_FILTER_OFFSET = 0;

export function extractFields(searchParams: {
  [key: string]: string | string[] | undefined;
}): SearchParamsBrowse {
  let result: SearchParamsBrowse = {
    limit: DEFAULT_FILTER_LIMIT,
    offset: DEFAULT_FILTER_OFFSET,
    sortBy: "newReleases",
    sortDir: "desc",
    where: [],
    categories: "mainGame",
  };

  const parsedSearchParams = searchParamsBrowseSchema.safeParse(searchParams);

  if (parsedSearchParams.success) {
    const where: string[] = [];
    const categoriesCondition = getWhereCondition(
      "category.id",
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

    result = { ...parsedSearchParams.data, where };
  }

  return result;
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
