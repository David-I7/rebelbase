import { GameData } from "@/interfaces/igdb";
import {
  getPlatformReleases,
  getSupportedLanguages,
} from "@/utils/dataTransformation";
import { format } from "date-fns";
import React from "react";
import { MdCheck } from "react-icons/md";
import AboutLanguagesAccordion from "./AboutLanguagesAccordion";

const AboutGameSupport = ({ game }: { game: GameData }) => {
  const releaseDates = getPlatformReleases(game);
  const languageSupport = getSupportedLanguages(game);

  if (!languageSupport && !releaseDates) return;

  return (
    <div className="game-support-container">
      <section className="flex flex-col justify-between gap-6 border-b border-b-outline-varient-lowest py-6">
        {releaseDates?.length ? (
          <div className="flex-1">
            <h3 className="text-base mb-2">Platform Releases</h3>
            <ul className="flex flex-col gap-2 font-body-s">
              {releaseDates?.map((date) => {
                return (
                  <li
                    className="flex justify-between"
                    key={`release_date_${date.platform.id}_${date.platform.name}`}
                  >
                    <div>{date.platform.name}</div>
                    <div>
                      {date.date &&
                        format(Math.floor(date.date * 1000), "y-MM-dd")}
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        ) : null}
        {languageSupport && Object.keys(languageSupport).length > 0 ? (
          <div className="flex-1">
            <h3 className="text-base mb-2">Languages</h3>
            <AboutLanguagesAccordion>
              <table className="font-body-s">
                <thead>
                  <tr>
                    <th></th>
                    <th className="px-2 font-medium">Audio</th>
                    <th className="px-2 font-medium">Subtitles</th>
                    <th className="px-2 font-medium">Interface</th>
                  </tr>
                </thead>
                <tbody>
                  {languageSupport &&
                    Object.entries(languageSupport).map(
                      ([languageName, languageSupportTypes]) => {
                        return (
                          <tr key={`language_support_for_${languageName}`}>
                            <td>{languageName}</td>
                            <td>
                              {languageSupportTypes.Audio ? (
                                <div className="py-2 flex items-center justify-center">
                                  <MdCheck
                                    size={20}
                                    className="text-on-surface-heading-varient"
                                  />
                                </div>
                              ) : null}
                            </td>
                            <td>
                              {languageSupportTypes.Subtitles ? (
                                <div className="py-2 flex items-center justify-center">
                                  <MdCheck
                                    size={20}
                                    className="text-on-surface-heading-varient"
                                  />
                                </div>
                              ) : null}
                            </td>
                            <td>
                              {languageSupportTypes.Interface ? (
                                <div className="py-2 flex items-center justify-center">
                                  <MdCheck
                                    size={20}
                                    className="text-on-surface-heading-varient"
                                  />
                                </div>
                              ) : null}
                            </td>
                          </tr>
                        );
                      }
                    )}
                </tbody>
              </table>
            </AboutLanguagesAccordion>
          </div>
        ) : null}
      </section>
    </div>
  );
};

export default AboutGameSupport;
