import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store";

import Home from "../views/Home.vue";
import NotFound from "../views/error/NotFound.vue";

import SignUpForm from "../views/sign-up/Form.vue";
import LoginForm from "../views/login/Form.vue";

import ListadoEmpleo from "../views/listado/Empleo.vue";
import ListadoAspirante from "../views/listado/Aspirante.vue";

import rutasAdministrador from "./router-administrador";
import rutasAspirante from "./router-aspirante";
import rutasEmpresa from "./router-empresa";

Vue.use(VueRouter);

const routes = [
  ...rutasEmpresa,
  ...rutasAspirante,
  ...rutasAdministrador,
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/ingresar",
    name: "ingresar",
    component: LoginForm,
  },
  {
    path: "/registrar",
    name: "Registrar",
    component: SignUpForm,
    beforeEnter: (to, from, next) => {
      if (store.state.isLoggedIn) next({ path: "/" });
      else next();
    },
  },
  {
    path: "/empleos",
    name: "listadoempleos",
    component: ListadoEmpleo,
  },
  {
    path: "/usuarios",
    name: "listadousuarios",
    component: ListadoAspirante,
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
