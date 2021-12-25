<template>
  <div class="container">
    <search-bar @search="onSearch"></search-bar>
    <trail-list :trails="trailsArr" :hasSearched="hasSearched" />
    <button class="button" v-if="trailsArr && trailsArr.length >= 10" @click="loadMore">Load more</button>
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
        this.$store.state.trail.trailArr = arr;
      };
      trails();
    },
    getInitialTrails() {
      const trails = async () => {
        const arr = await trailService.getTrails(true);
        this.$store.state.trail.trailArr = arr;
      };
      trails();
    },
    loadMore() {
      const trails = async () => {
        const arr = await trailService.getTrails();
        for (let i = 0; i < arr.length; i++) {
          this.$store.state.trail.trailArr.push(arr[i]);
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
      this.getInitialTrails();
    }
  },
  watch: {
    $route() {
      if (!window.location.search) {
        this.getInitialTrails();
      }
    },
  },
};
</script>

<style scoped lang="scss">
.container {
  @include flexCenter();
  row-gap: 10px;
  overflow-y: scroll;
}
.button {
  margin-top: 20px;
}
</style>
