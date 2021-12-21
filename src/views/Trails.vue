<template>
  <div class="container">
    <search-bar v-on:search="onSearch"></search-bar>
    <trail-list v-bind:trails="trails" 
                v-bind:hasSearched="hasSearched" />
    <a v-if="hasSearched" class="navLink" v-on:click="loadMore">Load More</a>
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
      trails: [],
      hasSearched: false
    };
  },

  methods: {
    onSearch(search) {
      trails.get("/",
        {params : {pageSize : 10, page : 0, name : search}}
      ).then(response => {
        this.trails = response.data;
      });

      this.search = search;
      this.currPage = 0;
      this.hasSearched = true;
    },

    loadMore() {
      this.currPage++;
      trails.get("/",
        {params : {pageSize : 10, page : this.currPage, name : this.search}}
      ).then(response => {
        this.trails.push(...response.data);
      });
    }
  },

  mounted() {
    window.setInterval(this.checkScroll, 500);
  },

  unmounted() {
    window.removeEventListener('scroll', this.onScroll);
  }
};
</script>

<style scoped lang="scss">
.container {
  @include flexCenter();
  row-gap: 10px;
  overflow-y: scroll;
}
</style>