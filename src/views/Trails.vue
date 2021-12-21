<template>
  <div class="container">
    <search-bar v-on:search="onSearch"></search-bar>
    <trail-list  v-bind:trails="trails"/>
  </div>
</template>

<script>
import TrailList from "@/components/TrailList.vue";
import SearchBar from "@/components/SearchBar.vue";
import { trails } from "../services/http-commons";

export default {
  components: { TrailList, SearchBar },
  name: "Trails",
  data() {
    return {
      trails: []
    };
  },

  methods: {
    onSearch(search) {
      trails.get("/",
        {params : {pageSize : 10, page : 0, name : search}}
      ).then(response => {
        console.log(response);
        this.trails = response.data;
      });
    }
  }
};
</script>

<style scoped lang="scss">
.container {
  @include flexCenter();
  row-gap: 10px;
}
</style>