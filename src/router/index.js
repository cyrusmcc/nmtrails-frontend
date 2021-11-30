import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Trails from "../views/Trails.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/trails",
    name: "Trails",
    component: Trails,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
