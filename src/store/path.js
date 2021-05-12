const rutaAdministador = [
  {
    title: "Rubro de empresa",
    icon: "mdi-domain",
    href: { name: "adminRubro" },
  },
  {
    title: "Tipo de empleo",
    icon: "mdi-briefcase",
    href: { name: "adminTipoEmpleo" },
  },
  { title: "Pais", icon: "mdi-earth", href: { name: "adminPais" } },
  {
    title: "Departamento",
    icon: "mdi-map-marker",
    href: { name: "adminDepartamento" },
  },
  {
    title: "Idioma",
    icon: "mdi-translate",
    href: { name: "adminIdioma" },
  },
  {
    title: "Manejo idioma",
    icon: "mdi-star",
    href: { name: "adminNivelDominio" },
  },
  {
    title: "Habilidad idioma",
    icon: "mdi-account-voice",
    href: { name: "adminLenguaCategoria" },
  },
  {
    title: "Categoria evaluación",
    icon: "mdi-text-account",
    href: { name: "adminCategoriaEvaluacion" },
  },
  {
    title: "Categoria habilidades",
    icon: "mdi-hammer-screwdriver",
    href: { name: "adminCategoriaHabilidad" },
  },
  {
    title: "Categoria publicación",
    icon: "mdi-text-box-check",
    href: { name: "adminPublicacionCategoria" },
  },
  {
    title: "Categoria tipo conocimiento",
    icon: "mdi-school",
    href: { name: "adminTipoConocimiento" },
  },
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
