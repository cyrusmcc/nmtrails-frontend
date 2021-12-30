<template>
  <div class="container">
    <div class="listButtons">
      <button
        class="listButton"
        id="toHikeButton"
        @click="changeDisplay('To Hike')"
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
        @click="changeDisplay('Hiked')"
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
      :userListType="currentList"
      :userOptions="true"
      @removeTrailFromUserList="removeTrailFromList"
      @addToUserHikedList="addToUserHikedList"
    />
  </div>
</template>

<script>
import userService from "@/services/user.service";
import trailList from "../components/TrailList.vue";

export default {
  name: "UserTrails",
  components: {
    trailList,
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
    else this.changeDisplay("To Hike");
  },
  methods: {
    changeDisplay(listType) {
      const trails = async () => {
        let arr = null;
        if (listType == "Hiked") {
          arr = await userService.getUserTrailList(
            this.currentUser.id,
            listType
          );
        } else {
          arr = await userService.getUserTrailList(
            this.currentUser.id,
            listType
          );
        }

        this.currentList = listType;
        this.userTrails = arr;
      };
      trails();
    },
    removeTrailFromList(trail) {
      const remove = async () => {
        await userService.removeTrailFromUserList(
          this.currentUser.id,
          trail.id,
          this.currentList
        );
        if (this.currentList === "To Hike") {
          this.changeDisplay("To Hike");
        } else {
          this.changeDisplay("Hiked");
        }
      };
      remove();
    },
    addToUserHikedList(trail, userRating) {
      const add = async () => {
        await userService.addTrailToHikeList(
          this.currentUser.id,
          trail.id,
          "Hiked",
          userRating
        );
        if (this.currentList === "To Hike") {
          this.changeDisplay("To Hike");
        } else {
          this.changeDisplay("Hiked");
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
  cursor: pointer;
}
#toHikeButton {
  border-right: 1px solid $primaryDark;
}
</style>