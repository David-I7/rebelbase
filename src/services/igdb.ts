//There is a rate limit of 4 requests per second.

import { getOrSetToCacheDynamicExpiration } from "@/lib/redis/controllers";
("@/lib/redis/controllers");
import { getIGDBAccessToken } from "./twitch";
import CACHE_KEYS from "@/data/constants/cacheKeys";
import { IGDBRequestOptions } from "@/data/config/requestOptions";
import { IGDB_BASE_URL } from "@/data/baseUrls";
import ErrorFactory from "@/lib/errors/errorFactory";

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
      body: `fields name, rating, genres.name,themes.name,cover.image_id; where rating > 50 & first_release_date > ${unix6MonthsAgo} & first_release_date <= ${now} & category = 0; limit 50;`,
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
      body: `fields game_id, value;sort value desc; where popularity_type = 1 & game_id = (${objectIds.join()});`,
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
      body: `fields id; first_release_date; where first_release_date >= ${now} & first_release_date <= ${twoYears} & category = 0 & videos.video_id != null ; limit 100;`,
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
      body: `fields game_id, value;sort value desc; where popularity_type = 2 & game_id = (${objectIds.join()});`,
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
      body: `fields cover.image_id,rating,name,genres.name,themes.name;where rating > 70 & rating_count > 150 & category = 0;sort rating_count desc; limit 100;`,
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
      body: `fields game_id, value; where popularity_type = 4 & game_id = (${objectIds.join()});`,
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
export async function getOfflineGames() {
  const { data: twitchAccessToken, error: err } =
    await getOrSetToCacheDynamicExpiration(
      CACHE_KEYS.twitchAccessToken,
      getIGDBAccessToken
    );

  if (err) return { data: undefined, error: err };

  const now = Math.floor(new Date().getTime() / 1000);
  const fiveYears = Math.floor(
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
      body: `fields cover.image_id,rating,name,genres.name,themes.name,game_modes.name;where first_release_date > ${fiveYears} & first_release_date <= ${now} & genres.id = (32,16,13,33,35,11,24) & category = 0 & cover.image_id !=null & videos.video_id !=null & keywords.id = 18906 ;  limit 100;`,
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
//can this be fetched at build time?
export async function getOnlineGames() {
  const { data: twitchAccessToken, error: err } =
    await getOrSetToCacheDynamicExpiration(
      CACHE_KEYS.twitchAccessToken,
      getIGDBAccessToken
    );

  if (err) return { data: undefined, error: err };

  const now = Math.floor(new Date().getTime() / 1000);
  const fiveYears = Math.floor(
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
      body: `fields cover.image_id,rating,name,genres.name,themes.name,game_modes.name;where game_modes.id = 2 & genres.id =(36,5,10,14,12,4) & category = 0 & cover.image_id !=null & videos.video_id !=null & rating > 50 & rating_count > 20 & first_release_date > ${fiveYears} & first_release_date <= ${now} ;sort rating desc; limit 100;`,
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
//can this be fetched at build time?
export async function getCasualGames() {
  const { data: twitchAccessToken, error: err } =
    await getOrSetToCacheDynamicExpiration(
      CACHE_KEYS.twitchAccessToken,
      getIGDBAccessToken
    );

  if (err) return { data: undefined, error: err };

  const now = Math.floor(new Date().getTime() / 1000);
  const fiveYears = Math.floor(
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
      body: `fields cover.image_id,rating,name,genres.name,themes.name,game_modes.name;where keywords.id = 101 & genres.id = (9,15,26,31) & first_release_date > ${fiveYears} & first_release_date <= ${now} ;sort first_release_date desc;  limit 100;`,
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

export async function getComingSoon() {
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
      body: `fields name, rating, genres.name,themes.name,cover.image_id, first_release_date;where first_release_date > ${now} & first_release_date <= ${unix3MonthsForward} & category = 0;sort first_release_date desc;  limit 100;`,
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
      body: `fields game_id, value;sort value desc; where popularity_type = 2 & game_id = (${objectIds.join()});`,
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
