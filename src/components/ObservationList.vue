<template>
  <div class="observationContainer">
    <div class="title"><h3>Recent Nature Sightings</h3></div>
    <div class="listContainer">
      <li
        class="observation"
        v-for="(observation, index) in observations"
        :key="index"
      >
        <img class="observationImg" :src="observation.photos[0].medium_url" />
        <a class="logoContainer" :href="observation.uri" target="_blank">
          <img
            class="inaturalistLogo"
            src="../assets/imgs/inaturalist.svg"
            alt="inaturalist logo"
          />
        </a>
        <div class="observationInfoCard">
          <div class="observationSpecies">{{
            observation.species_guess
          }}</div>
          <div class="observationInfo">
            <div class="observationDate">
              Observed on {{ observation.observed_on }}
            </div>
            <div class="observer">
              &nbsp;by <span>{{ observation.user.login }}</span>
            </div>
          </div>
        </div>
      </li>
    </div>
  </div>
</template>

<script>
import inaturalistService from "../services/inaturalist.service";
import trailsService from "../services/trail.service";

export default {
  name: "ObservationList",
  props: ["trail"],

  data() {
    return { observations: [] };
  },

  methods: {
    async getObservations(trail) {
      let extent = await trailsService.getTrailExtent([trail.id]);
      this.observations = await inaturalistService.getObservations(extent);
    },
  },

  watch: {
    trail: function (val) {
      this.getObservations(val);
    },
  },
};
</script>

<style scoped lang="scss">
span {
  color: $highlightTwo;
}
.observationContainer {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 30rem;
  width: 100%;
  color: $primaryDark;
}
.title {
  width: 90%;
  display: flex;
  align-items: flex-start;
}
.observation {
  @include flexCenter();
  overflow: visible;
  position: relative;
  width: 95%;
  list-style: none;
  height: fit-content;
  margin: 0 auto 25px auto;
  border: 1px solid #e4ebf8;
  border-radius: 10px;
  box-shadow: $shadowLight;
  overflow: hidden;
}
.observationImg {
  height: 8rem;
  width: 100%;
  object-fit: cover;
  opacity: 80%;
}
.logoContainer {
  position: absolute;
  top: 0;
  right: 0;
  padding: 10px;
  background: $primaryLight;
  box-shadow: 3px 3px 5px RGB(0 0 0 / 10%);
  display: flex;
  padding: 2px;
  margin: 5px;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
}
.logoContainer:hover {
  padding: 3px;
  margin: 4px;
}
.inaturalistLogo {
  height: 1.8rem;
  width: 1.8rem;
}
.listContainer {
  list-style: none;
  padding: 0;
  width: 100%;
  overflow-y: scroll;
}
.observationInfoCard {
  display: flex;
  flex-direction: column;
  background: $primaryLight;
  color: $primaryDark;
  width: 100%;
  height: fit-content;
  align-items: flex-start;
  justify-content: center;
  padding: 10px;
}
.observationInfoCard > * {
  margin-left: 10px;
}
.observationInfo {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  font-size: 0.85rem;
  height: fit-content;
}
.observationSpecies {
  font-size: 1rem;
  text-align: start;
  font-weight: bold;
  font-family: inter, sans-serif;
  border-bottom: 3px solid $highlightTwo;
  margin-bottom: 5px;
}
</style>
