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
      <div
        class="polyLineContainer"
        v-for="(polyline, index) in polylines"
        :key="index"
      >
        <l-polyline
          @click="toTrailPage(polyline.trail.id)"
          class="polyline"
          :lat-lngs="polyline.latlngs"
          :color="polyline.color"
        />
      </div>
    </l-map>
    <span class="regionName" v-if="regionName">{{ regionName }}</span>
  </div>
</template>

<script>
import "leaflet/dist/leaflet.css";
import {
  LMap,
  LTileLayer,
  LGeoJson,
  LPolygon,
  LPolyline,
} from "@vue-leaflet/vue-leaflet";
import trailService from "@/services/trail.service";
//import { geoJSON } from "leaflet";

export default {
  name: "TrailMap",
  components: {
    LMap,
    LGeoJson,
    LPolygon,
    LPolyline,
    LTileLayer,
  },

  props: ["trails", "regionName"],

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
        color: "#5eabff",
      },
      polylines: [],
      page: "Trail Page",
    };
  },

  methods: {
    getExtent() {
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
    async setBounds(bounds) {
      this.polygon.latlngs = bounds;
      if (this.$refs.map) this.$refs.map.leafletObject.fitBounds(bounds);
    },
    toTrailPage(trailId) {
      this.$router.push("/t/" + trailId);
    },
  },

  watch: {
    trails: function (newVal) {
      for (let i = 0; i < newVal.length; i++) {
        for (let j = 0; j < newVal[i].segments.length; j++) {
          let latlngs = newVal[i].segments[j].track.coordinates.map((coord) => {
            return [coord[1], coord[0]];
          });
          this.polylines.push({
            latlngs: latlngs,
            color: "#5eabff",
            trail: newVal[i],
          });
        }
      }

      this.getExtent();
    },
  },
};
</script>

<style scoped lang="scss">
.mapContainer {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 100%;
  height: 15rem;
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
  max-width: 93%;
  max-height: 96%;
  border-radius: 4px;
  margin: 5px 0;
  z-index: 0;
}
.regionName {
  z-index: 1;
  margin: 10px;
  font-size: 1.2rem;
  color: $primaryLight;
  border-bottom: 2px solid $primaryLight;
  text-shadow: 2px 8px 6px RGB(0 0 0 / 18%),
    0px -5px 35px RGB(255 255 255 / 60%);
  text-align: center;
  width: 85%;
}
.polyline:hover {
  cursor: pointer;
}
</style>