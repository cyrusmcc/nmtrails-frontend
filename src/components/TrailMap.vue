<template>
  <div class="mapContainer">
    <img
      id="mapBackground"
      src="../assets/imgs/green-gradient.svg"
      alt="gradient background"
    />
    <l-map
      id="map"
      :options="{ attributionControl: false }"
      :zoom="zoom"
      ref="map"
    >
      <l-tile-layer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      ></l-tile-layer>
      <l-geo-json
        :geojson="geojson"
        :options="geojsonOptions"
        ref="gjElem"
      ></l-geo-json>
      <l-polygon :lat-lngs="polygon.latlngs" :color="polygon.color" />
    </l-map>
  </div>
</template>

<script>
import "leaflet/dist/leaflet.css";
import { LMap, LTileLayer, LGeoJson, LPolygon } from "@vue-leaflet/vue-leaflet";
import trailService from "@/services/trail.service";
//import { geoJSON } from "leaflet";

export default {
  name: "TrailMap",
  components: {
    LMap,
    LGeoJson,
    LPolygon,
    LTileLayer,
  },

  props: ["trails"],

  data() {
    return {
      geojson: {
        type: "FeatureCollection",
        features: [],
      },
      geojsonOptions: {
        style: {
          color: "#ff8888",
          weight: 2,
          opacity: 1,
        },
        wrapLatLng: true,
      },
      zoom: 20,
      polygon: {
        latlngs: [],
        color: "#5f761a",
      },
    };
  },

  methods: {
    async getExtent() {
      const trailIds = this.trails.map((trail) => trail.id);
      trailService.getTrailExtent(trailIds).then((response) => {
        this.setBounds(
          response.coordinates[0].map((coord) => {
            // swap the coordinate pairs, since it is arranged in the other
            // order on the backend
            return [coord[1], coord[0]];
          })
        );
      });
    },

    setBounds(bounds) {
      console.log(bounds);
      this.polygon.latlngs = bounds;
      this.$refs.map.leafletObject.fitBounds(bounds);
    },
  },

  watch: {
    trails: function (newVal) {
      newVal;
      /*
      newVal.forEach((trail) => {
        trail.segments.forEach((segment) => {
          this.geojson.features.push({
            geometry: segment.track,
          });
        });
      });
      */
      this.getExtent();
    },
  },
};
</script>

<style scoped lang="scss">
.mapContainer {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 100%;
  height: 12rem;
  margin-top: 30px;
}

#mapBackground {
  position: absolute;
  left: 0;
  right: 0;
  margin: 0 auto 0 auto;
  width: 95%;
  height: 100%;
  box-shadow: $shadowLight;
  border-radius: 4px;
}

#map {
  max-width: 92%;
  max-height: 93%;
  border-radius: 4px;
  z-index: 0;
}
</style>