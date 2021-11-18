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
      @click="returnToLevelSelect"
    >
      Return to Level Select
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

  emits: ["completed", "restart"],

  data() {
    console.log(this.startstring, this.productionstrings, this.targetstring);
    console.log("Mounted");

    return {
      list: stringToSymbols("S"),
      activeProductionIndex: -1,
      productions: formatProductionStrings([
        ["S", "X"],
        ["X", "xX"],
      ]),
      targetString: "A Bird",
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

          let strokeLine = () => {
            let ctx = (
              document.getElementById("canvas") as HTMLCanvasElement
            ).getContext("2d");
            if (ctx === null) return;
            ctx.beginPath();
            ctx.moveTo(
              500 +
                500 *
                  ((3 / 2) *
                    Math.sin(
                      (2 * Math.PI * this.numberOfLines) / 500 + Math.PI / 3
                    ) **
                      7),
              500 +
                -500 *
                  ((1 / 4) *
                    Math.cos((6 * Math.PI * this.numberOfLines) / 500) ** 2)
            );

            ctx.lineTo(
              500 +
                400 *
                  ((1 / 5) *
                    Math.sin(
                      (6 * Math.PI * this.numberOfLines) / 500 + Math.PI / 5
                    )),
              500 +
                400 *
                  ((2 / 3) *
                    Math.sin(
                      (2 * Math.PI * this.numberOfLines) / 500 - Math.PI / 3
                    ) **
                      2)
            );

            ctx.stroke();
          };

          if (this.activeProductionIndex === 0) {
            this.activatedCanvas = true;
          } else if (this.activeProductionIndex === 1) {
            console.log("running 1");
            this.numberOfLines++;

            strokeLine();

            if (this.numberOfLines == 3) {
              this.productions.push(
                ...formatProductionStrings([["X", "500X"]])
              );
            }
          } else if (this.activeProductionIndex === 2) {
            let i = 0;
            let int = setInterval(() => {
              i++;
              this.numberOfLines++;
              strokeLine();

              if (i === 500) {
                this.completed = true;
                clearInterval(int);
                this.activeProductionIndex = -1;
                let frameCount = 0;
                function animate() {
                  let ctx = (
                    document.getElementById("canvas") as HTMLCanvasElement
                  ).getContext("2d");
                  if (ctx === null) return;

                  ctx.clearRect(0, 0, 1000, 1000);

                  for (let i = 1; i <= 500; i++) {
                    ctx.beginPath();
                    ctx.moveTo(
                      500 +
                        500 *
                          ((3 / 2) *
                            Math.sin(
                              (2 * Math.PI * i) / 500 +
                                Math.PI / 3

                            ) **
                              7),
                      500 +
                        -500 *
                          ((1 / 4) *
                            Math.cos(
                              (6 * Math.PI * i) / 500
                                + frameCount/60

                            ) **
                              2)
                    );

                    ctx.lineTo(
                      500 +
                        400 *
                          ((1 / 5) *
                            Math.sin(
                              (6 * Math.PI * i) / 500 +
                                Math.PI / 5
                            )),
                      500 +
                        400 *
                          ((2 / 3) *
                            Math.sin(
                              (2 * Math.PI * i) / 500 -
                                Math.PI / 3
                                + frameCount/60

                            ) **
                              2)
                    );

                    ctx.stroke();
                  }

                  frameCount++;
                  requestAnimationFrame(animate);
                }

              }
            }, 2);
            return;
          }

          let newString = this.list.reduce(
            (str, charObj) => str + charObj.character,
            ""
          );
          if (newString == this.targetString) {
            console.log("Constructed string successfully");
            this.completed = true;

            let parsedJson = JSON.parse(
              localStorage.getItem("completedLevels") || "{}"
            );
            parsedJson[this.levelIndex] = true;
            localStorage.setItem("completedLevels", JSON.stringify(parsedJson));
          } else {
            let numberOfNonTerminals = this.list.reduce(
              (acc, el) => acc + (el.kind === "Nonterminal" ? 1 : 0),
              0
            );
            if (numberOfNonTerminals === 0) {
              this.failed = true;
            }
          }
          this.activeProductionIndex = -1;
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