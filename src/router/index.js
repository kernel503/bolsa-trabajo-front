/* eslint-disable no-unused-vars */
import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store";

import Home from "../views/Home.vue";
import NotFound from "../views/error/NotFound.vue";
import LoginForm from "../views/login/Form.vue";
import SignUpForm from "../views/sign-up/Form.vue";

import Evaluacion from "../components/Evaluacion.vue";

import ListadoEmpleo from "../views/empleo/ListadoEmpleo.vue";
import ListadoAspirante from "../views/aspirante/ListadoAspirante.vue";

import EmpresaEmpleo from "../views/empresa/Empleo.vue";
import AsignacionEvaluacion from "../views/empresa/AsignacionEvaluacion.vue";
import Solicitante from "../views/empresa/Solicitante.vue";
import DespliegueEvaluacion from "../views/empresa/DespliegueEvaluacion.vue";

import EvalucionFormulario from "../views/aspirante/EvalucionFormulario.vue";
import InformacionContacto from "../views/aspirante/InformacionContacto.vue";
import Curriculum from "../views/aspirante/Curriculum.vue";
import Logro from "../views/aspirante/Logro.vue";
import Certificado from "../views/aspirante/Certificado.vue";
import Referencia from "../views/aspirante/Referencia.vue";
import ExperienciaLaboral from "../views/aspirante/ExperienciaLaboral.vue";
import HabilidadTecnica from "../views/aspirante/HabilidadTecnica.vue";
import ConocimientoAcademico from "../views/aspirante/ConocimientoAcademico.vue";
import PublicacionLiteraria from "../views/aspirante/PublicacionLiteraria.vue";
import DetalleIdioma from "../views/aspirante/DetalleIdioma.vue";

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
    path: "/listar/evaluacion",
    name: "listarevaluacion",
    component: DespliegueEvaluacion,
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
    path: "/curriculum/perfil",
    name: "curriculumPerfil",
    component: Curriculum,
    beforeEnter: (to, from, next) => {
      if (store.state.isAspirante && store.state.isLoggedIn) next();
      else next("/");
    },
  },
  {
    path: "/curriculum/habilidad",
    name: "curriculumHabilidad",
    component: HabilidadTecnica,
    beforeEnter: (to, from, next) => {
      if (store.state.isAspirante && store.state.isLoggedIn) next();
      else next("/");
    },
  },
  {
    path: "/curriculum/logro",
    name: "curriculumLogro",
    component: Logro,
    beforeEnter: (to, from, next) => {
      if (store.state.isAspirante && store.state.isLoggedIn) next();
      else next("/");
    },
  },
  {
    path: "/curriculum/referencia",
    name: "curriculumReferencia",
    component: Referencia,
    beforeEnter: (to, from, next) => {
      if (store.state.isAspirante && store.state.isLoggedIn) next();
      else next("/");
    },
  },
  {
    path: "/curriculum/certificado",
    name: "curriculumCertificado",
    component: Certificado,
    beforeEnter: (to, from, next) => {
      if (store.state.isAspirante && store.state.isLoggedIn) next();
      else next("/");
    },
  },
  {
    path: "/curriculum/experiencia",
    name: "curriculumExperiencia",
    component: ExperienciaLaboral,
    beforeEnter: (to, from, next) => {
      if (store.state.isAspirante && store.state.isLoggedIn) next();
      else next("/");
    },
  },
  {
    path: "/curriculum/conocimiento",
    name: "curriculumConocimiento",
    component: ConocimientoAcademico,
    beforeEnter: (to, from, next) => {
      if (store.state.isAspirante && store.state.isLoggedIn) next();
      else next("/");
    },
  },
  {
    path: "/curriculum/publicacion",
    name: "curriculumPublicacion",
    component: PublicacionLiteraria,
    beforeEnter: (to, from, next) => {
      if (store.state.isAspirante && store.state.isLoggedIn) next();
      else next("/");
    },
  },
  {
    path: "/curriculum/idioma",
    name: "curriculumIdioma",
    component: DetalleIdioma,
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
    path: "/show",
    name: "show",
    component: DetalleIdioma,
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
