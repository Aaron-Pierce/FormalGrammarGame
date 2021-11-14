<template>
  <span :class="{ nonterminalSymbol: object.kind == 'Nonterminal', activated: activeIndex == this.index }" @click="activate">
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
  background-color: rgb(0, 255, 50, 0.25)!important;
}

.nonterminalSymbol:hover {
  background-color: rgb(0, 0, 50, 0.1);
  cursor: pointer;
}
</style>

<script lang="ts">
import { defineComponent } from "vue";
import { SentinelForm } from "./types";

export default defineComponent({
  // type inference enabled

  props: {
    index: Number,
    activeIndex: Number
  },

  data() {
    let parentData = this.$parent?.$data as SentinelForm;
    console.log(parentData);

    return {
      object: parentData.list[this.index || 0],
      isActive: parentData.activeIndex == this.index
    };
  },

  emits: ["activated"],

  methods: {
    activate(){
      if(this.object.kind == "Nonterminal"){
        this.$emit("activated", this.index);
      }
    }
  },
});
</script>