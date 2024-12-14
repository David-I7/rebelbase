"use client";
import Accordion from "@/_components/accordion/Accordion";
import {
  categories,
  gameModes,
  genres,
  themes,
  uiFriendlyCategoriesKeys,
  uiFriendlyGameModeKeys,
  uiFriendlyGenreKeysBiMap,
  uiFriendlyThemesKeysBiMap,
} from "@/data/constants/filterEnums";
import React, { useContext } from "react";
import { Action, FilterContext } from "../../context/FilterContext";
import FilterListItem from "./FilterListItem";

const FilterGamesAccordions = () => {
  const [state, dispatch] = useContext(FilterContext);
  return (
    <div>
      <GenresAccordion genresState={state.genres} dispatch={dispatch} />
      <ThemesAccordion themesState={state.themes} dispatch={dispatch} />
      <GameModesAccordion
        gameModesState={state.gameModes}
        dispatch={dispatch}
      />
      <CategoriesAccordion
        categoriesState={state.categories}
        dispatch={dispatch}
      />
    </div>
  );
};

export default FilterGamesAccordions;

const GenresAccordion = React.memo(
  ({
    genresState,
    dispatch,
  }: {
    genresState: Set<string>;
    dispatch: React.Dispatch<Action>;
  }) => {
    return (
      <Accordion
        style={{
          borderBottom: "1px solid var(--color-outline-varient-lowest)",
        }}
        summary="Genres"
      >
        <ul className=" grid gap-1">
          {genres.map((genre) => (
            <FilterListItem
              key={`genre_filter_${genre}`}
              selected={genresState.has(genre)}
              actionKey="genres"
              actionValue={genre}
              label={uiFriendlyGenreKeysBiMap[genre]}
              dispatch={dispatch}
            />
          ))}
        </ul>
      </Accordion>
    );
  }
);
const ThemesAccordion = React.memo(
  ({
    themesState,
    dispatch,
  }: {
    themesState: Set<string>;
    dispatch: React.Dispatch<Action>;
  }) => {
    return (
      <Accordion
        style={{
          borderBottom: "1px solid var(--color-outline-varient-lowest)",
        }}
        summary="Themes"
      >
        <ul className=" grid gap-1">
          {themes.map((theme) => (
            <FilterListItem
              key={`theme_filter_${theme}`}
              selected={themesState.has(theme)}
              actionKey="themes"
              actionValue={theme}
              label={uiFriendlyThemesKeysBiMap[theme]}
              dispatch={dispatch}
            />
          ))}
        </ul>
      </Accordion>
    );
  }
);
const GameModesAccordion = React.memo(
  ({
    gameModesState,
    dispatch,
  }: {
    gameModesState: Set<string>;
    dispatch: React.Dispatch<Action>;
  }) => {
    return (
      <Accordion
        style={{
          borderBottom: "1px solid var(--color-outline-varient-lowest)",
        }}
        summary="Game modes"
      >
        <ul className=" grid gap-1">
          {gameModes.map((gameMode) => (
            <FilterListItem
              key={`gameMode_filter_${gameMode}`}
              selected={gameModesState.has(gameMode)}
              actionKey="gameModes"
              actionValue={gameMode}
              label={uiFriendlyGameModeKeys[gameMode]}
              dispatch={dispatch}
            />
          ))}
        </ul>
      </Accordion>
    );
  }
);
const CategoriesAccordion = React.memo(
  ({
    categoriesState,
    dispatch,
  }: {
    categoriesState: Set<string>;
    dispatch: React.Dispatch<Action>;
  }) => {
    return (
      <Accordion summary="Categories">
        <ul className=" grid gap-1">
          {categories.map((category) => (
            <FilterListItem
              key={`category_filter_${category}`}
              selected={categoriesState.has(category)}
              actionKey="categories"
              actionValue={category}
              label={uiFriendlyCategoriesKeys[category]}
              dispatch={dispatch}
            />
          ))}
        </ul>
      </Accordion>
    );
  }
);
