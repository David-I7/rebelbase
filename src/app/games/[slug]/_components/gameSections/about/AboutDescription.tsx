import { GameData } from "@/interfaces/igdb";
import {
  getStorylineParagraphs,
  getSummaryParagraphs,
} from "@/utils/dataTransformation";
import React from "react";

const AboutDescription = ({ game }: { game: GameData }) => {
  const storylineParagraphs = getStorylineParagraphs(game);
  const summaryParagraphs = getSummaryParagraphs(game);

  if (!storylineParagraphs && !summaryParagraphs) return;
  if (!storylineParagraphs?.length && !summaryParagraphs?.length) return;

  return (
    <section className="border-b border-b-outline-varient-lowest pb-6">
      {summaryParagraphs?.length && (
        <div>
          {summaryParagraphs.map((paragraph, index) => {
            if (!paragraph.length) return;
            return (
              <p
                key={`summary_paragraph_${index}`}
                className="font-body-s mb-[21px] last-of-type:mb-0"
              >
                {paragraph}
              </p>
            );
          })}{" "}
        </div>
      )}
      {storylineParagraphs?.length ? (
        summaryParagraphs?.length ? (
          <div className="mt-6">
            <h3 className="text-base mb-2">Storyline</h3>
            <div>
              {storylineParagraphs.map((paragraph, index) => {
                if (!paragraph.length) return;
                return (
                  <p
                    key={`storyline_paragraph_${index}`}
                    className="font-body-s mb-[21px] last-of-type:mb-0"
                  >
                    {paragraph}
                  </p>
                );
              })}
            </div>
          </div>
        ) : (
          <div>
            {storylineParagraphs.map((paragraph, index) => {
              if (!paragraph.length) return;
              return (
                <p
                  key={`storyline_paragraph_${index}`}
                  className="font-body-s mb-[21px] last-of-type:mb-0"
                >
                  {paragraph}
                </p>
              );
            })}
          </div>
        )
      ) : null}
    </section>
  );
};

export default AboutDescription;
