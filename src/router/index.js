import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Trails from "../views/Trails.vue";
import TrailPage from "../views/TrailPage.vue";

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
  {
    path: "/t/:id",
    name: "Trail Page",
    component: TrailPage
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
