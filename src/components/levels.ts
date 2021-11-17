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


let Level7: LevelObject = {
    startString: "E",
    targetString: "(3x+4)*(4x+3)",
    productionStrings: [
        ["E", "EOE"],
        ["E", "(E)"],
        ["O", "+"],
        ["O", "*"],
        ["E", "3"],
        ["E", "4"],
        ["E", "V"],
        ["V", "EV"],
        ["V", "x"]
    ]
}

let Level8: LevelObject = {
    startString: "aA",
    targetString: "aaaaaacaaa",
    productionStrings: [
        ["A", "aBa"],
        ["B", "aA"],
        ["B", "aB"],
        ["B", "c"]
    ]
}


let Level9: LevelObject = {
    startString: "A",
    targetString: "cabcab",
    productionStrings: [
        ["A", "aB"],
        ["A", "Cb"],
        ["B", "bC"],
        ["B", "Ac"],
        ["C", "cA"],
        ["C", "Ba"],
        ["A", ""],
        ["B", ""],
        ["C", ""]
    ]
}



let Level10: LevelObject = {
    startString: "S",
    targetString: "ababababa",
    productionStrings: [
        ["S", "ESE"],
        ["E", "SES"],
        ["S", "a"],
        ["E", "b"],
    ]
}


let Level11: LevelObject = {
    startString: "AXB",
    targetString: "1111000001111",
    productionStrings: [
        ["A", "1B1"],
        ["A", "0B0"],
        ["A", "B"],
        ["A", "0"],
        ["X", "1"],
        ["X", "0"],
        ["B", "1A0"],
        ["B", "0A1"],
        ["B", "1"],
    ]
}

let Level12: LevelObject = {
    startString: "S",
    targetString: "bbababbab",
    productionStrings: [
        ["S", "SaS"],
        ["S", "bS"],
        ["S", "Sb"],
        ["S", "ba"],
    ]
}

let Level13: LevelObject = {
    startString: "S",
    targetString: "aabaaababaabaaa",
    productionStrings: [
        ["S", "AS"],
        ["S", "a"],
        ["A", "b"],
        ["A", "aAa"],
    ]
}


const Levels = [
    Level1,
    Level3,
    Level4,
    Level5,
    Level2,
    Level6,
    Level7,
    Level8,
    Level9,
    Level10,
    Level11,
    Level12,
    Level13
]

export {
    LevelObject,
    Levels
}