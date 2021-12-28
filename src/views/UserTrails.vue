<template>
  <div class="container">
    <div class="listButtons">
      <button
        class="listButton"
        id="toHikeButton"
        @click="displayToHike"
        :style="[
          currentList == 'To Hike'
            ? {
                color: '#10820f',
                fontWeight: 'bold',
                opacity: 1,
              }
            : {
                color: '#121113',
                fontWeight: 'normal',
                opacity: 0.5,
              },
        ]"
      >
        To Hike
      </button>
      <button
        class="listButton"
        @click="displayHiked"
        :style="[
          currentList == 'Hiked'
            ? {
                color: '#10820f',
                fontWeight: 'bold',
                opacity: 1,
              }
            : {
                color: '#121113',
                fontWeight: 'normal',
                opacity: 0.5,
              },
        ]"
      >
        Finished Hikes
      </button>
    </div>
    <trail-list
      :trails="trailsArr"
      :userOptions="true"
      @removeTrailFromUserList="removeTrailFromList"
      @addToUserHikedList="addToUserHikedList"
    />
  </div>
</template>

<script>
import userService from "@/services/user.service";
import TrailList from "../components/TrailList.vue";

export default {
  name: "UserTrails",
  components: {
    TrailList,
  },
  data() {
    return {
      currentList: "To Hike",
      userTrails: [],
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    trailsArr() {
      return this.userTrails;
    },
  },
  mounted() {
    if (!this.currentUser) this.$router.push("/login");
    else this.displayToHike();
  },
  methods: {
    displayToHike() {
      const trails = async () => {
        const arr = await userService.getUserTrailList(
          this.currentUser.id,
          "To Hike"
        );
        this.userTrails = arr;
      };
      trails();
      this.currentList = "To Hike";
    },
    displayHiked() {
      const trails = async () => {
        const arr = await userService.getUserTrailList(
          this.currentUser.id,
          "Hiked"
        );
        this.userTrails = arr;
      };
      trails();
      this.currentList = "Hiked";
    },
    removeTrailFromList(trail) {
      const remove = async () => {
        await userService.removeTrailFromUserList(
          this.currentUser.id,
          trail.id,
          this.currentList
        );
        if (this.currentList === "To Hike") {
          this.displayToHike();
        } else {
          this.displayHiked();
        }
      };
      remove();
    },
    addToUserHikedList(trail) {
      const add = async () => {
        await userService.addTrailToHikeList(
          this.currentUser.id,
          trail.id,
          "Hiked"
        );
        if (this.currentList === "To Hike") {
          this.displayToHike();
        } else {
          this.displayHiked();
        }
      };
      add();
    },
  },
};
</script>

<style scoped lang="scss">
.container {
  @include flexCenter();
  margin-top: 10px;
}
.listContainer {
  width: 95%;
  margin-bottom: 15px;
}

.listButtons {
  width: 20rem;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  border: 1px solid $primaryDark;
  padding: 5px;
  border-radius: 30px;
  margin-bottom: 20px;
}
.listButton {
  width: 8rem;
  background: none;
  border: none;
  color: $primaryDark;
  font-size: 1em;
}
#toHikeButton {
  border-right: 1px solid $primaryDark;
}
</style>