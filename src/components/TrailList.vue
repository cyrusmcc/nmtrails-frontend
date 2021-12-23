<template>
  <div class="listContainer">
    <h2 v-if="!hasSearched">Press enter to search.</h2>
    <h2 v-if="hasSearched && !trails.length">No results.</h2>
    <ol class="trailList">
      <li v-for="(trail, index) in trails" :key="index">
        <div class="trailContainer">
          <div class="shadow"></div>
          <img v-bind:src="trail.imageUrl" class="trailImg" alt="" />
          <!--
          <img
            class="trailImg"
            :src="getImgFromTrailId(index, trail.id)"
            alt="trail image"
            onload="this.style.display='block'"
          />
          -->
          <div class="trailInfoContainer">
            <div class="trailName">
              <router-link :to="'/t/' + trail.id">{{ trail.name }}</router-link>
            </div>
            <div class="trailRating">
              <NRate
                color="#4fb233"
                readonly
                allow-half
                :default-value="trail.rating"
              />
            </div>
            <ol class="trailTagList">
              <li v-for="(tag, index) in trail.tags" :key="index">
                <div class="trailTag">{{ tag.value }}</div>
              </li>
            </ol>
          </div>
        </div>

        <!--
        <div class="trailInfoContainer">
          <div class="trailTitle">
            <router-link :to="'/t/' + trail.id">{{
              trail.title
            }}</router-link>
          </div>
          <ol class="trailTagList">
            <li v-for="(tag, index) in trail.tags" :key="index">
              <div class="trailTag">{{ tag.value }}</div>
            </li>
          </ol>
        </div>
        -->
      </li>
    </ol>
  </div>
</template>

<script>
import { NRate } from "naive-ui";
//import trailService from "../services/trail.service";


export default {
  name: "TrailList",
  components: {
    NRate,
  },

  props: ["trails", "hasSearched"],

  data() {
    return {};
  },

  mounted() {
    console.log(this.hasSearched);
  },
};
</script>

<style scoped lang="scss">
.listContainer {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}
.trailList {
  width: 100%;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.trailList > li {
  display: flex;
  flex-direction: row;
  align-items: center;
  list-style-type: none;
  width: 100%;
  box-shadow: $shadowLight;
}
.trailContainer {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  height: 200px;
  width: 100%;
}
.shadow {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
  box-shadow: $shadowInset;
  pointer-events: none;
}
.trailImg {
  height: inherit;
  width: inherit;
  object-fit: cover;
}
.trailInfoContainer {
  position: absolute;
  height: fit-content;
  bottom: 0;
  left: 0;
  margin: 10px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.trailTagList {
  width: 95%;
  padding: 0;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-content: flex-start;
  column-gap: 5px;
}
.trailTagList > li {
  list-style-type: none;
}
.trailTag {
  height: fit-content;
  width: fit-content;
  background-color: $primaryLight;
  padding: 1px 10px;
  font-size: 0.8rem;
  border-radius: 8px;
  margin-top: 10px;
  box-shadow: $shadowLight;
}
.trailName {
}
.trailName > a {
  color: $primaryLight;
  font-style: italic;
  text-shadow: black 0.1em 0.1em 0.2em;
  font-size: 1.1rem;
}
</style>
