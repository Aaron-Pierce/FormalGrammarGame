import { formatProductionStrings, Production, stringToSymbols } from "./types";

type LevelObject = {
    startString: string,
    targetString: string,
    productionStrings: [string, string][]
}


let Level1: LevelObject = {
    startString: "S",
    targetString: "aaabbb",
    productionStrings: [
        ["S", "aSb"],
        ["S", ""]
    ]
};

let Level2: LevelObject = {
    startString: "S",
    targetString: "aabababb",
    productionStrings: [
        ["S", "aSb"],
        ["S", "SS"],
        ["S", ""]
    ]
}


const Levels = [
    Level1,
    Level2
]

export {
    LevelObject,
    Levels
}