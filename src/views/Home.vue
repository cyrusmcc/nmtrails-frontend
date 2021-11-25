<template>
  <div class="home">
    <n-carousel show-arrow>
      <img
        class="carousel-img"
        src="../assets/hiking.jpg"
      />
    </n-carousel>
  </div>
</template>

<script>
import { NCarousel } from "naive-ui";

export default {
  name: "Home",
  components: {
    NCarousel,
  },
};
</script>

<style lang="scss" scoped>
.carousel-img {
  width: 100%;
  height: 240px;
  object-fit: cover;
}
</style>
