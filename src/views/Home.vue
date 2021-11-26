<template>
  <div class="home">
    <featured-trails></featured-trails>
    <featured-region></featured-region>
  </div>
</template>

<script>
import FeaturedTrails from "../components/FeaturedTrails.vue";
import FeaturedRegion from "../components/FeaturedRegion.vue";

export default {
  name: "Home",
  components: {
    FeaturedTrails,
    FeaturedRegion,
  },
  data() {
    return {
    };
  },
};
</script>

<style lang="scss" scoped>
.home {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
