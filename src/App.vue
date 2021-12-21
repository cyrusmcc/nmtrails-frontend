<template>
  <div class="container">
    <nav-bar>
      <router-link class="navLink" to="/">Home</router-link>
      <router-link class="navLink" to="/trails">Trails</router-link>
    </nav-bar>
    <router-view id="routeView" />
  </div>
</template>

<script>
import NavBar from "./components/NavBar.vue";

export default {
  name: "App",
  components: {
    NavBar,
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss">
.navLink {
  margin-top: 10px;
  font-size: 1.1rem;
}

#app {
  height: fit-content;
  width: 100%;
}

#routeView {
  padding-top: 45px;
  overflow-y: hidden;
}
</style>
