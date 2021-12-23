import { createStore } from "vuex";
import { trail } from "./trail.module";

const store = createStore({
  modules: {
    trail
  },
});

export default store;