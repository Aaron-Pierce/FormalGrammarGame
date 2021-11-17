<template>
  <main>
    <div id="gameArea">
      <div id="header">
        <h1>The Formal Grammar Game</h1>
        <hr>
      </div>
      <div id="gameWrapper">
        <level-select></level-select>
      </div>
    </div>
  </main>
</template>

<style scoped>
main {
  width: 7.5in;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: "Computer Modern Serif", serif;
}


#header > h1{
  margin-bottom: 0;
}

#gameArea {
  width: 80%;
  height: 95%;
  margin-top: 5%;
}

#gameWrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

@media only screen and (max-width: 7in) {
  main{
    width: 90vw;
  }
}
</style>

<script lang="ts">
import { defineComponent } from "vue";
import Level from "./components/Level.vue";
import LevelSelect from "./components/LevelSelect.vue";

export default defineComponent({
  // type inference enabled
  data() {
    return {};
  },
  components: {
    Level,
    LevelSelect
  },
});
</script>