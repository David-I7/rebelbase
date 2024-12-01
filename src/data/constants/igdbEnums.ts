export const imagesMap = {
  baseUrl: "https://images.igdb.com/igdb/image/upload/t_",
  verticalCardLarge: "cover_big", // 264 * 374
  verticalCardSmall: "cover_small", //90 * 128
  horizontalCardLarge: "screenshot_med", // 284 * 160
  horizonatalCardHero: "screenshot_big", //1280 * 720
};

export const videoMap: { [index: string]: string } = {
  TRAILER: "Trailer",
  LAUNCH_TRAILER: "Launch Trailer",
};

export const ageCategories: { [index: number]: string } = {
  1: "ESRB",
  2: "PEGI",
};
export const ageRatings: { [index: number]: string } = {
  1: "3",
  2: "7",
  3: "12",
  4: "16",
  5: "18",
  6: "RP",
  7: "EC",
  8: "E",
  9: "E10",
  10: "T",
  11: "M",
  12: "AO",
};

import PEGI3 from "@/assets/images/ageRating/PEGI_3.jpg";
import PEGI7 from "@/assets/images/ageRating/PEGI_7.jpg";
import PEGI12 from "@/assets/images/ageRating/PEGI_12.jpg";
import PEGI16 from "@/assets/images/ageRating/PEGI_16.jpg";
import PEGI18 from "@/assets/images/ageRating/PEGI_18.jpg";
import ESRB_RP from "@/assets/images/ageRating/ESRB_2013_Rating_Pending.jpg";
import ESRB_E from "@/assets/images/ageRating/ESRB_2013_Everyone.jpg";
import ESRB_E10 from "@/assets/images/ageRating/ESRB_2013_Everyone_10+.jpg";
import ESRB_T from "@/assets/images/ageRating/ESRB_2013_Teen.jpg";
import ESRB_M from "@/assets/images/ageRating/ESRB_2013_Mature.jpg";
import ESRB_AO from "@/assets/images/ageRating/ESRB_2013_Adults_Only_18+.jpg";
import { StaticImageData } from "next/image";
export const ageRatingImages: {
  [index: number]: { [index: string | number]: StaticImageData };
} = {
  2: {
    3: PEGI3,
    7: PEGI7,
    12: PEGI12,
    16: PEGI16,
    18: PEGI18,
  },
  1: {
    RP: ESRB_RP,
    E: ESRB_E,
    E10: ESRB_E10,
    T: ESRB_T,
    M: ESRB_M,
    AO: ESRB_AO,
  },
};
