<template>
  <div class="home">
    <n-carousel class="carousel" show-arrow>
      <div>
        <div id="test">title</div>
        <img class="carousel-img" src="../assets/imgs/hiking.jpg" />
      </div>
    </n-carousel>
    <div id="mapContainer">
      <img
        id="mapBackground"
        src="../assets/imgs/green-gradient.svg"
        alt="gradient background"
      />
      <l-map id="map" :options="{ attributionControl: false }"
      >
        <l-tile-layer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        ></l-tile-layer>
        <l-geo-json :geojson="geojson" :options="geojsonOptions"></l-geo-json>
      </l-map>
    </div>
  </div>
</template>

<script>
import { NCarousel } from "naive-ui";
import "leaflet/dist/leaflet.css";
import { LMap, LTileLayer, LGeoJson } from "@vue-leaflet/vue-leaflet";

export default {
  name: "Home",
  components: {
    NCarousel,
    LMap,
    LGeoJson,
    LTileLayer,
  },
  data() {
    return {
      geojson: {
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            properties: {
              name: "Albuquerque",
              description: "New Mexico",
              "marker-color": "#ff8888",
              "marker-size": "large",
              "marker-symbol": "mountain",
            },
            geometry: {
              type: "Point",
              coordinates: [-106.62930965423584, 35.10537479831707],
            },
          },
        ],
      },
      geojsonOptions: {
        style: {
          color: "#ff8888",
          weight: 2,
          opacity: 1,
        },
        wrapLatLng: true,
      },
    };
  },
  //async beforeMount () {
  //const { circleMarker } = await import("leaflet/dist/leaflet.css");

  //this.geojsonOptions.pointToLayer = (feature, latLng) =>
  //  circleMarker(latLng, { radius: 8 });
  //this.mapIsReady = true;

  // }
};
</script>

<style lang="scss" scoped>
.carousel {
  line-height: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}

.home {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.carousel-img {
  width: 100%;
  height: 240px;
  object-fit: cover;
}

#test {
  position: absolute;
  top: 0;
  line-height: 1;
}

#mapContainer {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 100%;
  height: 15rem;
  margin-top: 20px;
}

#mapBackground {
  position: absolute;
  left: 0;
  right: 0;
  margin: 0 auto 0 auto;
  width: 95%;
  height: 100%;
  box-shadow: $shadow;
  border-radius: 4px;
}

#map {
  max-width: 90%;
  max-height: 90%;
}
</style>
