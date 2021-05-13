import store from "@/store";
import Evaluacion from "../components/Evaluacion.vue";
import Solicitante from "../views/empresa/Solicitante.vue";
import EmpresaEmpleo from "../views/empresa/Empleo.vue";
import AsignacionEvaluacion from "../views/empresa/AsignacionEvaluacion.vue";
import DespliegueEvaluacion from "../views/empresa/DespliegueEvaluacion.vue";

export default [
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
