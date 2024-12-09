"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var zod_1 = require("zod");
var convertedGameModeKeys;
(function (convertedGameModeKeys) {
    convertedGameModeKeys[convertedGameModeKeys["singlePlayer"] = 1] = "singlePlayer";
    convertedGameModeKeys[convertedGameModeKeys["multiplayer"] = 2] = "multiplayer";
    convertedGameModeKeys[convertedGameModeKeys["co-operative"] = 3] = "co-operative";
    convertedGameModeKeys[convertedGameModeKeys["split-screen"] = 4] = "split-screen";
    convertedGameModeKeys[convertedGameModeKeys["MMO"] = 5] = "MMO";
    convertedGameModeKeys[convertedGameModeKeys["battleRoyale"] = 6] = "battleRoyale";
})(convertedGameModeKeys || (convertedGameModeKeys = {}));
var convertedCategoryKeys;
(function (convertedCategoryKeys) {
    convertedCategoryKeys[convertedCategoryKeys["mainGame"] = 0] = "mainGame";
    convertedCategoryKeys[convertedCategoryKeys["dlcAddon"] = 1] = "dlcAddon";
    convertedCategoryKeys[convertedCategoryKeys["remaster"] = 9] = "remaster";
    convertedCategoryKeys[convertedCategoryKeys["remake"] = 8] = "remake";
    convertedCategoryKeys[convertedCategoryKeys["bundle"] = 3] = "bundle";
    convertedCategoryKeys[convertedCategoryKeys["season"] = 7] = "season";
})(convertedCategoryKeys || (convertedCategoryKeys = {}));
var gameModes = [
    "singlePlayer",
    "multiplayer",
    "co-operative",
    "split-screen",
    "MMO",
    "battleRoyale",
];
var categories = [
    "mainGame",
    "dlcAddon",
    "remaster",
    "remake",
    "bundle",
    "season",
];
var searchParamsSchema = zod_1.z.object({
    sortBy: zod_1.z
        .enum(["newReleases", "upcomingReleases", "topRated"])
        .default("newReleases"),
    sortDir: zod_1.z.enum(["asc", "desc"]).optional(),
    gameModes: zod_1.z
        .union([
        zod_1.z.enum(gameModes),
        zod_1.z.tuple([zod_1.z.enum(gameModes)]).rest(zod_1.z.enum(gameModes)),
    ])
        .optional(),
    tags: zod_1.z.string().or(zod_1.z.array(zod_1.z.string()).min(2)).optional(),
    genres: zod_1.z.string().or(zod_1.z.array(zod_1.z.string()).min(2)).optional(),
    themes: zod_1.z.string().or(zod_1.z.array(zod_1.z.string()).min(2)).optional(),
    categories: zod_1.z
        .union([
        zod_1.z.enum(categories),
        zod_1.z.tuple([zod_1.z.enum(categories)]).rest(zod_1.z.enum(categories)),
    ])
        .default(categories[0]),
});
console.log(searchParamsSchema.safeParse({ categories: ["mainGame", ","] }));
