import store from "@/store";
import EmpresaBase from "../views/empresa/EmpresaBase.vue";
import Evaluacion from "../components/Evaluacion.vue";
import EmpresaEmpleo from "../views/empresa/Empleo.vue";
import AsignacionEvaluacion from "../views/empresa/AsignacionEvaluacion.vue";
import DespliegueEvaluacion from "../views/empresa/DespliegueEvaluacion.vue";

export default [
  {
    path: "/empresa",
    name: "empresaBase",
    component: EmpresaBase,
    beforeEnter: (to, from, next) => {
      if (store.state.isEmpresa && store.state.isLoggedIn) next();
      else next("/");
    },
    children: [
      {
        path: "agregar/evaluacion",
        name: "empresaevaluacion",
        component: Evaluacion,
        beforeEnter: (to, from, next) => {
          if (store.state.permisos.includes("empresaevaluacion")) next();
          else next("/");
        },
      },
      {
        path: "agregar/empleo",
        name: "empresaempleo",
        component: EmpresaEmpleo,
        beforeEnter: (to, from, next) => {
          if (store.state.permisos.includes("empresaempleo")) next();
          else next("/");
        },
      },
      {
        path: "asignar/evaluacion",
        name: "asignarevaluacion",
        component: AsignacionEvaluacion,
        beforeEnter: (to, from, next) => {
          if (store.state.permisos.includes("asignarevaluacion")) next();
          else next("/");
        },
      },
      {
        path: "listar/evaluacion",
        name: "listarevaluacion",
        component: DespliegueEvaluacion,
        beforeEnter: (to, from, next) => {
          if (store.state.permisos.includes("listarevaluacion")) next();
          else next("/");
        },
      },
    ],
  },
];
