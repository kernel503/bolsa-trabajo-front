import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import About from "../views/About.vue";
import NotFound from "../views/error/NotFound.vue";
import LoginForm from "../views/login/Form.vue";
import SignUpForm from "../views/sign-up/Form.vue";

// import NotFound from "../views/NotFound.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    component: About,
  },
  {
    path: "/ingresar",
    name: "Ingresar",
    component: LoginForm,
  },
  {
    path: "/registrar",
    name: "Registrar",
    component: SignUpForm,
  },
  {
    path: "*",
    name: "NotFound",
    component: NotFound,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
