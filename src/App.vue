<template>
  <div class="container">
    <nav-bar v-show="!$route.meta.hideNav">
      <router-link class="navLink" to="/">Home</router-link>
      <router-link class="navLink" to="/trails">Trails</router-link>
      <div class="navLink" v-if="!currentUser">
        <router-link to="/login">Login</router-link>
      </div>
      <div class="navLink" v-if="currentUser">
        <router-link to="/my-trails">My trails</router-link>
      </div>
      <div class="navLink" v-if="currentUser">
        <router-link to="/settings">Settings</router-link>
      </div>
      <div v-if="currentUser" class="navLink">
        <a @click.prevent="logOut">Logout</a>
      </div>
    </nav-bar>
    <router-view id="routeView" />
  </div>
</template>

<script>
import TokenService from "./services/token.service";
import EventBus from "./EventBus";

import NavBar from "./components/NavBar.vue";

export default {
  name: "App",
  components: {
    NavBar,
  },
  computed: {
    currentUser() {
      // read user to local storage after refresh
      if (!TokenService.getUser()) {
        TokenService.setUser(this.$store.state.auth.user);
      }
      return this.$store.state.auth.user;
    },
  },
  methods: {
    logOut() {
      this.$store.dispatch("auth/logout", this.currentUser).then(() => {
        this.$router.push("/login");
      });
    },
  },
  mounted() {
    EventBus.on("logout", () => {
      this.logOut();
    });
  },
  beforeUnmount() {
    EventBus.remove("logout");
  },
};
</script>

<style lang="scss">
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.navLink {
  margin-top: 10px;
  font-size: 1.1rem;
}
.navLink:hover {
  border-bottom: 2px solid $highlightTwo;
}
#app {
  height: 100%;
  width: 100%;
}

#routeView {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding-top: 45px;
  overflow-y: auto;
}

@include screen-md() {
  #app {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 80%;
    max-width: 50rem;
  }
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }
}
</style>
