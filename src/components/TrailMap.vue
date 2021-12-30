<template>
  <div class="mapContainer">
    <l-map
      id="map"
      :options="{ attributionControl: false }"
      :zoom="zoom"
      ref="map"
      v-if="trailsArr"
    >
      <l-tile-layer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      ></l-tile-layer>
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
  LPolygon,
  LPolyline,
} from "@vue-leaflet/vue-leaflet";
import trailService from "@/services/trail.service";
//import { geoJSON } from "leaflet";

export default {
  name: "TrailMap",
  components: {
    LPolygon,
    LPolyline,
    LTileLayer,
    LMap,
  },

  props: ["trails", "regionName"],

  data() {
    return {
      zoom: 20,
      polygon: {
        latlngs: [],
        color: "#5eabff",
      },
      polylines: [],
      page: "Trail Page",
    };
  },

  computed: {
    trailsArr() {
      return this.trails;
    },
  },

  methods: {
    getExtent() {
      const trailIds = this.trails.map((trail) => trail.id);
      if (trailIds.length > 0) {
        trailService.getTrailExtent(trailIds).then((response) => {
          this.setBounds(
            response.coordinates[0].map((coord) => {
              // swap the coordinate pairs, since it is arranged in the other
              // order on the backend
              return [coord[1], coord[0]];
            })
          );
        });
      }
    },
    setBounds(bounds) {
      this.polygon.latlngs = bounds;
      this.$refs.map.leafletObject.fitBounds(bounds);
    },
    toTrailPage(trailId) {
      this.$router.push("/t/" + trailId);
    },
  },
  updated() {
    this.$nextTick(function () {
      for (let i = 0; i < this.trailsArr.length; i++) {
        for (let j = 0; j < this.trailsArr[i].segments.length; j++) {
          let latlngs = this.trailsArr[i].segments[j].track.coordinates.map(
            (coord) => {
              return [coord[1], coord[0]];
            }
          );
          this.polylines.push({
            latlngs: latlngs,
            color: "#5eabff",
            trail: this.trailsArr[i],
          });
        }
      }
      this.getExtent();
    });
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
  width: 95%;
  height: 15rem;
  margin-top: 30px;
  border: 1px solid $outline;
  border-radius: 10px;
  box-shadow: $shadowLight;
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
  max-width: 100%;
  max-height: 100%;
  border-radius: 4px;
  z-index: 0;
}
.regionName {
  z-index: 1;
  margin: 10px;
  font-size: 1.2rem;
  color: $primaryDark;
  border-bottom: 2px solid $primaryLight;
  text-shadow: 2px 8px 6px RGB(0 0 0 / 18%),
    0px -5px 35px RGB(255 255 255 / 60%);
  text-align: center;
  width: 85%;
  border-bottom: 3px solid $highlightTwo;
}
.polyline:hover {
  cursor: pointer;
}
</style>