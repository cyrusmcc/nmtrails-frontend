<template>
    <div class="container">
        <h1>{{ trail.name }}</h1>
        <img v-bind:src="trail.imageUrl" class="trailImg"/>
    </div>
</template>

<script>
import { trails } from "../services/http-commons";

export default {
    name: "TrailPage",
    
    data() {
        return {
            trail: {}
        };
    },

    mounted() {
        trails.get(
            "/" + this.$route.params.id
        ).then(response => {
            this.trail = response.data
        });
    }
};
</script>

<style scoped lang="scss">
.container {
  @include flexCenter();
  row-gap: 10px;
  overflow-y: scroll;
}

.trailImg {
  height: inherit;
  width: inherit;
  object-fit: cover;
  height: 200px;
  overflow: visible;
  width: 100%;
}
</style>