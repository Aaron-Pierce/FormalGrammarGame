<template>
  <div id="levelWrapper" :class="{ completed: completed, failed: failed }">
    <canvas
      v-show="activatedCanvas"
      width="1000"
      height="1000"
      id="canvas"
    ></canvas>

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
    <button
      id="returnToLevelSelect"
      v-if="completed"
      @click="nextLevel"
    >
      Go to Next Level
    </button>
    <button id="restart" v-if="failed" @click="restart">Restart</button>
    <div id="targetStringWrapper">
      <p>
        Construct: <span id="targetString">{{ targetString }}</span>
      </p>
    </div>
    <!-- <div id="buttonWrapper" :style="{'grid-template-columns': 'repeat(1fr, ' + new Set(productions.map(e => e[0])).size + ')'}"> -->
    <div
      id="buttonWrapper"
      :style="{ 'grid-template-columns': 'repeat(1fr, 3)' }"
    >
      <div
        class="buttonRow"
        v-for="char in new Set(productions.map((e) => e[0]))"
        :key="char"
      >
        <span v-for="(rule, index) in productions" :key="rule[0] + index">
          <button
            v-if="rule[0] === char"
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
        </span>
      </div>
    </div>
    <p v-if="levelIndex === 0">
      Click a button to activate a production rule, then click an appropriate
      symbol to apply it to
    </p>
    <hr id="linkRowDivider" />
    <div id="linkRow">
      <button @click="returnToLevelSelect" class="dangerHover">
        Return To Level Select
      </button>
      <button @click="promptRestart" class="dangerHover">Restart</button>
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

#linkRow {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  margin-top: 2em;
}

#linkRow button {
  font-size: 1.2rem;
}

#linkRowDivider {
  margin-top: 2em;
}

.buttonShield {
  display: inline-block;
}

#buttonWrapper {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.buttonRow {
  display: flex;
  flex-direction: column;
  font-size: 1rem;
}

.dangerHover:hover {
  background-color: rgba(255, 0, 0, 0.2);
  transition: background-color 0.15s ease-in-out;
}

button {
  font-family: "Computer Modern Serif", serif;
  font-size: 1.5rem;

  background-color: transparent;
  margin: 0.2em;
  border: 1px solid black;
  border-radius: 3px;

  transition: background-color 0.2s ease-in-out;
}

button:hover {
  cursor: pointer;
  background-color: rgba(100, 100, 100, 0.1);
}

.completed {
  transition: background-color 0.75s ease-in-out;
  background-color: rgba(0, 255, 0, 0.2);
}

.failed {
  background-color: rgba(255, 0, 0, 0.2);
  transition: background-color 0.75s ease-in-out;
}

#levelWrapper {
  width: 100%;
  text-align: center;
  padding-bottom: 2em;
}

#canvas {
  border: 2px solid black;
  width: 70%;
  height: auto;
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

  emits: ["completed", "restart", "nextlevel"],

  data() {
    console.log(this.startstring, this.productionstrings, this.targetstring);
    console.log("Mounted");

    return {
      list: stringToSymbols("S"),
      activeProductionIndex: -1,
      productions: formatProductionStrings([
        ["S", "X"],
        ["X", "[X, X, X]"],
      ]),
      targetString: "A Cool Circle Thing",
      activatedCanvas: false,
      completed: false,
      numberOfLines: 0,
      failed: false,
      levelIndex: 13,
    };
  },
  methods: {
    applyProduction(index: number) {
      if (this.activeProductionIndex != null) {
        let production = this.productions[this.activeProductionIndex];
        let symbol = this.list[index];
        console.log("Applyiong prod", index);
        if (symbol.character == production[0]) {
          //remove the symbol
          this.list.splice(index, 1);
          let symbolsToInsert = this.productions[this.activeProductionIndex][1];
          for (let i = 0; i < symbolsToInsert.length; i++) {
            this.list.splice(index + i, 0, symbolsToInsert[i]);
          }

          let ctx = (
            document.getElementById("canvas") as HTMLCanvasElement
          ).getContext("2d");
          ctx?.clearRect(0, 0, 1000, 1000);

          function draw(
            el: boolean | boolean[],
            originX: number,
            originY: number,
            size: number
          ) {
            if (el === true || el === false) {
              //el will never be false, only to satisfy typescript
              if(ctx) ctx.lineWidth = 10/3;
              ctx?.beginPath();
              ctx?.ellipse(originX, originY, size, size, 0, 0, 7);
              ctx?.stroke();
            } else {
              for (let i = 0; i < 3; i++) {
                draw(
                  el[i],
                  originX +
                    0.58 *
                      size *
                      Math.cos((2 * Math.PI * i) / 3 - 1.17 * Math.PI),
                  originY +
                    0.58 *
                      size *
                      Math.sin((2 * Math.PI * i) / 3 - 1.17 * Math.PI),
                  size / 2
                );
              }
            }
          }

          if (this.activeProductionIndex === 0) {
            this.activatedCanvas = true;
            let tree = JSON.parse(
              this.list
                .map((e) => (e.character === "X" ? "true" : e.character))
                .join("")
            );
            console.log(tree);

            draw(tree, 500, 500, 400);
          } else if (this.activeProductionIndex === 1) {
            console.log("running 1");
            this.numberOfLines++;

            // if (this.numberOfLines == 3) {
            //   this.productions.push(
            //     ...formatProductionStrings([["X", "500X"]])
            //   );
            // }

            let tree = JSON.parse(
              this.list
                .map((e) => (e.character === "X" ? "true" : e.character))
                .join("")
            );
            console.log(tree);

            draw(tree, 500, 500, 400);

            if (this.numberOfLines > 8) {
              // this.$emit("completed");

              this.completed = true;

              let parsedJson = JSON.parse(
                localStorage.getItem("completedLevels") || "{}"
              );
              parsedJson[this.levelIndex] = true;
              localStorage.setItem(
                "completedLevels",
                JSON.stringify(parsedJson)
              );
            }
          } else if (this.activeProductionIndex === 2) {
          }
          // this.activeProductionIndex = -1;
        }
      }
    },

    activateProduction(index: number) {
      console.log("Activating production ", index);

      this.activeProductionIndex = index;
    },

    returnToLevelSelect() {
      this.$emit("completed");
    },

    restart() {
      this.$emit("restart");
    },

    nextLevel() {
      this.$emit("nextlevel");
    },

    promptRestart() {
      let confirmation = confirm("Confirm restart?");

      if (confirmation) {
        this.$emit("restart");
      }
    },
  },
  components: {
    StringSymbol,
  },
});
</script>