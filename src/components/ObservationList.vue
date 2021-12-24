<template>
  <div class="observationContainer">
    <h3>Recent Nature Sightings</h3>
    <nobr>
      <li v-for="(observation, index) in observations" :key="index">
        <a v-bind:href="observation.uri">{{observation.species_guess}}</a>
      </li>
    </nobr>
  </div>
</template>

<script>
import inaturalistService from "../services/inaturalist.service";

export default {
  name: "ObservationList",
  props: ["trail"],

  data() {
    return {observations: []};
  },

  mounted() {
    const getObservations = async () => {
      this.observations = await inaturalistService.getObservations();
    }
    getObservations();
  }
}
</script>

<style scoped lang="scss">
#container, li {
  overflow: visible;
}
</style>
