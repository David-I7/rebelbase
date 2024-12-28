import { z } from "zod";
import {
  categories,
  convertedCategoryKeys,
  convertedGameModeKeys,
  convertedGenresKeys,
  convertedPlatformsKeys,
  convertedThemesKeys,
  gameModes,
  genres,
  platforms,
  sortBy,
  themes,
} from "../../data/constants/filterEnums";

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
        return new SortDetails("rating", "desc", `rating_count != null`);
      }
    }
  }
}

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
    keyword: z
      .string()
      .regex(new RegExp(/^(?!.*("|')).+$/, "s"))
      .optional(),
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
    page: z.coerce.number().min(1).int().optional().default(1),
    platform: z.enum(platforms).optional(),
  })
  .passthrough();

type SearchParamsBrowseSchema = z.infer<typeof searchParamsBrowseSchema>;

export type SearchParamsBrowse = {
  where: string[];
  sort: { field: string; order: "asc" | "desc" };
  page: number;
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
  keyword: string | undefined;
  platform: string | undefined;
};

export function extractFields(
  searchParams: {
    [key: string]: string | string[] | undefined;
  },
  pathName = "/"
): { queryParams: SearchParamsBrowse; queryString: string } {
  const defaultSortDetails = SortDetailsFactory.create("newReleases");

  let queryString = buildUIQueryString(pathName, defaultSortDetails);
  let result: SearchParamsBrowse = {
    page: 1,
    sort: {
      field: defaultSortDetails.sortBy,
      order: defaultSortDetails.sortDir,
    },
    sortBy: "newReleases",
    sortDir: defaultSortDetails.sortDir,
    where: [defaultSortDetails.whereCondition],
    categories: undefined,
    keyword: undefined,
    themes: undefined,
    genres: undefined,
    gameModes: undefined,
    platform: undefined,
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
      "game_modes",
      parsedSearchParams.data.gameModes,
      convertedGameModeKeys
    );
    const keywordCondition = parsedSearchParams.data.keyword
      ? `keywords.name ~ *"${parsedSearchParams.data.keyword}"*`
      : "";
    const themesCondition = getWhereCondition(
      "themes",
      parsedSearchParams.data.themes,
      convertedThemesKeys
    );
    const genresCondition = getWhereCondition(
      "genres",
      parsedSearchParams.data.genres,
      convertedGenresKeys
    );
    const platformCondition = getWhereCondition(
      "release_dates.platform",
      parsedSearchParams.data.platform,
      convertedPlatformsKeys
    );

    categoriesCondition ? where.push(categoriesCondition) : null;
    gameModesCondition ? where.push(gameModesCondition) : null;
    themesCondition ? where.push(themesCondition) : null;
    genresCondition ? where.push(genresCondition) : null;
    keywordCondition ? where.push(keywordCondition) : null;
    platformCondition ? where.push(platformCondition) : null;

    const sortDetails = SortDetailsFactory.create(
      parsedSearchParams.data.sortBy
    );

    where.push(sortDetails.whereCondition);

    queryString = buildUIQueryString(pathName, sortDetails, parsedSearchParams);
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
      keyword: parsedSearchParams.data.keyword,
      themes: parsedSearchParams.data.themes,
      page: parsedSearchParams.data.page,
      platform: parsedSearchParams.data.platform,
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

function buildUIQueryString(
  pathName: string,
  sortByDetails: SortDetails,
  parsedSearchParams?: z.SafeParseSuccess<SearchParamsBrowseSchema>
): string {
  if (!parsedSearchParams) {
    //default qs
    return `${pathName}?sortBy=${sortByDetails.sortBy}&sortDir=${sortByDetails.sortDir}`;
  }

  const categories = getQueryStringSegment(
    "categories",
    parsedSearchParams.data.categories,
    convertedCategoryKeys
  );
  const keyword = getQueryStringSegment(
    "keyword",
    parsedSearchParams.data.keyword
  );
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
  }${keyword}${categories}${gameModes}${themes}${genres}`;
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
