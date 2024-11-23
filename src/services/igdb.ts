//There is a rate limit of 4 requests per second.
const DEFAULT_SECTION_RESULTS = 15;

import { getOrSetToCacheDynamicExpiration } from "@/lib/redis/controllers";
("@/lib/redis/controllers");
import { getIGDBAccessToken } from "./twitch";
import CACHE_KEYS from "@/data/constants/cacheKeys";
import { IGDBRequestOptions } from "@/data/config/requestOptions";
import { IGDB_BASE_URL } from "@/data/baseUrls";
import ErrorFactory from "@/lib/errors/errorFactory";
import type {
  CasualGames,
  HomeSections,
  MostAnticipated,
  OfflineAndOnlineGames,
  Popularity_Source_Response,
  TopNewReleases,
  TopRated,
  UpcomingReleases,
} from "../interfaces/igdb";

export type HomeMultiqueryDataResponse = [
  { name: HomeSections.topNewReleases; result: TopNewReleases },
  { name: HomeSections.mostAnticipated; result: MostAnticipated },
  { name: HomeSections.topRated; result: TopRated },
  { name: HomeSections.offlineAndOnlineGames; result: OfflineAndOnlineGames },
  { name: HomeSections.casualGames; result: CasualGames },
  { name: HomeSections.upcomingReleases; result: UpcomingReleases }
];

