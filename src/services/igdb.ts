//There is a rate limit of 4 requests per second.
const DEFAULT_SECTION_RESULTS = 15;
const DEFAULT_HERO_RESULTS = 8;

import { getOrSetToCacheDynamicExpiration } from "@/lib/redis/controllers";
("@/lib/redis/controllers");
import { getIGDBAccessToken } from "./twitch";
import CACHE_KEYS from "@/data/constants/cacheKeys";
import { IGDBRequestOptions } from "@/data/config/requestOptions";
import { IGDB_BASE_URL } from "@/data/baseUrls";
import ErrorFactory from "@/lib/errors/errorFactory";
import type {
  CasualGames,
  MostAnticipated,
  OfflineGames,
  OnlineGames,
  Popularity_Source_Response,
  TopNewReleases,
  TopRated,
  HomeSections,
  UpcomingReleases,
  CardData,
  GameModes,
  GameData,
  InvolvedCompanies,
} from "../interfaces/igdb";
import { SearchParamsBrowse } from "@/lib/validation/queryFieldsValidation";

export type HomeMultiqueryDataResponse = [
  { name: HomeSections.topNewReleases; result: TopNewReleases[] },
  { name: HomeSections.mostAnticipated; result: MostAnticipated[] },
  { name: HomeSections.topRated; result: TopRated[] },
  { name: HomeSections.offlineGames; result: OfflineGames[] },
  { name: HomeSections.onlineGames; result: OnlineGames[] },
  { name: HomeSections.casualGames; result: CasualGames[] },
  { name: HomeSections.upcomingReleases; result: UpcomingReleases[] }
];
export type HomeDataResponse = {
  topNewReleases: { result: TopNewReleases[] };
  mostAnticipated: { result: MostAnticipated[] };
  topRated: { result: TopRated[] };
  offlineGames: { result: OfflineGames[] };
  onineGames: { result: OnlineGames[] };
  casualGames: { result: CasualGames[] };
  upcomingReleases: { result: UpcomingReleases[] };
};

export type HomeMultiqueryPopularityResponse = [
  { name: HomeSections.topNewReleases; result: Popularity_Source_Response[] },
  { name: HomeSections.mostAnticipated; result: Popularity_Source_Response[] },
  { name: HomeSections.topRated; result: Popularity_Source_Response[] },
  { name: HomeSections.upcomingReleases; result: Popularity_Source_Response[] }
];
export async function getHomeData(): Promise<
  DataOrError<HomeDataResponse, Error>
