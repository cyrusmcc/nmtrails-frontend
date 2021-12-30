<template>
  <div class="listContainer">
    <h2 v-if="trails && !trails.length">No results.</h2>
    <ol class="trailList">
      <li v-for="(trail, index) in trails" :key="index">
        <div class="trailContainer">
          <div class="shadow"></div>
          <img :src="trail.imageUrl" class="trailImg" alt="" />
          <div class="trailInfoContainer">
            <div class="trailName">
              <router-link :to="'/t/' + trail.id">{{ trail.name }}</router-link>
            </div>
            <div class="trailRating" v-show="rating">
              <NRate
                color="#4fb233"
                readonly
                allow-half
                :value="trail.avgRating"
              />
            </div>
            <ol class="trailTagList">
              <li v-for="(tag, index) in trail.tags" :key="index">
                <div class="trailTag">{{ tag.value }}</div>
              </li>
            </ol>
          </div>
        </div>
        <div class="userTrailOptions" v-if="userOptions && trails.length > 0">
          <modal v-if="showModal" @closeModal="toggleModal">
            <div class="rateModalContent">
              <span>How would you rate this trail?</span>
              <NRate
                color="#4fb233"
                @click="onUpdate()"
                :default-value="value"
                ref="rate"
              />
              <button class="button" @click="addToUserHikedList(trail, value)">Add to finished hikes</button>
            </div>
          </modal>
          <div class="removeButtonContainer" @click="removeFromUserList(trail)">
            <img
              src="@/assets/imgs/trashcan.svg"
              alt="delete-icon"
              class="removeTrailIcon"
            />
          </div>
          <button class="button" @click="toggleModal" v-if="userListType == 'To Hike'">
            Add to my finished hikes
          </button>
        </div>
      </li>
    </ol>
  </div>
</template>

<script>
import { NRate } from "naive-ui";
import modal from "./Modal.vue";

export default {
  name: "TrailList",
  components: {
    NRate,
    modal,
  },
  data() {
    return {
      showModal: false,
      value: 0,
    };
  },
  props: ["trails", "rating", "userOptions", "userListType"],
  methods: {
    toggleModal() {
      this.showModal = !this.showModal;
    },
    onUpdate() {
      this.value = this.$refs.rate.mergedValue;
    },
    removeFromUserList(trail) {
      this.$emit("removeTrailFromUserList", trail);
    },
    addToUserHikedList(trail, value) {
      this.$emit("addToUserHikedList", trail, value);
      this.showModal = false;
    },
  },
};
</script>

<style scoped lang="scss">
.listContainer {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}
.trailList {
  width: 100%;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.trailList > li {
  display: flex;
  flex-direction: column;
  align-items: center;
  list-style-type: none;
  width: 100%;
}
.trailContainer {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  height: 200px;
  width: 100%;
}
.shadow {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
  box-shadow: $shadowInset;
  pointer-events: none;
}
.trailImg {
  height: inherit;
  width: inherit;
  object-fit: cover;
}
.trailInfoContainer {
  position: absolute;
  height: fit-content;
  bottom: 0;
  left: 0;
  margin: 10px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.trailName > a {
  color: $primaryLight;
  font-style: italic;
  text-shadow: black 0.1em 0.1em 0.2em;
  font-size: 1.1rem;
}
.userTrailOptions {
  display: flex;
  flex-direction: row;
  column-gap: 10px;
  padding: 10px;
  width: inherit;
  box-shadow: $shadowLight;
  border-radius: 0 0 4px 4px;
  border: 1px solid #e4ebf8;
  border-top: 0;
}
.removeButtonContainer {
  @include flexCenter();
  background: $highlightThree;
  border-radius: 50%;
  width: 2.5rem;
  height: 2.5rem;
  padding: 2px;
  cursor: pointer;
}
.removeTrailIcon {
  height: 1.8rem;
  width: 1.8rem;
  margin-right: 1px;
}
.rateModalContent {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 25px;
  row-gap: 20px;
}
</style>
