/* eslint-disable no-unused-vars */
import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store";

import Home from "../views/Home.vue";
import NotFound from "../views/error/NotFound.vue";

import SignUpForm from "../views/sign-up/Form.vue";
import LoginForm from "../views/login/Form.vue";

import ListadoEmpleo from "../views/listado/Empleo.vue";
import ListadoAspirante from "../views/listado/Aspirante.vue";

import InformacionContacto from "../views/aspirante/InformacionContacto.vue";
import Solicitante from "../views/empresa/Solicitante.vue";

import rutasAdministrador from "./router-administrador";
import rutasAspirante from "./router-aspirante";
import rutasEmpresa from "./router-empresa";

import AsignarPermisosRecuperacion from "../views/admin/AsignarPermisosRecuperacion.vue";

Vue.use(VueRouter);

const routes = [
  ...rutasEmpresa,
  ...rutasAspirante,
  ...rutasAdministrador,
  {
    path: "/",
    name: "Home",
    component: AsignarPermisosRecuperacion,
  },
  {
    path: "/ingresar",
    name: "ingresar",
    component: LoginForm,
    beforeEnter: (to, from, next) => {
      if (store.state.isLoggedIn) next({ path: "/" });
      else next();
    },
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
    path: "/usuario/:username",
    name: "usuarioinformacion",
    component: InformacionContacto,
  },
  {
    path: "/solicitudes/puesto",
    name: "solicitantespuesto",
    component: Solicitante,
    beforeEnter: (to, from, next) => {
      if (store.state.permisos.includes("solicitantespuesto")) next();
      else next("/");
    },
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
