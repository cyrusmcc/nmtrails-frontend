<template>
    <trail-map v-bind:trails="regionTrails"></trail-map>
</template>

<script>
import TrailMap from "./TrailMap.vue"
import { regions } from "../services/http-commons"

export default {
    name: "FeaturedRegion",
    components: { TrailMap },

    data() {
        return {
            regionTrails : []
        };
    },

    methods : {
        async getFeaturedRegion() {
            regions.get(
                "/featured"
            ).then(response => {
                regions.get(
                    `/${response.data.id}/trails`
                ).then(response2 => {
                    this.regionTrails = response2.data;
                })
            });
        }
    },

    mounted() {
        this.getFeaturedRegion();
    }
}
</script>