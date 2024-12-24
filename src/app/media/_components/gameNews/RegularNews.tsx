import { GameNews } from "@/services/worldNewsApi";
import React, { useContext, useMemo } from "react";
import RegularArticle from "./Regular/RegularArticle";
import ArticleImage from "./Regular/ArticleImage";
import NewsSummary from "./NewsSummary";
import { GameNewsContext } from "./context/GameNewsContext";

const renderCount = 4;
const smallstart = 1;
const mediumstart = 2;
const largestart = 3;

const RegularNews = ({ gameNews }: { gameNews: GameNews }) => {
  const state = useContext(GameNewsContext);

  const RegularNewsArticles = useMemo(() => {
    const start = state.isSmall
      ? smallstart
      : state.isMedium
      ? mediumstart
      : largestart;
    const Articles: React.JSX.Element[] = [];
    for (let i = start; i < start + renderCount; i++) {
      Articles.push(
        <RegularArticle key={`regular_game_article_${gameNews.news[i].id}`}>
          <ArticleImage imgSrc={gameNews.news[i].image} />
          <NewsSummary
            orientation="landscape"
            details={gameNews.news[i].text}
            summary={gameNews.news[i].title}
          />
        </RegularArticle>
      );
    }
    return Articles;
  }, [state]);

  return (
    <section
      className={`grid gap-x-6 gap-y-4 mt-12 ${
        state.isLarge ? "grid-cols-2" : ""
      }`}
    >
      {RegularNewsArticles}
    </section>
  );
};

export default RegularNews;
