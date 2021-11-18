<template>
  <div id="levelSelectWrapper">
    <div v-if="currentLevelIndex === null" id="levelSelectGrid">
      <div
        class="levelButton"
        v-for="(level, index) in Levels"
        :key="index"
        @click="loadLevel(index)"
        :class="{ completed: isComplete(index) }"
      >
        <h1>{{ index }}</h1>
      </div>
    </div>


    <level
      :key="currentLevelIndex"
      v-if="currentLevelIndex !== null && currentLevelIndex !== 13"
      :startstring="Levels[currentLevelIndex].startString"
      :targetstring="Levels[currentLevelIndex].targetString"
      :productionstrings="Levels[currentLevelIndex].productionStrings"
      :levelIndex="currentLevelIndex"
      @completed="completedLevel"
      @restart="restartLevel"
    >
    </level>

    <bird-level
      v-if="currentLevelIndex === 13"
      @completed="completedLevel"
      @restart="restartLevel"
    ></bird-level>
  </div>
</template>

<style scoped>
#levelSelectWrapper {
  width: 100%;
}

#levelSelectGrid {
  display: grid;
  grid-template-rows: 1fr 1fr 1fr 1fr 1fr;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  row-gap: 1em;
  column-gap: 1em;
}

.levelButton {
  border: 2px solid black;
  border-radius: 5px;
  text-align: center;
  transition: background-color 0.15s ease-in-out;
}

.levelButton .name {
  margin-bottom: 0.25em;
  margin-top: 0.25em;
  padding-bottom: 0;
}

.levelButton hr {
  margin-top: 0;
}

.levelButton:hover {
  cursor: pointer;
  background-color: rgba(0, 255, 0, 0.2);
}

.completed {
  background-color: rgba(0, 255, 0, 0.2);
}

@media only screen and (max-width: 7in) {
  #levelSelectGrid {
    grid-template-rows: auto;
    grid-template-columns: 1fr 1fr 1fr;
  }
}
</style>

<script lang="ts">
import { defineComponent } from "vue";
import { LevelObject, Levels } from "./levels";
import Level from "./Level.vue";
import BirdLevel from "./BirdLevel.vue";

type LevelSelectData = {
  Levels: LevelObject[];
  currentLevelIndex: number | null;
};

export default defineComponent({
  // type inference enabled

  data() {
    return {
      Levels: Levels,
      currentLevelIndex: null,
    } as LevelSelectData;
  },

  methods: {
    loadLevel(index: number) {
      console.log("loading", index);
      this.currentLevelIndex = index;
      console.log("Selected level: ", this.Levels[this.currentLevelIndex]);
    },
    completedLevel() {
      this.currentLevelIndex = null;
    },
    restartLevel() {
      if (this.currentLevelIndex === null) return;
      let oldValue = this.currentLevelIndex + 0;
      this.currentLevelIndex = null;
      requestAnimationFrame(() => {
        this.currentLevelIndex = oldValue;
      });
    },
    isComplete(index: number) {
      return (
        JSON.parse(localStorage.getItem("completedLevels") || "{}")[index] ===
        true
      );
    },
  },

  components: {
    Level,
    BirdLevel,
  },
});
</script>