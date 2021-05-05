const rutaAdministador = [
  { title: "Rubro", icon: "mdi-domain" },
  { title: "Pais", icon: "mdi-earth" },
  { title: "Departamento", icon: "mdi-map-marker" },
  { title: "Tipo de empleo", icon: "mdi-briefcase" },
];
const rutaEmpresa = [
  {
    title: "Agregar Empleo",
    icon: "mdi-briefcase-plus-outline",
    href: { name: "empresaempleo" },
  },
  {
    title: "Solicitantes Puesto",
    icon: "mdi-badge-account-alert-outline",
    href: { name: "solicitantespuesto" },
  },
  {
    title: "Agregar Evaluación",
    icon: "mdi-ab-testing",
    href: { name: "empresaevaluacion" },
  },

  {
    title: "Asignar Evaluación",
    icon: "mdi-account-star",
    href: { name: "asignarevaluacion" },
  },
];
const rutaAspirante = [
  {
    title: "Evaluaciones",
    icon: "mdi-text-box-check",
    href: { name: "evaluacion" },
  },
  {
    title: "Solicitudes a Puesto",
    icon: "mdi-badge-account-alert-outline",
    href: { name: "solicitantespuesto" },
  },
];
export { rutaAdministador, rutaEmpresa, rutaAspirante };
