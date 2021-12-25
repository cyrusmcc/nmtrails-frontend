<template>
  <div class="observationContainer">
    <h3>Recent Nature Sightings</h3>
      <li v-for="(observation, index) in observations" :key="index">
        <a v-bind:href="observation.uri">{{observation.species_guess}}</a>
      </li>
  </div>
</template>

<script>
import inaturalistService from "../services/inaturalist.service";
import trailsService from "../services/trail.service";

export default {
  name: "ObservationList",
  props: ["trail"],

  data() {
    return {observations: []};
  },

  methods: {
    async getObservations(trail) {
      console.log(this.trail);
      let extent = await trailsService.getTrailExtent([trail.id]);
      console.log(extent);
      this.observations = await inaturalistService.getObservations(extent);
    }
  },

  watch: {
    trail: function(val) {
      console.log("what");
      this.getObservations(val);
    }
  }
}
</script>

<style scoped lang="scss">
#container, li {
  overflow: visible;
}
</style>
