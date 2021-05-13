import store from "@/store";
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
import GestionarRol from "../views/admin/GestionarRol.vue";
export default [
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
        path: "rol",
        name: "adminGestionarRol",
        component: GestionarRol,
        beforeEnter: (to, from, next) => {
          if (store.state.permisos.includes("adminGestionarRol")) next();
          else next("/");
        },
      },
      {
        path: "rubro",
        name: "adminRubro",
        component: Rubro,
        beforeEnter: (to, from, next) => {
          if (store.state.permisos.includes("adminRubro")) next();
          else next("/");
        },
      },
      {
        path: "categoria/evaluacion",
        name: "adminCategoriaEvaluacion",
        component: CategoriaEvaluacion,
        beforeEnter: (to, from, next) => {
          if (store.state.permisos.includes("adminCategoriaEvaluacion")) next();
          else next("/");
        },
      },
      {
        path: "tipo/empleo",
        name: "adminTipoEmpleo",
        component: TipoEmpleo,
        beforeEnter: (to, from, next) => {
          if (store.state.permisos.includes("adminTipoEmpleo")) next();
          else next("/");
        },
      },
      {
        path: "idioma",
        name: "adminIdioma",
        component: Idioma,
        beforeEnter: (to, from, next) => {
          if (store.state.permisos.includes("adminIdioma")) next();
          else next("/");
        },
      },
      {
        path: "nivel/dominio",
        name: "adminNivelDominio",
        component: NivelDominio,
        beforeEnter: (to, from, next) => {
          if (store.state.permisos.includes("adminNivelDominio")) next();
          else next("/");
        },
      },
      {
        path: "/lengua/categoria",
        name: "adminLenguaCategoria",
        component: LenguaCategoria,
        beforeEnter: (to, from, next) => {
          if (store.state.permisos.includes("adminLenguaCategoria")) next();
          else next("/");
        },
      },
      {
        path: "pais",
        name: "adminPais",
        component: Pais,
        beforeEnter: (to, from, next) => {
          if (store.state.permisos.includes("adminPais")) next();
          else next("/");
        },
      },
      {
        path: "departamento",
        name: "adminDepartamento",
        component: Departamento,
        beforeEnter: (to, from, next) => {
          if (store.state.permisos.includes("adminDepartamento")) next();
          else next("/");
        },
      },
      {
        path: "categoria/habilidad",
        name: "adminCategoriaHabilidad",
        component: CategoriaHabilidad,
        beforeEnter: (to, from, next) => {
          if (store.state.permisos.includes("adminCategoriaHabilidad")) next();
          else next("/");
        },
      },
      {
        path: "publicacion/categoria",
        name: "adminPublicacionCategoria",
        component: PublicacionCategoria,
        beforeEnter: (to, from, next) => {
          if (store.state.permisos.includes("adminPublicacionCategoria"))
            next();
          else next("/");
        },
      },
      {
        path: "tipo/conocimiento",
        name: "adminTipoConocimiento",
        component: TipoConocimiento,
        beforeEnter: (to, from, next) => {
          if (store.state.permisos.includes("adminTipoConocimiento")) next();
          else next("/");
        },
      },
    ],
  },
];
