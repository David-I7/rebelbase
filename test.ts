import { z } from "zod";
enum convertedGameModeKeys {
  "singlePlayer" = 1,
  "multiplayer" = 2,
  "co-operative" = 3,
  "split-screen" = 4,
  "MMO" = 5,
  "battleRoyale" = 6,
}
enum convertedCategoryKeys {
  "mainGame" = 0,
  "dlcAddon" = 1,
  "remaster" = 9,
  "remake" = 8,
  "bundle" = 3,
  "season" = 7,
}

const gameModes = [
  "singlePlayer",
  "multiplayer",
  "co-operative",
  "split-screen",
  "MMO",
  "battleRoyale",
] as const;

const categories = [
  "mainGame",
  "dlcAddon",
  "remaster",
  "remake",
  "bundle",
  "season",
] as const;

const searchParamsSchema = z.object({
  sortBy: z
    .enum(["newReleases", "upcomingReleases", "topRated"])
    .default("newReleases"),
  sortDir: z.enum(["asc", "desc"]).optional(),
  gameModes: z
    .union([
      z.enum(gameModes),
      z.tuple([z.enum(gameModes)]).rest(z.enum(gameModes)),
    ])
    .optional(),
  tags: z.string().or(z.array(z.string()).min(2)).optional(),
  genres: z.string().or(z.array(z.string()).min(2)).optional(),
  themes: z.string().or(z.array(z.string()).min(2)).optional(),
  categories: z
    .union([
      z.enum(categories),
      z.tuple([z.enum(categories)]).rest(z.enum(categories)),
    ])
    .default(categories[0]),
});

type searchParams = z.infer<typeof searchParamsSchema>;

console.log(searchParamsSchema.safeParse({ categories: ["mainGame", ","] }));
