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
    title: "Marcadores de empleo",
    icon: "mdi-bookmark-outline",
    href: { name: "solicitantespuesto" },
  },
  {
    title: "Evaluaciones",
    icon: "mdi-text-box",
    href: { name: "evaluacion" },
  },
  {
    title: "Información Personal",
    icon: "mdi-badge-account",
    href: { name: "curriculumPerfil" },
  },
  {
    title: "Conocimientos",
    icon: "mdi-lightbulb-on",
    href: { name: "curriculumConocimiento" },
  },
  {
    title: "Certificados",
    icon: "mdi-certificate",
    href: { name: "curriculumCertificado" },
  },
  {
    title: "Experiencia",
    icon: "mdi-hammer-wrench",
    href: { name: "curriculumExperiencia" },
  },
  {
    title: "Idiomas",
    icon: "mdi-translate",
    href: { name: "curriculumIdioma" },
  },
  {
    title: "Publicaciones",
    icon: "mdi-bookshelf",
    href: { name: "curriculumPublicacion" },
  },
  {
    title: "Referencias",
    icon: "mdi-cellphone-basic",
    href: { name: "curriculumReferencia" },
  },
  {
    title: "Habilidades",
    icon: "mdi-hand-saw",
    href: { name: "curriculumHabilidad" },
  },
  {
    title: "Logros",
    icon: "mdi-account-star-outline",
    href: { name: "curriculumLogro" },
  },
];
export { rutaAdministador, rutaEmpresa, rutaAspirante };
