import store from "@/store";
import AspiranteBase from "../views/aspirante/AspiranteBase.vue";
import EvalucionFormulario from "../views/aspirante/EvalucionFormulario.vue";

import Curriculum from "../views/aspirante/Curriculum.vue";
import Logro from "../views/aspirante/Logro.vue";
import Certificado from "../views/aspirante/Certificado.vue";
import Referencia from "../views/aspirante/Referencia.vue";
import ExperienciaLaboral from "../views/aspirante/ExperienciaLaboral.vue";
import HabilidadTecnica from "../views/aspirante/HabilidadTecnica.vue";
import ConocimientoAcademico from "../views/aspirante/ConocimientoAcademico.vue";
import PublicacionLiteraria from "../views/aspirante/PublicacionLiteraria.vue";
import DetalleIdioma from "../views/aspirante/DetalleIdioma.vue";

export default [
  {
    path: "/usuario",
    component: AspiranteBase,
    beforeEnter: (to, from, next) => {
      if (store.state.isAspirante && store.state.isLoggedIn) next();
      else next("/");
    },
    children: [
      {
        path: "evaluacion",
        name: "evaluacion",
        component: EvalucionFormulario,
        beforeEnter: (to, from, next) => {
          if (store.state.permisos.includes("evaluacion")) next();
          else next("/");
        },
      },
      {
        path: "curriculum/perfil",
        name: "curriculumPerfil",
        component: Curriculum,
        beforeEnter: (to, from, next) => {
          if (store.state.permisos.includes("curriculumPerfil")) next();
          else next("/");
        },
      },
      {
        path: "curriculum/habilidad",
        name: "curriculumHabilidad",
        component: HabilidadTecnica,
        beforeEnter: (to, from, next) => {
          if (store.state.permisos.includes("curriculumHabilidad")) next();
          else next("/");
        },
      },
      {
        path: "curriculum/logro",
        name: "curriculumLogro",
        component: Logro,
        beforeEnter: (to, from, next) => {
          if (store.state.permisos.includes("curriculumLogro")) next();
          else next("/");
        },
      },
      {
        path: "curriculum/referencia",
        name: "curriculumReferencia",
        component: Referencia,
        beforeEnter: (to, from, next) => {
          if (store.state.permisos.includes("curriculumReferencia")) next();
          else next("/");
        },
      },
      {
        path: "curriculum/certificado",
        name: "curriculumCertificado",
        component: Certificado,
        beforeEnter: (to, from, next) => {
          if (store.state.permisos.includes("curriculumCertificado")) next();
          else next("/");
        },
      },
      {
        path: "curriculum/experiencia",
        name: "curriculumExperiencia",
        component: ExperienciaLaboral,
        beforeEnter: (to, from, next) => {
          if (store.state.permisos.includes("curriculumExperiencia")) next();
          else next("/");
        },
      },
      {
        path: "curriculum/conocimiento",
        name: "curriculumConocimiento",
        component: ConocimientoAcademico,
        beforeEnter: (to, from, next) => {
          if (store.state.permisos.includes("curriculumConocimiento")) next();
          else next("/");
        },
      },
      {
        path: "curriculum/publicacion",
        name: "curriculumPublicacion",
        component: PublicacionLiteraria,
        beforeEnter: (to, from, next) => {
          if (store.state.permisos.includes("curriculumPublicacion")) next();
          else next("/");
        },
      },
      {
        path: "curriculum/idioma",
        name: "curriculumIdioma",
        component: DetalleIdioma,
        beforeEnter: (to, from, next) => {
          if (store.state.permisos.includes("curriculumIdioma")) next();
          else next("/");
        },
      },
    ],
  },
];
