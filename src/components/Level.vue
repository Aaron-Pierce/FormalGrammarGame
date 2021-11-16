<template>
  <div id="levelWrapper" :class="{completed: completed}">
    <div id="buildingStringWrapper">
      <p id="buildingString">
        <string-symbol
          v-for="(symbol, index) in list"
          :index="index"
          :key="symbol.character + index"
          v-model:activeProductionIndex="activeProductionIndex"
          v-model:productions="productions"
          @applyProduction="applyProduction"
        ></string-symbol>
      </p>
    </div>
    <div id="targetStringWrapper">
      <p>
        Construct: <span id="targetString">{{ targetstring }}</span>
      </p>
    </div>
    <div id="buttonWrapper">
      <button
        v-for="(rule, index) in productions"
        :key="index"
        class="productionButton"
        @click="activateProduction(index)"
      >
        {{
          rule[0] +
          " ⟶ " +
          (rule[1].length === 0
            ? "λ"
            : rule[1].reduce((str, el) => str + el.character, ""))
        }}
      </button>
    </div>
  </div>
</template>

<style scoped>
#buildingStringWrapper {
  font-family: "Computer Modern Serif", serif;
  font-size: 2.5em;
  box-sizing: border-box;
  text-align: center;

  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Old versions of Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome, Edge, Opera and Firefox */
}

.productionButton {
  font-family: "Computer Modern Serif", serif;
  font-size: 1.5rem;

  background-color: transparent;
  margin: 0.2em;
  border: 1px solid black;
  border-radius: 3px;

  transition: background-color 0.2s ease-in-out;
}

.productionButton:hover {
  cursor: pointer;
  background-color: rgba(100, 100, 100, 0.1);
}

.completed{
  transition: background-color 0.75s ease-in-out;
  background-color: rgba(0, 255, 0, 0.2);
}

#levelWrapper{
  width: 100%;
  text-align: center;
  padding-bottom: 2em;
}
</style>

<script lang="ts">
import { defineComponent} from "vue";
import StringSymbol from "./StringSymbol.vue";
import {
  formatProductionStrings,
  NonterminalSymbolObject,
  SentinelForm,
  stringToSymbols,
  TerminalSymbolObject,
} from "./types";


export default defineComponent({
  // type inference enabled

  props: ["startstring", "productionstrings", "targetstring"],
  emits: ["completed"],

  data() {
    console.log(this.startstring, this.productionstrings, this.targetstring);
    return {
      list: stringToSymbols(this.startstring),
      activeProductionIndex: null,
      productions: formatProductionStrings(this.productionstrings),
      completed: false,
    } as SentinelForm;
  },
  methods: {
    applyProduction(index: number) {
      if (this.activeProductionIndex != null) {
        let production = this.productions[this.activeProductionIndex];
        let symbol = this.list[index];
        if (symbol.character == production[0]) {
          //remove the symbol
          this.list.splice(index, 1);
          let symbolsToInsert = this.productions[this.activeProductionIndex][1];
          for (let i = 0; i < symbolsToInsert.length; i++) {
            this.list.splice(index + i, 0, symbolsToInsert[i]);
          }

          console.log("After, list is: ", this.list);

          let newString = this.list.reduce(
            (str, charObj) => str + charObj.character,
            ""
          );
          if (newString == this.targetstring) {
            console.log("Constructed string successfully");
            this.completed = true;
            this.$emit("completed");
          }
          this.activeProductionIndex = null;
        }
      }
    },

    activateProduction(index: number) {
      console.log("Activating production ", index);

      this.activeProductionIndex = index;
    },
  },
  components: {
    StringSymbol,
  },
});
</script>