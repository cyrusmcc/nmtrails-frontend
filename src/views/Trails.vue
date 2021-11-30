<template>
  <div class="container">
    <search-bar></search-bar>
    <trail-list />
  </div>
</template>

<script>
import TrailList from "@/components/TrailList.vue";
import SearchBar from "@/components/SearchBar.vue";
export default {
  components: { TrailList, SearchBar },
  name: "Trails",
  data() {
    return {};
  },
};
</script>

<style scoped lang="scss">
.container {
  @include flexCenter();
  row-gap: 10px;
}
</style>