> {
  const { data: twitchAccessToken, error: err } =
    await getOrSetToCacheDynamicExpiration(
      CACHE_KEYS.twitchAccessToken,
      getIGDBAccessToken
    );

  if (err) return { data: undefined, error: err };

  const now = Math.floor(new Date().getTime() / 1000);
  const unix6MonthsAgo = Math.floor(
    new Date(new Date().setMonth(new Date().getMonth() - 6)).getTime() / 1000
  );
  const twoYearsForward = Math.floor(
    new Date(new Date().setFullYear(new Date().getFullYear() + 2)).getTime() /
      1000
  );
  const fourYearsAgo = Math.floor(
    new Date(new Date().setFullYear(new Date().getFullYear() - 4)).getTime() /
      1000
  );
  const unix3MonthsForward = Math.floor(
    new Date(new Date().setMonth(new Date().getMonth() + 3)).getTime() / 1000
  );

  const dataMultiquery = `
  query games "topNewReleases" {
  fields name,rating,first_release_date, genres.name,themes.name,cover.image_id;
  where rating > 50 & rating_count > 10 & first_release_date > ${unix6MonthsAgo} & first_release_date <= ${now} & category = 0;
  sort rating_count desc; 
  limit 50;
  };

  query games "mostAnticipated" {
  fields name,rating,first_release_date,genres.name,themes.name,cover.image_id; 
  where first_release_date > ${now} & first_release_date <= ${twoYearsForward} & category = 0 & videos.video_id != null ;
  limit 100;
  };

  query games "topRated" {
 fields name,rating,first_release_date,genres.name,themes.name,cover.image_id;
 where rating > 70 & rating_count > 500 & category = 0;
 sort rating_count desc; 
 limit 50;
  };

  query games "onlineGames" {
 fields cover.image_id,rating,name,genres.name,themes.name,game_modes.name,first_release_date;
 where genres = (4,5,16,12,11,14,36) & category = 0 & cover.image_id !=null & videos.video_id !=null & rating_count > 10 & first_release_date > ${fourYearsAgo} & first_release_date <= ${now} & game_modes = (2,6);
 sort rating desc;
 limit ${DEFAULT_SECTION_RESULTS};
  };
  query games "offlineGames" {
 fields cover.image_id,rating,name,genres.name,themes.name,game_modes.name,first_release_date;
 where genres =(32,33,16,31,26,24,2) & category = 0 & cover.image_id !=null & videos.video_id !=null & rating > 60 & rating_count > 10 & first_release_date > ${fourYearsAgo} & first_release_date <= ${now} & game_modes.id = 1;
 sort first_release_date desc;
 limit ${DEFAULT_SECTION_RESULTS};
  };
  
  query games "casualGames" {
fields cover.image_id,rating,name,genres.name,themes.name,game_modes.name,first_release_date;
where cover.image_id !=null & genres = (9,15,26,35) & rating_count != null & first_release_date > ${fourYearsAgo} & first_release_date <= ${now} ;
sort firt_release_date desc; 
 limit ${DEFAULT_SECTION_RESULTS};
  };

  query games "upcomingReleases" {
fields name,rating,genres.name,themes.name,cover.image_id,first_release_date;
where first_release_date > ${now} & first_release_date <= ${unix3MonthsForward} & category = 0;
sort first_release_date desc;
limit 100;
  };
  `;

  try {
    const dataResponse: HomeMultiqueryDataResponse = await fetch(
      IGDB_BASE_URL + "/multiquery",
      {
        ...IGDBRequestOptions,
        headers: {
          ...IGDBRequestOptions.headers,
          Authorization: `bearer ${twitchAccessToken!.access_token}`,
        },
        body: dataMultiquery,
      }
    ).then(async (res) => {
      if (res.status >= 400) {
        throw ErrorFactory.createFetchError(
          res.status,
          res.statusText,
          JSON.stringify(await res.json())
        );
      }

      return await res.json();
    });

    const topNewReleasesIds: number[] = [];
    const mostAnticipatedIds: number[] = [];
    const topRatedIds: number[] = [];
    const upcomingReleasesIds: number[] = [];

    const topNewReleasesMap: Map<number, TopNewReleases> = new Map();
    const mostAnticipatedMap: Map<number, MostAnticipated> = new Map();
    const topRatedMap: Map<number, TopRated> = new Map();
    const upcomingReleasesMap: Map<number, UpcomingReleases> = new Map();
    for (let i = 0; i < 100; i++) {
      if (dataResponse[0].result[i]) {
        topNewReleasesIds.push(dataResponse[0].result[i].id);
        topNewReleasesMap.set(
          dataResponse[0].result[i].id,
          dataResponse[0].result[i]
        );
      }
      if (dataResponse[1].result[i]) {
        mostAnticipatedIds.push(dataResponse[1].result[i].id);
        mostAnticipatedMap.set(
          dataResponse[1].result[i].id,
          dataResponse[1].result[i]
        );
      }
      if (dataResponse[2].result[i]) {
        topRatedIds.push(dataResponse[2].result[i].id);
        topRatedMap.set(
          dataResponse[2].result[i].id,
          dataResponse[2].result[i]
        );
      }
      if (dataResponse[6].result[i]) {
        upcomingReleasesIds.push(dataResponse[6].result[i].id);
        upcomingReleasesMap.set(
          dataResponse[6].result[i].id,
          dataResponse[6].result[i]
        );
      }
    }

    const popularityMultiquery = `
    query popularity_primitives "topNewReleases" {
    fields game_id, value;
    where popularity_type = 1 & game_id = (${topNewReleasesIds.join()});
    sort value desc;
    limit ${DEFAULT_HERO_RESULTS}; 
    };
  
    query popularity_primitives "mostAnticipated" {
   fields game_id, value;
   where popularity_type = 2 & game_id = (${mostAnticipatedIds.join()});
   sort value desc;
   limit ${DEFAULT_SECTION_RESULTS}; 
    };
  
    query popularity_primitives "topRated" {
   fields game_id, value; 
   where popularity_type = 4 & game_id = (${topRatedIds.join()});
   sort value desc;
   limit ${DEFAULT_SECTION_RESULTS};
    };
  
    query popularity_primitives "upcomingReleases" {
  fields game_id,value;
  where popularity_type = 2 & game_id = (${upcomingReleasesIds.join()});
  sort value desc;
  limit ${DEFAULT_SECTION_RESULTS};
    };
    `;

    const popularityResponse: HomeMultiqueryPopularityResponse = await fetch(
      IGDB_BASE_URL + "/multiquery",
      {
        ...IGDBRequestOptions,
        headers: {
          ...IGDBRequestOptions.headers,
          Authorization: `bearer ${twitchAccessToken!.access_token}`,
        },
        body: popularityMultiquery,
      }
    ).then(async (res) => {
      if (res.status >= 400) {
        throw ErrorFactory.createFetchError(
          res.status,
          res.statusText,
          JSON.stringify(await res.json())
        );
      }

      return await res.json();
    });

    const topNewReleasesResult: TopNewReleases[] = [];
    const mostAnticipatedResult: MostAnticipated[] = [];
    const topRatedResult: TopRated[] = [];
    const offlineGames: OfflineGames[] = dataResponse[3].result;
    const onlineGames: OnlineGames[] = dataResponse[4].result;
    const casualGamesResult: CasualGames[] = dataResponse[5].result;
    const upcomingReleasesResult: UpcomingReleases[] = [];

    for (let i = 0; i < DEFAULT_SECTION_RESULTS; i++) {
      if (i < popularityResponse[0].result.length) {
        topNewReleasesResult.push(
          topNewReleasesMap.get(popularityResponse[0].result[i].game_id)!
        );
      }
      if (i < popularityResponse[1].result.length) {
        mostAnticipatedResult.push(
          mostAnticipatedMap.get(popularityResponse[1].result[i].game_id)!
        );
      }
      if (i < popularityResponse[2].result.length) {
        topRatedResult.push(
          topRatedMap.get(popularityResponse[2].result[i].game_id)!
        );
      }
      if (i < popularityResponse[3].result.length) {
        upcomingReleasesResult.push(
          upcomingReleasesMap.get(popularityResponse[3].result[i].game_id)!
        );
      }
    }

    const homeData: HomeDataResponse = {
      topNewReleases: { result: topNewReleasesResult },
      mostAnticipated: { result: mostAnticipatedResult },
      topRated: { result: topRatedResult },
      offlineGames: { result: offlineGames },
      onineGames: { result: onlineGames },
      casualGames: { result: casualGamesResult },
      upcomingReleases: {
        result: upcomingReleasesResult.sort(
          (a, b) => a.first_release_date! - b.first_release_date!
        ),
      },
    };

    return { data: homeData, error: undefined };
  } catch (err) {
    return { data: undefined, error: err as Error };
  }
}

