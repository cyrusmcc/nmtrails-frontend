<template>
  <div class="container">
    <nav-bar>
      <router-link to="/">Home</router-link>
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
#app {
  height: 100%;
  width: 100%;
}

#routeView {
  padding-top: 45px;
}
</style>
