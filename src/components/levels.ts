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

let Level3: LevelObject = {
    startString: "SSS",
    targetString: "hello",
    productionStrings: [
        ["S", "o"],
        ["S", "el"],
        ["S", "hSl"],
        ["S", ""]
    ]
}


let Level4: LevelObject = {
    startString: "S",
    targetString: "world",
    productionStrings: [
        ["S", "wSd"],
        ["S", "oSl"],
        ["S", "Srl"],
        ["S", "o"]
    ]
}

let Level5: LevelObject = {
    startString: "S",
    targetString: "apple",
    productionStrings: [
        ["S", "ap"],
        ["S", "Sp"],
        ["S", "SS"],
        ["S", "le"]
    ]
}

let Level6: LevelObject = {
    startString: "SS",
    targetString: "minimum",
    productionStrings: [
        ["S", "mAm"],
        ["S", "Bm"],
        ["A", "iBi"],
        ["B", "n"],
        ["B", "u"],
    ]
}


const Levels = [
    Level1,
    Level3,
    Level4,
    Level5,
    Level2,
    Level6,
]

export {
    LevelObject,
    Levels
}