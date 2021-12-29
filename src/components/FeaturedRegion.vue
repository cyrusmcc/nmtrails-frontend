<template>
  <trail-map :trails="regionTrails"></trail-map>
</template>

<script>
import trailMap from "./TrailMap.vue";
import regionService from "@/services/region.service";

export default {
  name: "FeaturedRegion",
  components: { trailMap },

  data() {
    return {
      regionTrails: [],
    };
  },

  mounted() {
      this.getFeaturedRegionTrails();
  },

  methods: {
    getFeaturedRegionTrails() {
      regionService.getFeaturedRegion().then((response) => {
        regionService.getFeaturedRegionTrails(response.id).then((response) => {
          this.regionTrails = response;
        });
      });
    },
  },
};
</script>