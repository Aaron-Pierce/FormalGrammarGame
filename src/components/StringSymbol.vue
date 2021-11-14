<template>
  <span
    :class="{
      nonterminalSymbol: object.kind == 'Nonterminal',
      activated:
        (productions[activeProductionIndex] || [])[0] == object.character,
    }"
    @click="activate"
  >
    {{ object.character }}
  </span>
</template>

<style scoped>
.nonterminalSymbol {
  transition-property: background-color;
  transition-duration: 0.15s;
  transition-timing-function: ease-in-out;
  box-sizing: border-box;
}

.nonterminalSymbol.activated {
  background-color: rgb(0, 255, 50, 0.25) !important;
  cursor: pointer;
}

.nonterminalSymbol:hover {
  /* background-color: rgb(0, 0, 50, 0.1); */
  /* cursor: pointer; */
}
</style>

<script lang="ts">
import { defineComponent } from "vue";
import { SentinelForm } from "./types";

export default defineComponent({
  // type inference enabled

  props: {
    index: Number,
    activeProductionIndex: Number,
    productions: Array,
  },

  data() {
    let parentData = this.$parent?.$data as SentinelForm;
    console.log(parentData);

    return {
      object: parentData.list[this.index || 0],
      isActive: parentData.activeProductionIndex == this.index,
    };
  },

  emits: ["applyProduction"],

  methods: {
    activate() {
      console.log("Ran click event");
      this.$emit("applyProduction", this.index);
    },
  },
});
</script>