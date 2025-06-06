import {
  ageCategories,
  ageRatingImages,
  ageRatings,
  socialLinksIcons,
} from "@/data/constants/gamePageEnums";
import {
  uiFriendlyGenreKeysBiMap,
  uiFriendlyThemesKeysBiMap,
} from "@/data/constants/filterEnums";
import {
  AgeRating,
  CardData,
  GameData,
  InvolvedCompanies,
  Videos,
} from "@/interfaces/igdb";
import { StaticImageData } from "next/image";

export function getCardTags(game: CardData): string[] {
  const tags: string[] = [];
  const TAG_COUNT = 2;

  if (game["genres"]) {
    for (let i = 0; i < game["genres"].length; i++) {
      if (uiFriendlyGenreKeysBiMap[game["genres"][i].name]) {
        tags.push(game["genres"][i].name);
      }

      if (tags.length === TAG_COUNT) return tags;
    }
  }

  if (game["themes"]) {
    for (let i = 0; i < game["themes"].length; i++) {
      if (uiFriendlyThemesKeysBiMap[game["themes"][i].name]) {
        tags.push(game["themes"][i].name);
      }

      if (tags.length === TAG_COUNT) return tags;
    }
  }

  return tags;
}

export function convertRating(rating?: number): string | undefined {
  if (!rating) return;
  // convert from 0-100 to 0-5 rating
  return (rating / 20).toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 1,
  });
}

type AgeRatingConversion = { name: string; imgSrc: StaticImageData };

export function getAgeRating(
  ageRating?: AgeRating
): AgeRatingConversion | undefined {
  if (!ageRating) return;

  for (let i = 0; i < ageRating.length; i++) {
    if (ageCategories[ageRating[i].category]) {
      if (ageRatings[ageRating[i].rating]) {
        const name = `${ageCategories[ageRating[i].category]} ${
          ageRatings[ageRating[i].rating]
        }`;
        return {
          name,
          imgSrc:
            ageRatingImages[ageRating[i].category][
              ageRatings[ageRating[i].rating]
            ],
        };
      }
    }
  }

  return;
}

export function getDeveloperCompany(involvedCompanies?: InvolvedCompanies): {
  developerCompanyId: number | undefined;
  developerCompanyName: string | undefined;
} {
  if (!involvedCompanies)
    return { developerCompanyId: undefined, developerCompanyName: undefined };

  let involvedCompanyDeveloperid!: number;
  let involvedCompanyDeveloperName!: string;

  for (let i = 0; i < involvedCompanies.length; i++) {
    if (involvedCompanies[i].developer) {
      involvedCompanyDeveloperid = involvedCompanies[i].company.id;
      involvedCompanyDeveloperName = involvedCompanies[i].company.name;
      break;
    }
  }

  return {
    developerCompanyId: involvedCompanyDeveloperid,
    developerCompanyName: involvedCompanyDeveloperName,
  };
}

export type RelevantVideoData = { name: string; videoId: string };

export function getHeroVideo(videos?: Videos): RelevantVideoData | undefined {
  if (!videos) return;

  for (const video of videos) {
    const isTrailer = video.name.match(/[t,T]railer/);

    if (isTrailer) {
      return { name: video.name, videoId: video.video_id };
    }
  }

  return undefined;
}

type MediaType = {
  imgId: string;
};

export type Media = {
  artworks: MediaType[];
  screenshots: MediaType[];
};

export function getMedia(game: GameData): Media | undefined {
  const artworks = game[0]["artworks"];
  const screenShots = game[0]["screenshots"];

  if (!artworks && !screenShots) return undefined;

  const maxLength =
    artworks?.length && screenShots?.length
      ? Math.max(artworks.length, screenShots.length)
      : artworks?.length
      ? artworks!.length
      : screenShots!.length;

  const result: Media = { artworks: [], screenshots: [] };

  //we want screenshots then artworks

  for (let i = 0; i < maxLength; i++) {
    if (artworks) {
      if (artworks[i]) {
        result.artworks.push({ imgId: artworks[i].image_id });
      }
    }

    if (screenShots) {
      if (screenShots[i]) {
        result.screenshots.push({ imgId: screenShots[i].image_id });
      }
    }
  }

  if (result.artworks.length || result.screenshots.length) return result;

  return undefined;
}

