<template>
<div id="levelWrapper">
  <div id="targetStringWrapper">
    <p id="targetString">
      <string-symbol
        v-for="(symbol, index) in list"
        :index="index"
        :key="symbol.character+index"
        v-model:activeIndex="activeIndex"
        @activated="activate"
      ></string-symbol>
    </p>
  </div>

  <div id="buttonWrapper">
      <button v-for="(rule, index) in productions" :key="index" class="productionButton" @click="apply(index)">
        {{rule[0] + " -> " + rule[1].reduce((str, el) => str + el.character, "")}}
      </button>
  </div>
  </div>
</template>

<style scoped>
#targetStringWrapper {
  font-family: "Computer Modern Serif", serif;
  font-size: 2.5em;
  box-sizing: border-box;

  -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
     -khtml-user-select: none; /* Konqueror HTML */
       -moz-user-select: none; /* Old versions of Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
            user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome, Edge, Opera and Firefox */
}
</style>

<script lang="ts">
import { defineComponent } from "vue";
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

  props: ["startstring", "productionstrings", "somethingelse"],

  data() {
      console.log(this.startstring, this.productionstrings, this.somethingelse)
    return {
      list: stringToSymbols(this.startstring),
      activeIndex: null,
      productions: formatProductionStrings(this.productionstrings),
    } as SentinelForm;
  },
  methods: {
    activate(index: number) {
      console.log("Setting active index ", index);
      if(this.activeIndex == index){
        //toggle if already active
        this.activeIndex = null;
      }else{
        this.activeIndex = index;
      }
    },

    apply(index: number){
      console.log("Applying production ", index, "to", this.activeIndex);

      if(this.activeIndex != null){
        let symbol = this.list[this.activeIndex];
        if(symbol.character == this.productions[index][0]){
          //remove the symbol
          this.list.splice(this.activeIndex, 1);
          let symbolsToInsert = this.productions[index][1];
          for(let i = 0; i < symbolsToInsert.length; i++){
            this.list.splice(this.activeIndex + i, 0, symbolsToInsert[i]);
          }

          console.log("After, list is: ", this.list)
          this.activeIndex = null;
        }
      }
    }
  },
  components: {
    StringSymbol,
  },
});
</script>