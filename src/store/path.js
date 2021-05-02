const rutaAdministador = [
  { title: "Rubro", icon: "mdi-domain" },
  { title: "Pais", icon: "mdi-earth" },
  { title: "Departamento", icon: "mdi-map-marker" },
  { title: "Tipo de empleo", icon: "mdi-briefcase" },
];
const rutaEmpresa = [
  {
    title: "Crear empleo",
    icon: "mdi-briefcase-plus-outline",
    href: { name: "empresaempleo" },
  },
  {
    title: "Evaluación",
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
];
export { rutaAdministador, rutaEmpresa, rutaAspirante };