export function getStorylineParagraphs(game: GameData): string[] | undefined {
  const storyline = game[0]["storyline"];
  if (!storyline) return;

  return storyline.split("\n");
}
export function getSummaryParagraphs(game: GameData): string[] | undefined {
  const summary = game[0]["summary"];
  if (!summary) return;

  return summary.split("\n");
}

export function getPlatformReleases(game: GameData) {
  const releaseDates = game[0]["release_dates"];

  if (!releaseDates) return;
  // id 6 => 'Full Release'

  let platformReleses: Set<string> = new Set();

  const result = releaseDates.filter((date) => {
    if (platformReleses.has(date.platform.name)) return false;
    if (date["status"]) {
      platformReleses.add(date.platform.name);
      return date["status"].id === 6;
    }
    platformReleses.add(date.platform.name);
  });

  if (result.length) return result.sort((a, b) => a.date - b.date);

  // 2nd loop prevents old db entries without status to be included

  platformReleses = new Set();

  return releaseDates
    .filter((date) => {
      if (platformReleses.has(date.platform.name)) return false;
      platformReleses.add(date.platform.name);
      return true;
    })
    .sort((a, b) => a.date - b.date);
}

type Languages = {
  [index: string]: {
    Audio?: boolean;
    Subtitles?: boolean;
    Interface?: boolean;
  };
};

export function getSupportedLanguages(game: GameData): Languages | undefined {
  const supportedLanguages = game[0]["language_supports"];

  if (!supportedLanguages) return;

  const result: Languages = {};

  supportedLanguages.map((language) => {
    if (result[language.language.name]) {
      const languageSupport = result[language.language.name];
      languageSupport[
        language.language_support_type.name as keyof Languages[string]
      ] = true;
    } else {
      result[language.language.name] = {
        [language.language_support_type.name]: true,
      };
    }
  });

  return result;
}

const MAX_TAG_AMOUNT = 6;

type GameTag = {
  id: number;
  uiName: string;
  urlName: string;
  tagType: string;
};

export function getGameTags(game: GameData): GameTag[] | undefined {
  const themes = game[0]["themes"];
  const genres = game[0]["genres"];
  const keywords = game[0]["keywords"];

  if (!themes && !genres && !keywords) return;

  let gameTags: GameTag[] = [];

  if (themes) {
    const filteredThemes: GameTag[] = [];
    themes.forEach((theme) => {
      if (uiFriendlyThemesKeysBiMap[theme.name]) {
        filteredThemes.push({
          id: theme.id,
          tagType: "themes",
          uiName: theme.name,
          urlName: uiFriendlyThemesKeysBiMap[theme.name],
        });
      }
    });
    gameTags = filteredThemes.slice(0, MAX_TAG_AMOUNT);
  }
  if (gameTags.length < MAX_TAG_AMOUNT && genres) {
    const filteredGenres: GameTag[] = [];
    genres.forEach((genre) => {
      if (uiFriendlyGenreKeysBiMap[genre.name]) {
        filteredGenres.push({
          id: genre.id,
          tagType: "genres",
          uiName: genre.name,
          urlName: uiFriendlyGenreKeysBiMap[genre.name],
        });
      }
    });
    gameTags.push(
      ...filteredGenres
        .slice(0, MAX_TAG_AMOUNT - gameTags.length)
        .map((genre) => ({ ...genre, tagType: "genres" }))
    );
  }
  if (gameTags.length < MAX_TAG_AMOUNT && keywords) {
    for (let i = 0; i < keywords.length; i++) {
      gameTags.push({
        id: keywords[i].id,
        tagType: "keyword",
        uiName: keywords[i].name,
        urlName: keywords[i].name,
      });
      if (gameTags.length === MAX_TAG_AMOUNT) return gameTags;
    }
  }
  return gameTags;
}

export function getSocialLinks(game: GameData) {
  if (!game[0]["websites"]) return;

  return game[0]["websites"].filter((link) => socialLinksIcons[link.category]);
}
