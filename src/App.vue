<template>
<main>
  <level

    :startstring="'S'"

    :productionstrings="[
      ['S', 'aSb'],
      ['S', 'SS'],
      ['S', ''],
    ]"

  ></level>
  </main>
</template>

<style scoped>

</style>

<script lang="ts">
import { defineComponent } from "vue";
import Level from "./components/Level.vue";

export default defineComponent({
  // type inference enabled
  data() {
    return {};
  },
  components: {
    Level,
  },
});
</script>