//When something is missing from the response it won't be there at all, so access using bracket notation to prevent errors
type GameDataResponse = {
  result: GameData;
  accessToken: string;
};

export async function getGameById(
  id: number
): Promise<DataOrError<GameDataResponse, Error>> {
  const { data: twitchAccessToken, error: err } =
    await getOrSetToCacheDynamicExpiration(
      CACHE_KEYS.twitchAccessToken,
      getIGDBAccessToken
    );

  if (err) return { data: undefined, error: err };

  try {
    const gameData: GameData = await fetch(IGDB_BASE_URL + "/games", {
      ...IGDBRequestOptions,
      headers: {
        ...IGDBRequestOptions.headers,
        Authorization: `bearer ${twitchAccessToken!.access_token}`,
      },
      body: `fields cover.image_id,rating,name,first_release_date,videos.video_id,videos.name,genres.name,themes.name,keywords.name,game_modes.name,platforms.name,
      player_perspectives.name,age_ratings.category,age_ratings.rating,
      release_dates.date,release_dates.platform.name,release_dates.status.name,
      language_supports.language.name,language_supports.language.locale,language_supports.language_support_type.name,
      websites.category,websites.url,
      summary,storyline,
      involved_companies.company.name,involved_companies.developer,
      similar_games.name,similar_games.rating,similar_games.genres.name,similar_games.themes.name,similar_games.cover.image_id,
      artworks.image_id,screenshots.image_id;
      where id = ${id}; limit 1;`,
    }).then(async (res) => {
      if (res.status >= 400) {
        throw ErrorFactory.createFetchError(
          res.status,
          res.statusText,
          JSON.stringify(await res.json())
        );
      }

      return await res.json();
    });

    return {
      data: { result: gameData, accessToken: twitchAccessToken!.access_token! },
      error: undefined,
    };
  } catch (err) {
    return { data: undefined, error: err as Error };
  }
}

