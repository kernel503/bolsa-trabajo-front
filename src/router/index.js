/* eslint-disable no-unused-vars */
import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store";

import Home from "../views/Home.vue";
import NotFound from "../views/error/NotFound.vue";
import LoginForm from "../views/login/Form.vue";
import SignUpForm from "../views/sign-up/Form.vue";

import ListadoEmpleo from "../views/empleo/ListadoEmpleo.vue";
import ListadoAspirante from "../views/aspirante/ListadoAspirante.vue";

import Evaluacion from "../components/Evaluacion.vue";
import Solicitante from "../views/empresa/Solicitante.vue";
import EmpresaEmpleo from "../views/empresa/Empleo.vue";
import AsignacionEvaluacion from "../views/empresa/AsignacionEvaluacion.vue";
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

import AdminBase from "../views/admin/AdminBase.vue";
import Rubro from "../views/admin/Rubro.vue";
import TipoEmpleo from "../views/admin/TipoEmpleo.vue";
import Pais from "../views/admin/Pais.vue";
import Departamento from "../views/admin/Departamento.vue";
import Idioma from "../views/admin/Idioma.vue";
import NivelDominio from "../views/admin/NivelDominio.vue";
import LenguaCategoria from "../views/admin/LenguaCategoria.vue";
import CategoriaEvaluacion from "../views/admin/CategoriaEvaluacion.vue";
import CategoriaHabilidad from "../views/admin/CategoriaHabilidad.vue";
import PublicacionCategoria from "../views/admin/PublicacionCategoria.vue";
import TipoConocimiento from "../views/admin/TipoConocimiento.vue";

Vue.use(VueRouter);

const routeAdministrador = [
  {
    path: "/admin",
    name: "adminBase",
    component: AdminBase,
    beforeEnter: (to, from, next) => {
      if (store.state.isAdmin && store.state.isLoggedIn) next();
      else next("/");
    },
    children: [
      {
        path: "rubro",
        name: "adminRubro",
        component: Rubro,
      },
      {
        path: "categoria/evaluacion",
        name: "adminCategoriaEvaluacion",
        component: CategoriaEvaluacion,
      },
      {
        path: "tipo/empleo",
        name: "adminTipoEmpleo",
        component: TipoEmpleo,
      },
      {
        path: "idioma",
        name: "adminIdioma",
        component: Idioma,
      },
      {
        path: "nivel/dominio",
        name: "adminNivelDominio",
        component: NivelDominio,
      },
      {
        path: "/lengua/categoria",
        name: "adminLenguaCategoria",
        component: LenguaCategoria,
      },
      {
        path: "pais",
        name: "adminPais",
        component: Pais,
      },
      {
        path: "departamento",
        name: "adminDepartamento",
        component: Departamento,
      },
      {
        path: "categoria/habilidad",
        name: "adminCategoriaHabilidad",
        component: CategoriaHabilidad,
      },
      {
        path: "publicacion/categoria",
        name: "adminPublicacionCategoria",
        component: PublicacionCategoria,
      },
      {
        path: "tipo/conocimiento",
        name: "adminTipoConocimiento",
        component: TipoConocimiento,
      },
    ],
  },
];

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
  ...routeAdministrador,
  {
    path: "/",
    name: "Home",
    component: Pais,
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
