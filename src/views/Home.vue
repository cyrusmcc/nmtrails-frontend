<template>
  <div class="home">
    <featured-trails></featured-trails>
    <featured-region></featured-region>
    <!--
    <popular-trails></popular-trails>
    -->
  </div>
</template>

<script>
import FeaturedTrails from "../components/FeaturedTrails.vue";
import FeaturedRegion from "../components/FeaturedRegion.vue";
//import PopularTrails from "../components/PopularTrails.vue";

export default {
  name: "Home",
  components: {
    FeaturedTrails,
    FeaturedRegion,
    //PopularTrails,
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.home {
  width: 100%;
  height: 100%;
  max-height: fit-content;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
