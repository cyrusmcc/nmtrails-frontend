<template>
  <div class="container">
    <div class="trailInfo">
      <div class="trailHeader">
        <h3 class="trailName">{{ trail.name }}</h3>
        <div class="trailRating">
          <NRate
            color="#4fb233"
            readonly
            allow-half
            size="small"
            :default-value="trail.rating"
          />
        </div>
      </div>
      <button class="button toHikeButton">Add to hike list</button>
    </div>
    <div class="trailImgContainer">
      <img :src="trail.imageUrl" class="trailImg" />
    </div>
    <observation-list :trail="trail"></observation-list>
  </div>
</template>

<script>
import trailService from "../services/trail.service";
import ObservationList from "../components/ObservationList.vue";
import { NRate } from "naive-ui";

export default {
  name: "TrailPage",
  components: { ObservationList, NRate },

  data() {
    return {
      trail: {},
    };
  },

  mounted() {
    const getTrails = async () => {
      this.trail = await trailService.getTrailById(this.$route.params.id);
    };
    getTrails();
  },
};
</script>

<style scoped lang="scss">
.container {
  @include flexCenter();
  text-align: center;
}
.trailImgContainer {
  @include flexCenter();
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 10px;
}
.trailImg {
  height: inherit;
  width: inherit;
  object-fit: cover;
  height: 200px;
  overflow: visible;
  width: 100%;
}

.trailInfo {
  width: 95%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 5px 0;
}

.trailName {
  margin: 0;
  font-style: italic;
}
.trailRating {
}
.toHikeButton {
  margin: 0;
  padding: 0 4px;
  border: 2px solid $highlightTwo;
  font-size: 0.9em;
  background: none;
  border-radius: 20px; 
  color: $highlightTwo;
  font-weight: bold;
  line-height: 1.8rem;
}
</style>