import { createStore } from "vuex";
import { trail } from "./trail.module";
import { auth } from "./auth.module";

const store = createStore({
  modules: {
    trail,
    auth
  },
});

export default store;