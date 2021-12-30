<template>
  <div class="carouselContainer">
    <div class="shadow"></div>
    <n-carousel class="carousel" show-arrow>
      <div id="featuredTrail">
        <div id="featuredTrailText">
          <span id="featuredTrailLabel">Featured Trail</span>
          <span id="featuredTrailName">trail name</span>
        </div>
        <img class="carousel-img" src="../assets/imgs/hiking.jpg" />
      </div>
    </n-carousel>
  </div>
</template>

<script>
import { NCarousel } from "naive-ui";

export default {
  name: "FeaturedTrails",
  components: {
    NCarousel,
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.carouselContainer {
  position: relative;
}

.carousel {
  line-height: 0;
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

#featuredTrailText {
  display: flex;
  flex-direction: column;
  align-text: center;
  position: absolute;
  bottom: 0;
  z-index: 1;
  line-height: 1;
  background-color: $primaryLight;
  box-shadow: $shadow;
  margin: 0 0 35px 20px;
  padding: 5px;
  border-radius: 4px;
  row-gap: 5px;
}

#featuredTrailLabel {
  font-size: 1rem;
  font-weight: bold;
  text-align: center;
}

#featuredTrailName {
  font-style: italic;
  text-align: center;
  width: 85%;
}
</style>
