import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store";

import Home from "../views/Home.vue";
import NotFound from "../views/error/NotFound.vue";
import LoginForm from "../views/login/Form.vue";
import SignUpForm from "../views/sign-up/Form.vue";

import Evaluacion from "../components/Evaluacion.vue";

import ListadoEmpleo from "../views/empleo/ListadoEmpleo.vue";

import EmpresaEmpleo from "../views/empresa/Empleo.vue";
import AsignacionEvaluacion from "../views/empresa/AsignacionEvaluacion.vue";
import Solicitante from "../views/empresa/Solicitante.vue";

import EvalucionFormulario from "../views/aspirante/EvalucionFormulario.vue";
import InformacionContacto from "../views/aspirante/InformacionContacto.vue";

Vue.use(VueRouter);

const routesEmpresa = [
  {
    path: "/agregar/evaluacion",
    name: "empresaevaluacion",
    component: Evaluacion,
    beforeEnter: (to, from, next) => {
      if (store.state.isEmpresa && store.state.isLoggedIn) next();
      else next("/");
    },
  },
  {
    path: "/agregar/empleo",
    name: "empresaempleo",
    component: EmpresaEmpleo,
    beforeEnter: (to, from, next) => {
      if (store.state.isEmpresa && store.state.isLoggedIn) next();
      else next("/");
    },
  },
  {
    path: "/asignar/evaluacion",
    name: "asignarevaluacion",
    component: AsignacionEvaluacion,
    beforeEnter: (to, from, next) => {
      if (store.state.isEmpresa && store.state.isLoggedIn) next();
      else next("/");
    },
  },
  {
    path: "/solicitudes/puesto",
    name: "solicitantespuesto",
    component: Solicitante,
    beforeEnter: (to, from, next) => {
      if (
        store.state.isEmpresa ||
        (store.state.isAspirante && store.state.isLoggedIn)
      )
        next();
      else next("/");
    },
  },
];

const routeAspirante = [
  {
    path: "/evaluacion",
    name: "evaluacion",
    component: EvalucionFormulario,
    beforeEnter: (to, from, next) => {
      if (store.state.isAspirante && store.state.isLoggedIn) next();
      else next("/");
    },
  },
  {
    path: "/usuario/:username",
    name: "usuarioinformacion",
    component: InformacionContacto,
  },
];

const routes = [
  ...routesEmpresa,
  ...routeAspirante,
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
