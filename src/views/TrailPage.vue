<template>
    <div class="container">
        <h1>{{ trail.name }}</h1>
        <img v-bind:src="trail.imageUrl" class="trailImg"/>
        <observation-list v-bind:trail="trail"></observation-list>
    </div>
</template>

<script>
import trailService from "../services/trail.service";
import ObservationList from "../components/ObservationList.vue";

export default {
    name: "TrailPage",
    components: { ObservationList },
    
    data() {
        return {
            trail: {}
        };
    },

    mounted() {
        const getTrails = async () => {
            this.trail = await trailService.getTrailById(
                this.$route.params.id
            );
        }
        getTrails();
    }
};
</script>

<style scoped lang="scss">
h1 {
  overflow: visible;
}

.container {
  @include flexCenter();
  text-align: center;
  row-gap: 10px;
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