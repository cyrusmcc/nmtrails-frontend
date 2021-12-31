<template>
  <div class="carouselContainer">
    <div class="shadow"></div>
    <n-carousel class="carousel" show-arrow autoplay>
      <div class="trail" v-for="(trail, index) in featuredTrails" :key="index">
        <div class="featuredTrailText">
          <span class="featuredTrailLabel">Featured Trail</span>
          <router-link
            class="featuredTrailName"
            :to="'/t/' + trail.id"
            >{{ trail.name }}</router-link
          >
        </div>
        <img class="carousel-img" :src="trail.imageUrl" />
      </div>
    </n-carousel>
  </div>
</template>

<script>
import trailService from "@/services/trail.service";
import { NCarousel } from "naive-ui";

export default {
  name: "FeaturedTrails",
  components: {
    NCarousel,
  },
  data() {
    return {
      featuredTrails: [],
    };
  },
  mounted() {
    const trails = async () => {
      const arr = await trailService.getFeaturedTrails();
      this.featuredTrails = arr;
    };
    trails();
  },
};
</script>
<style lang="scss" scoped>
.carouselContainer {
  position: relative;
  width: 100%;
  height: 240px;
}

.carousel {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}

.carousel-img {
  width: 100%;
  height: 240px;
  object-fit: cover;
}

.shadow {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 240px;
  z-index: 2;
  box-shadow: $shadowInset;
  pointer-events: none;
}

.featuredTrailText {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  position: absolute;
  bottom: 0;
  max-height: 3.2rem;
  width: 8rem;
  margin: 0 0 35px 20px;
  padding: 3px;
  z-index: 1;
  background-color: $primaryLight;
  border-radius: 4px;
  border: 1px solid $outline;
  box-shadow: $shadowLight;
}

.featuredTrailLabel {
  font-size: 1rem;
  font-weight: bold;
  text-align: center;
}

.featuredTrailName {
  font-style: italic;
  text-align: center;
  -webkit-line-clamp: 1;
  display: block;
  text-overflow: ellipsis;
  overflow: hidden;
  width: 100%;
  pointer-events: all;
  cursor: pointer;
}
</style>
