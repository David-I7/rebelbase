import { socialLinksIcons } from "@/data/constants/gamePageEnums";
import { GameData } from "@/interfaces/igdb";
import { getSocialLinks } from "@/utils/dataTransformation";
import React from "react";

const AboutSocialLinks = ({ game }: { game: GameData }) => {
  const socialLinks = getSocialLinks(game);

  if (!socialLinks || !socialLinks.length) return;

  return (
    <section className="mt-6">
      <div className="mb-2 font-body-s">Links</div>
      <ul className="flex flex-wrap">
        {socialLinks.map((link) => {
          const WebsiteLogo = socialLinksIcons[link.category];
          if (!WebsiteLogo) return;

          return (
            <li key={`${link.category}`}>
              <a
                href={link.url}
                target="_blank"
                className="h-10 w-10 cursor-pointer rounded bg-surface-container-lowest hover:brightness-115 transition-brightness grid place-content-center"
              >
                {WebsiteLogo}
              </a>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default AboutSocialLinks;
