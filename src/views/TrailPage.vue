<template>
  <div class="container">
    <div class="trailInfo">
      <div class="trailPageHeader">
        <div class="trailId">
          <h3 class="trailName">{{ trail.name }}</h3>
          <div class="trailRating">
            <NRate
              color="#4fb233"
              readonly
              allow-half
              size="small"
              :default-value="trail.rating"
            />
          </div>
        </div>
        <div class="buttonContainer" v-if="currentUser">
          <button
            class="button addButton"
            v-if="!hasTrailInToHikeList()"
            @click="addToHikeList()"
          >
            Add to hike list
          </button>
          <button class="button removeButton" v-if="hasTrailInToHikeList()">
            Remove from hike list
          </button>
        </div>
      </div>
      <div class="trailImgContainer">
        <img :src="trail.imageUrl" class="trailImg" />
      </div>
    </div>
    <observation-list :trail="trail"></observation-list>
  </div>
</template>

<script>
import trailService from "@/services/trail.service";
import userService from "@/services/user.service";
import ObservationList from "@/components/ObservationList.vue";

import { NRate } from "naive-ui";

export default {
  name: "TrailPage",
  components: { ObservationList, NRate },

  data() {
    return {
      trail: {},
      message: "",
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  mounted() {
    const getTrails = async () => {
      this.trail = await trailService.getTrailById(this.$route.params.id);
    };
    getTrails();
  },
  methods: {
    hasTrailInToHikeList() {
      return userService.hasTrailInToHikeList(
        this.currentUser.id,
        this.trail.id
      ).data;
    },
    addToHikeList() {
      userService
        .addTrailToHikeList(this.currentUser.id, this.trail.id, "To Hike")
        .then(
          (response) => {
            this.message = response.data;
            this.hasTrailInToHikeList();
          },
          (error) => {
            this.message =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();
          }
        );
    },
  },
};
</script>

<style scoped lang="scss">
.container {
  @include flexCenter();
  text-align: center;
}
.trailImgContainer {
  @include flexCenter();
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 10px;
}
.trailImg {
  height: inherit;
  width: inherit;
  object-fit: cover;
  height: 200px;
  overflow: visible;
  width: 100%;
}
.trailInfo {
  width: 95%;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 4px;
  overflow: hidden;
  margin: 5px 0;
}
.trailPageHeader {
  width: 95%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.trailName {
  margin: 0;
  font-style: italic;
}
.toHikeButton {
  margin: 0;
  padding: 0 4px;
  border: 2px solid $highlightTwo;
  font-size: 0.9em;
  background: none;
  border-radius: 20px;
  color: $highlightTwo;
  font-weight: bold;
  line-height: 1.8rem;
}
</style>