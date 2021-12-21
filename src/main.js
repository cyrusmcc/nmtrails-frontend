import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import infiniteScroll from "vue-infinite-scroll";

createApp(App).use(store).use(router).use(infiniteScroll).mount("#app");
