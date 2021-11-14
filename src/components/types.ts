
class TerminalSymbolObject implements SymbolObject {
    character: string;
    kind: "Terminal" | "Nonterminal";
    constructor(character: string) {
        this.character = character.toLowerCase();
        this.kind = "Terminal";
    }
}

class NonterminalSymbolObject implements SymbolObject {
    character: string;
    kind: "Nonterminal" | "Terminal";
    constructor(character: string) {
        this.character = character.toUpperCase();
        this.kind = "Nonterminal";
    }
}


interface SymbolObject {
    character: string;
    kind: "Nonterminal" | "Terminal"
}


function stringToSymbols(correctlyCapitalizedString: string): SymbolObject[] {
    return correctlyCapitalizedString.split("").map(e => {
        if(e.toUpperCase() === e){
            return new NonterminalSymbolObject(e);
        }else{
            return new TerminalSymbolObject(e);
        }
    });
}

function formatProductionStrings(pairs: [string, string][]): [string, SymbolObject[]][] {
    return pairs.map(pair => {
        return [pair[0], stringToSymbols(pair[1])]
    })
}

type SentinelForm = {
    list: SymbolObject[],
    activeIndex: number | null,
    productions: [string, SymbolObject[]][]
}

export {
    TerminalSymbolObject,
    NonterminalSymbolObject,
    SymbolObject,
    SentinelForm,
    stringToSymbols,
    formatProductionStrings
}