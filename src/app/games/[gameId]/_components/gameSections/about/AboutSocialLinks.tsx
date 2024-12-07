import { socialLinksIcons } from "@/data/constants/igdbEnums";
import { GameData } from "@/interfaces/igdb";
import React from "react";

const AboutSocialLinks = ({ game }: { game: GameData }) => {
  if (!game[0]["websites"]) return;

  return (
    <section>
      <div className="mb-2 font-body-s">Links</div>
      <ul className="flex flex-wrap">
        {game[0].websites.map((link) => {
          const WebsiteLogo = socialLinksIcons[link.category];
          if (!WebsiteLogo) return;

          return (
            <li
              key={`${link.category}`}
              className="h-10 w-10 cursor-pointer rounded bg-surface-container-lowest hover:brightness-115 transition-brightness grid place-content-center"
            >
              {WebsiteLogo}
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default AboutSocialLinks;
