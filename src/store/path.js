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
    title: "Aspirantes al Puesto",
    icon: "mdi-badge-account-alert-outline",
    href: { name: "solicitantespuesto" },
  },
  {
    title: "Agregar Evaluación",
    icon: "mdi-ab-testing",
    href: { name: "empresaevaluacion" },
  },
  {
    title: "Listar Evaluación",
    icon: "mdi-text-account",
    href: { name: "listarevaluacion" },
  },
  {
    title: "Asignar Evaluación",
    icon: "mdi-account-star",
    href: { name: "asignarevaluacion" },
  },
];
const rutaAspirante = [
  {
    title: "Información Personal",
    icon: "mdi-badge-account",
    href: { name: "curriculum" },
  },
  {
    title: "Marcadores de empleo",
    icon: "mdi-badge-account-alert-outline",
    href: { name: "solicitantespuesto" },
  },
  {
    title: "Evaluaciones",
    icon: "mdi-text-box-check",
    href: { name: "evaluacion" },
  },
];
export { rutaAdministador, rutaEmpresa, rutaAspirante };
