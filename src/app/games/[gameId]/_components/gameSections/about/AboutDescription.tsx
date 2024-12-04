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
    <section>
      {summaryParagraphs?.length && (
        <div>
          {summaryParagraphs.map((paragraph, index) => {
            if (!paragraph.length) return;
            return (
              <p
                key={`summary_paragraph_${index}`}
                className="font-body-s mb-[21px]"
              >
                {paragraph}
              </p>
            );
          })}{" "}
        </div>
      )}
      {storylineParagraphs?.length ? (
        summaryParagraphs?.length ? (
          <div>
            <h3 className="text-base">Storyline</h3>
            <div>
              {storylineParagraphs.map((paragraph, index) => {
                if (!paragraph.length) return;
                return (
                  <p
                    key={`storyline_paragraph_${index}`}
                    className="font-body-s mb-[21px]"
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
                  className="font-body-s mb-[21px]"
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
