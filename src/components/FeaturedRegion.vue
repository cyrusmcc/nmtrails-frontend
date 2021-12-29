<template>
  <trail-map :trails="regionTrails" :regionName="regionName"></trail-map>
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
      regionName: "",
    };
  },

  mounted() {
      this.getFeaturedRegionTrails();
  },

  methods: {
    getFeaturedRegionTrails() {
      regionService.getFeaturedRegion().then((response) => {
        this.regionName = response.name;
        regionService.getFeaturedRegionTrails(response.id).then((response) => {
          this.regionTrails = response;
        });
      });
    },
  },
};
</script>