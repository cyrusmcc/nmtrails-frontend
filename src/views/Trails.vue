<template>
  <div class="container">
    <search-bar @search="onSearch"></search-bar>
    <trail-list :trails="trails" :hasSearched="hasSearched" />
    <a v-if="hasSearched" class="navLink" @click="loadMore">Load More</a>
  </div>
</template>

<script>
import TrailList from "@/components/TrailList.vue";
import SearchBar from "@/components/SearchBar.vue";
import trailService from "../services/trail.service";

export default {
  components: { TrailList, SearchBar },
  name: "Trails",
  data() {
    return {
      trails: [],
      hasSearched: false,
    };
  },

  computed: {
    trailsArr() {
      return this.$store.getters["trail/getTrails"];
    },
  },

  methods: {
    onSearch(searchTerm) {
      let params = new URLSearchParams(this.$router.currentRoute.value.query);
      params.set("search", searchTerm);
      this.$router.push("/trails?" + params.toString());

      const trails = async () => {
        const arr = await trailService.getTrailsByName(searchTerm);
        this.trails = arr;
      };
      trails();
    },
    getTrails() {
      const trails = async () => {
        const arr = await trailService.getTrails();
        for (let i = 0; i < arr.length; i++) {
          this.trails.push(arr[i]);
        }
      };
      trails();
    },
  },

  mounted() {
    if (window.location.search) {
      let params = new URLSearchParams(this.$router.currentRoute.value.query);
      this.onSearch(params.get("search"));
    } else {
      this.getTrails();
    }
  },
  /* When trail route-link is resubmitted but not remounted, need to fix this
  watch: {
    $route() {
      if (!window.location.search) {
        const trails = async () => {
          const arr = await trailService.getTrails();
          this.trails = arr;
        };
        trails();
      }
    },
  },
  */
};
</script>

<style scoped lang="scss">
.container {
  @include flexCenter();
  row-gap: 10px;
  overflow-y: scroll;
}
</style>
