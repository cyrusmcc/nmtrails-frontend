<template>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
    <div>{{ test }}</div>
  </div>
  <router-view />
</template>

<script>
import testService from './services/test.service';

export default {
  name: 'App',
  data() {
    return {
      test: '',
    };
  },
  created() {
    testService.getTest().then(response => {
      this.test = response.data;
    });
  },
  methods: {
    getTest() {
      this.test = testService.getTest();
    }
  },
}
</script>


<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
