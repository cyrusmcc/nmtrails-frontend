<template>
  <div class="container">
    <search-bar v-on:search="onSearch"></search-bar>
    <trail-list />
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
    return {};
  },

  methods: {
    onSearch(search) {
      console.log(search);
      trails.get("/",
        {params : {pageSize : 10, page : 1, name : search}}
      ).then(response => {
        console.log(response);
        TrailList.trailArr = response.data;
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