export async function getMoreFromCompany(
  developerCompanyId: number,
  accessToken: string,
  involvedCompanies?: InvolvedCompanies
): Promise<DataOrError<CardData[], Error>> {
  if (!involvedCompanies || !involvedCompanies.length)
    return {
      data: undefined,
      error: ErrorFactory.createInvalidArgumentsError(
        "Involved companies is undefined"
      ),
    };

  if (!accessToken)
    return {
      data: undefined,
      error: ErrorFactory.createInvalidArgumentsError(
        "Missing twitch access token"
      ),
    };

  try {
    const moreGamesFromCompanyRes: CardData[] = await fetch(
      IGDB_BASE_URL + "/games",
      {
        ...IGDBRequestOptions,
        headers: {
          ...IGDBRequestOptions.headers,
          Authorization: `bearer ${accessToken}`,
        },
        body: `fields cover.image_id,rating,name,genres.name,themes.name,involved_companies.company.name;where involved_companies.company = ${developerCompanyId};sort rating_count desc; limit ${DEFAULT_SECTION_RESULTS};`,
      }
    ).then(async (res) => {
      if (res.status >= 400) {
        throw ErrorFactory.createFetchError(
          res.status,
          res.statusText,
          JSON.stringify(await res.json())
        );
      }

      return await res.json();
    });

    return {
      data: moreGamesFromCompanyRes,
      error: undefined,
    };
  } catch (err) {
    return { data: undefined, error: err as Error };
  }
}

const DEFAULT_FILTER_LIMIT = 40;

class QueryBuilder {
  private _fields = "";
  private _where = "";
  private _sort = "";
  private _limit = "";
  private _offset = "";
  private endpoint!: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  fields(fields: string | string[]): QueryBuilder {
    if (Array.isArray(fields)) {
      this._fields = `fields ${fields.join()};`;
      return this;
    }

    this._fields = `fields ${fields};`;

    return this;
  }

  where(conditions: string | string[]): QueryBuilder {
    if (Array.isArray(conditions)) {
      if (!conditions.length) return this;
      this._where = `where`;

      conditions.map((condition, index) => {
        if (index === conditions.length - 1) {
          this._where += ` ${condition};`;
        } else {
          this._where += ` ${condition} &`;
        }
      });
      return this;
    }

    this._where += `where ${conditions};`;

    return this;
  }

  sort(field: string, order: "asc" | "desc"): QueryBuilder {
    this._sort = `sort ${field} ${order};`;
    return this;
  }

  paginate(page: number): QueryBuilder {
    this._limit = `limit ${DEFAULT_FILTER_LIMIT};`;
    this._offset = `offset ${
      page * DEFAULT_FILTER_LIMIT - DEFAULT_FILTER_LIMIT
    };`;
    return this;
  }

  limit(limit: number): QueryBuilder {
    this._limit = `limit ${limit};`;
    return this;
  }
  offset(offset: number): QueryBuilder {
    this._offset = `offset ${offset};`;
    return this;
  }

  buildQuery(): { url: string; query: string } {
    return {
      url: `${IGDB_BASE_URL}${this.endpoint}`,
      query: `${this._fields}${this._where}${this._sort}${this._limit}${this._offset}`,
    };
  }
}

export async function getQueryData(
  queryData: SearchParamsBrowse
): Promise<DataOrError<CardData[], Error>> {
  const queryBuilder = new QueryBuilder("/games")
    .fields([
      "name",
      "rating",
      "first_release_date",
      "genres.name",
      "themes.name",
      "cover.image_id",
    ])
    .where(queryData.where)
    .sort(queryData.sort.field, queryData.sort.order)
    .paginate(queryData.page);

  const browseQuery = queryBuilder.buildQuery();

  console.log(browseQuery);

  const { data: twitchAccessToken, error: err } =
    await getOrSetToCacheDynamicExpiration(
      CACHE_KEYS.twitchAccessToken,
      getIGDBAccessToken
    );

  if (err) return { data: undefined, error: err };

  try {
    const browseQueryData: CardData[] = await fetch(browseQuery.url, {
      ...IGDBRequestOptions,
      headers: {
        ...IGDBRequestOptions.headers,
        Authorization: `bearer ${twitchAccessToken!.access_token}`,
      },
      body: browseQuery.query,
    }).then(async (res) => {
      if (res.status >= 400) {
        throw ErrorFactory.createFetchError(
          res.status,
          res.statusText,
          JSON.stringify(await res.json())
        );
      }

      return await res.json();
    });

    return {
      data: browseQueryData,
      error: undefined,
    };
  } catch (err) {
    console.log((err as Error).cause);
    return { data: undefined, error: err as Error };
  }
}
