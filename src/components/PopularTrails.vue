<template>
  <div class="listContainer">
    <h2>Popular Trails</h2>
    <ol id="popularTrailList">
      <li v-for="(trail, index) in popularTrails" :key="index">
        <div id="trailImgContainer">
          <img v-bind:src="trail.imageUrl" class="trailImg" alt="" />
        </div>
        <div id="trailInfoContainer">
          <div id="trailName">
            <router-link :to="'/t/' + trail.id">{{ trail.name }}</router-link>
          </div>
          <div id="trailRating">
            <n-rate
              color="#4fb233"
              allow-half
              readonly
              :value="trail.avgRating"
            ></n-rate>
          </div>
        </div>
      </li>
    </ol>
  </div>
</template>

<script>
import { NRate } from "naive-ui";
import trailService from "@/services/trail.service";

export default {
  name: "PopularTrails",
  components: {
    NRate,
  },
  data() {
    return {
      popularTrails: [],
    };
  },

  computed: {
    trailsArr() {
      return this.$store.getters["trail/getTrails"];
    },
  },

  mounted() {
    if (this.popularTrails.length === 0) {
      const trails = async () => {
        const arr = await trailService.getPopularTrails();
        for (let i = 0; i < arr.length; i++) {
          this.popularTrails.push(arr[i]);
        }
      };
      trails();
    }
  },
};
</script>

<style scoped lang="scss">
h2 {
  font-size: 1.4em;
  width: 95%;
  margin: 30px 0 15px 0;
  padding: 0;
}
li {
  box-sizing: border-box;
}
.listContainer {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

#popularTrailList {
  @include flexCenter();
  row-gap: 15px;
  width: 100%;
  padding: 0;
  margin-top: 0;
}

#popularTrailList > li {
  display: flex;
  flex-direction: row;
  align-items: center;
  list-style-type: none;
  border: 1px solid $outline;
  border-radius: 4px;
  height: 150px;
  width: 95%;
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin: 10px auto;
}

#trailImgContainer {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 200px;
  border-radius: 4px 0 0 4px;
  overflow: hidden;
}

.trailImg {
  height: inherit;
  width: inherit;
  object-fit: cover;
}

#trailInfoContainer {
  height: 90%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  row-gap: 3px;
}

#trailName {
  text-align: center;
  font-style: italic;
  color: $primaryLight;
  font-style: italic;
}
@include screen-md() {
#popularTrailList > li {
  width: 100%;
}
}
</style>
