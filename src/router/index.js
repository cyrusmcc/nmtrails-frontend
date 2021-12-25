import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Trails from "../views/Trails.vue";
import TrailPage from "../views/TrailPage.vue";

// lazy loaded pages
const Login = () => import("../views/Login.vue");
const Register = () => import("../views/Register.vue");

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
  },
  {
    path: "/login:loginFlash(.*)",
    name: "Login",
    meta: {
      hideNav: true,
    },

    component: Login,
  },
  {
    path: "/register",
    name: "Register",
    meta: {
      hideNav: true,
    },

    component: Register,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