export type HomeMultiqueryPopularityResponse = [
  { name: HomeSections.topNewReleases; result: Popularity_Source_Response },
  { name: HomeSections.mostAnticipated; result: Popularity_Source_Response },
  { name: HomeSections.topRated; result: Popularity_Source_Response },
  {
    name: HomeSections.offlineAndOnlineGames;
    result: Popularity_Source_Response;
  },
  { name: HomeSections.casualGames; result: Popularity_Source_Response },
  { name: HomeSections.upcomingReleases; result: Popularity_Source_Response }
];
export async function getHomeData() {
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

  query games "offlineAndOnlineGames" {
 fields cover.image_id,rating,name,genres.name,themes.name,game_modes.name,first_release_date;
 where genres.id =(36,5,10,14,12,4) & category = 0 & cover.image_id !=null & videos.video_id !=null & rating > 50 & rating_count > 20 & first_release_date > ${fourYearsAgo} & first_release_date <= ${now} & game_modes.id != null;
 sort rating desc;
 limit 100;
  };

  query games "casualGames" {
fields cover.image_id,rating,name,genres.name,themes.name,game_modes.name,first_release_date;
where keywords.id = 101 & cover.image_id !=null & genres.id = (9,15,26,31)  & first_release_date > ${fourYearsAgo} & first_release_date <= ${now} ;
sort first_release_date desc; 
 limit 100;
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
    const offlineAndOnlineGamesIds: number[] = [];
    const upcomingReleasesIds: number[] = [];

    for (let i = 0; i < 100; i++) {
      if (dataResponse[0].result[i])
        topNewReleasesIds.push(dataResponse[0].result[i].id);
      if (dataResponse[1].result[i])
        mostAnticipatedIds.push(dataResponse[1].result[i].id);
      if (dataResponse[2].result[i])
        topRatedIds.push(dataResponse[2].result[i].id);
      if (dataResponse[3].result[i])
        offlineAndOnlineGamesIds.push(dataResponse[3].result[i].id);
      if (dataResponse[5].result[i])
        upcomingReleasesIds.push(dataResponse[5].result[i].id);
    }

    const popularityMultiquery = `
    query popularity_primitives "topNewReleases" {
    fields game_id, value;
    where popularity_type = 1 & game_id = (${topNewReleasesIds.join()});
    sort value desc;
    limit ${DEFAULT_SECTION_RESULTS}; 
    };
  
    query popularity_primitives "mostAnticipated" {
   fields game_id, value;
   where popularity_type = 2 & game_id = (${mostAnticipatedIds.join()});
   limit ${DEFAULT_SECTION_RESULTS}; 
    };
  
    query popularity_primitives "topRated" {
   fields game_id, value; 
   where popularity_type = 4 & game_id = (${topRatedIds.join()});
   sort value desc;
   limit ${DEFAULT_SECTION_RESULTS};
    };
  
    query popularity_primitives "offlineAndOnlineGames" {
  fields game_id, value; 
  where popularity_type = 3 & game_id = (${offlineAndOnlineGamesIds.join()});
  sort value desc;
  limit 100;
    };
  
    query popularity_primitives "upcomingReleases" {
  fields game_id,value;
  where popularity_type = 2 & game_id = (${upcomingReleasesIds.join()});
  sort value desc;
  limit ${DEFAULT_SECTION_RESULTS};
    };
    `;

    console.log(popularityMultiquery);

    const popularityResponse: Popularity_Source_Response = await fetch(
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

    return { data: popularityResponse, error: undefined };
  } catch (err) {
    return { data: undefined, error: err as Error };
  }
}

export async function getTopNewReleases() {
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

  try {
    const response = await fetch(IGDB_BASE_URL + "/games", {
      ...IGDBRequestOptions,
      headers: {
        ...IGDBRequestOptions.headers,
        Authorization: `bearer ${twitchAccessToken!.access_token}`,
      },
      body: ``,
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

    console.log(response);
    const objectIds: number[] = [];

    let data = response as [{ id: number }];

    data.map((game) => objectIds.push(game.id));

    const response2 = await fetch(IGDB_BASE_URL + "/popularity_primitives", {
      ...IGDBRequestOptions,
      headers: {
        ...IGDBRequestOptions.headers,
        Authorization: `bearer ${twitchAccessToken!.access_token}`,
      },
      body: ``,
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

    return { data: response2, error: undefined };
  } catch (err) {
    return { data: undefined, error: err };
  }
}
export async function getMostAnticipated() {
  const { data: twitchAccessToken, error: err } =
    await getOrSetToCacheDynamicExpiration(
      CACHE_KEYS.twitchAccessToken,
      getIGDBAccessToken
    );

  if (err) return { data: undefined, error: err };

  const twoYears = Math.floor(
    new Date(new Date().setFullYear(new Date().getFullYear() + 2)).getTime() /
      1000
  );
  const now = Math.floor(new Date().getTime() / 1000);

  try {
    const response = await fetch(IGDB_BASE_URL + "/games", {
      ...IGDBRequestOptions,
      headers: {
        ...IGDBRequestOptions.headers,
        Authorization: `bearer ${twitchAccessToken!.access_token}`,
      },
      body: ``,
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

    const objectIds: number[] = [];

    let data = response as [{ id: number }];

    data.map((game) => objectIds.push(game.id));

    const response2 = await fetch(IGDB_BASE_URL + "/popularity_primitives", {
      ...IGDBRequestOptions,
      headers: {
        ...IGDBRequestOptions.headers,
        Authorization: `bearer ${twitchAccessToken!.access_token}`,
      },
      body: ``,
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

    return { data: response2, error: undefined };
  } catch (err) {
    return { data: undefined, error: err };
  }
}
//can this be fetched at build time?
export async function getTopRated() {
  const { data: twitchAccessToken, error: err } =
    await getOrSetToCacheDynamicExpiration(
      CACHE_KEYS.twitchAccessToken,
      getIGDBAccessToken
    );

  if (err) return { data: undefined, error: err };

  try {
    const response = await fetch(IGDB_BASE_URL + "/games", {
      ...IGDBRequestOptions,
      headers: {
        ...IGDBRequestOptions.headers,
        Authorization: `bearer ${twitchAccessToken!.access_token}`,
      },
      body: ``,
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

    const objectIds: number[] = [];

    let data = response as [{ id: number }];

    data.map((game) => objectIds.push(game.id));

    const response2 = await fetch(IGDB_BASE_URL + "/popularity_primitives", {
      ...IGDBRequestOptions,
      headers: {
        ...IGDBRequestOptions.headers,
        Authorization: `bearer ${twitchAccessToken!.access_token}`,
      },
      body: ``,
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

    return { data: response2, error: undefined };
  } catch (err) {
    return { data: undefined, error: err };
  }
}

//can this be fetched at build time?
// can we make 1 metch request then I can filter the results myself
export async function getOnlineAndOfflineGames() {
  const { data: twitchAccessToken, error: err } =
    await getOrSetToCacheDynamicExpiration(
      CACHE_KEYS.twitchAccessToken,
      getIGDBAccessToken
    );

  if (err) return { data: undefined, error: err };

  const now = Math.floor(new Date().getTime() / 1000);
  const fourYears = Math.floor(
    new Date(new Date().setFullYear(new Date().getFullYear() - 4)).getTime() /
      1000
  );

  try {
    const response = await fetch(IGDB_BASE_URL + "/games", {
      ...IGDBRequestOptions,
      headers: {
        ...IGDBRequestOptions.headers,
        Authorization: `bearer ${twitchAccessToken!.access_token}`,
      },
      body: ``,
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

    console.log(response);
    const objectIds: number[] = [];
    const responseMap: Map<number, { [index: string]: any }> = new Map();

    let data = response as [{ id: number }];

    data.map((game) => {
      objectIds.push(game.id);
      responseMap.set(game.id, { ...game });
    });

    const response2 = await fetch(IGDB_BASE_URL + "/popularity_primitives", {
      ...IGDBRequestOptions,
      headers: {
        ...IGDBRequestOptions.headers,
        Authorization: `bearer ${twitchAccessToken!.access_token}`,
      },
      body: ``,
    }).then(async (res) => {
      if (res.status >= 400) {
        throw ErrorFactory.createFetchError(
          res.status,
          res.statusText,
          JSON.stringify(await res.json())
        );
      }

      return (await res.json()) as { game_id: number }[];
    });

    let onlineGames: { [index: string]: string }[] = [];
    let offlinesGames: { [index: string]: string }[] = [];

    for (let i = 0; i < response2.length; i++) {
      const unCategorizedGame = responseMap.get(response2[i].game_id)!;

      if (
        !unCategorizedGame["game_modes"] ||
        !unCategorizedGame["game_modes"].length
      )
        continue;

      if (
        unCategorizedGame["game_modes"][0].id === 1 &&
        offlinesGames.length < 10
      ) {
        offlinesGames.push(unCategorizedGame);
      } else if (
        unCategorizedGame["game_modes"][0].id === 2 &&
        onlineGames.length < 10
      ) {
        onlineGames.push(unCategorizedGame);
      } else if (
        unCategorizedGame["game_modes"][0].id === 1 &&
        unCategorizedGame["game_modes"][1]?.id === 2 &&
        onlineGames.length < 10
      ) {
        onlineGames.push(unCategorizedGame);
      }

      if (onlineGames.length === 10 && offlinesGames.length === 10) break;
    }

    return { data: { onlineGames, offlinesGames }, error: undefined };
  } catch (err) {
    return { data: undefined, error: err };
  }
}
//can this be fetched at build time?
export async function getCasualGames() {
  const { data: twitchAccessToken, error: err } =
    await getOrSetToCacheDynamicExpiration(
      CACHE_KEYS.twitchAccessToken,
      getIGDBAccessToken
    );

  if (err) return { data: undefined, error: err };

  const now = Math.floor(new Date().getTime() / 1000);
  const fourYears = Math.floor(
    new Date(new Date().setFullYear(new Date().getFullYear() - 5)).getTime() /
      1000
  );

  try {
    const response = await fetch(IGDB_BASE_URL + "/games", {
      ...IGDBRequestOptions,
      headers: {
        ...IGDBRequestOptions.headers,
        Authorization: `bearer ${twitchAccessToken!.access_token}`,
      },
      body: ``,
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

    return { data: response, error: undefined };
  } catch (err) {
    return { data: undefined, error: err };
  }
}
export async function testQuery() {
  const { data: twitchAccessToken, error: err } =
    await getOrSetToCacheDynamicExpiration(
      CACHE_KEYS.twitchAccessToken,
      getIGDBAccessToken
    );

  if (err) return { data: undefined, error: err };
  console.log(twitchAccessToken);
  try {
    const response = await fetch(IGDB_BASE_URL + "/keywords", {
      ...IGDBRequestOptions,
      headers: {
        ...IGDBRequestOptions.headers,
        Authorization: `bearer ${twitchAccessToken!.access_token}`,
      },
      body: `fields name;  limit 100;`,
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

    return { data: response, error: undefined };
  } catch (err) {
    return { data: undefined, error: err };
  }
}

export async function getUpcomingReleases() {
  const { data: twitchAccessToken, error: err } =
    await getOrSetToCacheDynamicExpiration(
      CACHE_KEYS.twitchAccessToken,
      getIGDBAccessToken
    );

  if (err) return { data: undefined, error: err };

  const now = Math.floor(new Date().getTime() / 1000);
  const unix3MonthsForward = Math.floor(
    new Date(new Date().setMonth(new Date().getMonth() + 3)).getTime() / 1000
  );

  try {
    const response = await fetch(IGDB_BASE_URL + "/games", {
      ...IGDBRequestOptions,
      headers: {
        ...IGDBRequestOptions.headers,
        Authorization: `bearer ${twitchAccessToken!.access_token}`,
      },
      body: ``,
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

    const objectIds: number[] = [];

    let data = response as [{ id: number }];

    data.map((game) => objectIds.push(game.id));

    const response2 = await fetch(IGDB_BASE_URL + "/popularity_primitives", {
      ...IGDBRequestOptions,
      headers: {
        ...IGDBRequestOptions.headers,
        Authorization: `bearer ${twitchAccessToken!.access_token}`,
      },
      body: ``,
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

    return { data: response2, error: undefined };
  } catch (err) {
    return { data: undefined, error: err };
  }
}

export async function getGameById(id: number) {
  // Need to also fetch games from campany with developer = true
  const { data: twitchAccessToken, error: err } =
    await getOrSetToCacheDynamicExpiration(
      CACHE_KEYS.twitchAccessToken,
      getIGDBAccessToken
    );

  if (err) return { data: undefined, error: err };

  try {
    const response = await fetch(IGDB_BASE_URL + "/games", {
      ...IGDBRequestOptions,
      headers: {
        ...IGDBRequestOptions.headers,
        Authorization: `bearer ${twitchAccessToken!.access_token}`,
      },
      body: `fields cover.image_id,rating,name,first_release_date,videos.video_id,videos.name ,genres.name,themes.name,keywords.name,game_modes.name,platforms.name,player_perspectives.name,age_ratings.category,age_ratings.rating,age_ratings.rating_cover_url,release_dates.date,release_dates.platform.name,language_supports.language.name,language_supports.language.locale,language_supports.language_support_type.name,websites.category,websites.url,summary,storyline,involved_companies.company.name,involved_companies.developer,similar_games.name,similar_games.rating,similar_games.genres.name,similar_games.themes.name,similar_games.cover.image_id,artworks.image_id,screenshots.image_id;where id = ${id}; limit 1;`,
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

    return { data: response, error: undefined };
  } catch (err) {
    return { data: undefined, error: err };
  }
}
export async function getMoreFromCompany(companyId: number) {
  const { data: twitchAccessToken, error: err } =
    await getOrSetToCacheDynamicExpiration(
      CACHE_KEYS.twitchAccessToken,
      getIGDBAccessToken
    );

  if (err) return { data: undefined, error: err };

  try {
    const response = await fetch(IGDB_BASE_URL + "/games", {
      ...IGDBRequestOptions,
      headers: {
        ...IGDBRequestOptions.headers,
        Authorization: `bearer ${twitchAccessToken!.access_token}`,
      },
      body: `fields cover.image_id,rating,name,genres.name,themes.name,involved_companies.company.name;where involved_companies.company = ${companyId};sort rating_count desc; limit 25;`,
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

    return { data: response, error: undefined };
  } catch (err) {
    return { data: undefined, error: err };
  }
}
