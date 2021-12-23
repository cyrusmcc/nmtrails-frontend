<template>
  <div class="listContainer">
    <h2>Popular Trails</h2>
    <ol id="popularTrailList">
      <li v-for="(trail, index) in popularTrails" :key="index">
        <div id="trailImgContainer">
          <img v-bind:src="trail.imageUrl" class="trailImg" alt="" />
          <!--
          <img
            class="trailImg"
            :src="getImgFromTrailId(index, trail.id)"
            alt="blog post cover image"
            onload="this.style.display='block'"
          />
          -->
        </div>
        <div id="trailInfoContainer">
          <div id="trailName">
            <router-link :to="'/t/' + trail.id">{{ trail.name }}</router-link>
          </div>
          <div id="trailRating">
            <n-rate color="#4fb233" allow-half readonly :default-value="trail.rating"></n-rate>
          </div>
          <!--<ol id="trailTagList">
            <li v-for="(tag, index) in trail.post.tags" :key="index">
              <div class="trailTag">{{ tag.value }}</div>
            </li>
          </ol>-->
        </div>
      </li>
    </ol>
  </div>
</template>

<script>
import { NRate } from "naive-ui";
import { trails } from "../services/http-commons";

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

  methods: {
    async fetchTrails() {
      trails.get(
        "/", { params : {pageSize : 2, page : 2}}
      ).then(response => {
        this.popularTrails = response.data;
      });
    }
  },

  mounted() {
    this.fetchTrails();
  }
};
</script>

<style scoped lang="scss">
h2 {
  font-size: 1.2em;
  width: 95%;
  margin: 30px 0 0 0;
  padding: 0;
}

.listContainer {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

#popularTrailList {
  width: 100%;
  padding: 0;
  margin-top: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

#popularTrailList > li {
  display: flex;
  flex-direction: row;
  align-items: center;
  list-style-type: none;
  margin-bottom: 10px;
  height: 150px;
  width: 95%;
  //box-shadow: $shadowLight;
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
  height: 125px;
  width: 125px;
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

#trailTagList {
  width: 95%;
  padding: 0;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-content: flex-start;
  column-gap: 5px;
}

#trailTagList > li {
  list-style-type: none;
}

.trailTag {
  height: fit-content;
  width: fit-content;
  background-color: #92af05;
  padding: 1px 10px;
  font-size: 0.8rem;
  border-radius: 8px;
  margin-top: 10px;
}

#trailName {
  text-align: center;
  font-style: italic;
  color: $primaryLight;
  font-style: italic;
}
</style>