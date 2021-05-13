<template>
  <v-container>
    <v-select
      :items="roles"
      v-model="nombreRol"
      label="Seleccionar Rol"
    ></v-select>
    <v-text-field
      v-model.trim="descripcionGrupo"
      label="Nombre del grupo"
      v-if="listadoRutasPorRol.length"
    ></v-text-field>
    <v-list flat subheader three-line v-if="listadoRutasPorRol.length">
      <v-subheader>Rutas disponibles</v-subheader>
      <v-list-item-group
        v-model="rutasSeleccionadas"
        multiple
        active-class=""
        itemid="name"
      >
        <template v-for="(ruta, i) in listadoRutasPorRol">
          <v-list-item :key="i">
            <template v-slot:default="{ active }">
              <v-list-item-action>
                <v-checkbox :input-value="active"></v-checkbox>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>
                  {{ ruta.descripcion }}
                </v-list-item-title>
                <v-list-item-subtitle>
                  {{ ruta.name }}
                </v-list-item-subtitle>
              </v-list-item-content>
            </template>
          </v-list-item>
        </template>
      </v-list-item-group>
      <v-btn color="primary" dark class="mb-2" @click="save"> Guardar </v-btn>
    </v-list>
  </v-container>
</template>
<script>
export default {
  name: "GestionarRol",

  data: () => ({
    urlBase: "/permiso/",
    nombreRol: "",
    descripcionGrupo: "",
    roles: ["administrador", "aspirante", "empresa"],
    rutasSeleccionadas: [],
    rutasDisponibles: {
      administrador: [
        { name: "adminRubro", descripcion: "CRUD Rubro" },
        {
          name: "adminCategoriaEvaluacion",
          descripcion: "CRUD Categoria Evaluación",
        },
        {
          name: "adminTipoEmpleo",
          descripcion: "CRUD Tipo Empleo",
        },
        {
          name: "adminIdioma",
          descripcion: "CRUD Idioma",
        },
        {
          name: "adminNivelDominio",
          descripcion: "CRUD Nivel Dominio",
        },
        {
          name: "adminLenguaCategoria",
          descripcion: "CRUD Lengua Categoria",
        },
        {
          name: "adminPais",
          descripcion: "CRUD Paises",
        },
        {
          name: "adminDepartamento",
          descripcion: "CRUD Departamentos",
        },
        {
          name: "adminCategoriaHabilidad",
          descripcion: "CRUD Categoria Habilidad",
        },
        {
          name: "adminPublicacionCategoria",
          descripcion: "CRUD Categoria Publicación",
        },
        {
          name: "adminTipoConocimiento",
          descripcion: "CRUD Tipo Conocimiento",
        },
      ],
      aspirante: [
        {
          name: "solicitantespuesto",
          descripcion: "Solicitudes Personales a Puesto",
        },
        {
          name: "evaluacion",
          descripcion: "Listado de Evaluaciones Asignadas",
        },
        {
          name: "curriculumPerfil",
          descripcion: "CRD Perfil de Curriculum",
        },
        {
          name: "curriculumConocimiento",
          descripcion: "CRD Conocimientos",
        },
        {
          name: "curriculumCertificado",
          descripcion: "CRD Certificados",
        },
        {
          name: "curriculumExperiencia",
          descripcion: "CRD Experiencia Laboral",
        },
        {
          name: "curriculumIdioma",
          descripcion: "CRD Idioma",
        },
        {
          name: "curriculumPublicacion",
          descripcion: "CRD Publicaciones Literarias",
        },
        {
          name: "curriculumReferencia",
          descripcion: "CRD Referencias",
        },
        {
          name: "curriculumHabilidad",
          descripcion: "CRD Habilidades",
        },
        {
          name: "curriculumLogro",
          descripcion: "CRD Logros",
        },
      ],
      empresa: [
        { name: "empresaevaluacion", descripcion: "Crear Evaluaciones" },
        { name: "empresaempleo", descripcion: "Crear Empleo" },
        {
          name: "asignarevaluacion",
          descripcion: "Asignar Evaluación a Aspirantes",
        },
        {
          name: "listarevaluacion",
          descripcion: "Listar las Evaluaciones",
        },
        {
          name: "solicitantespuesto",
          descripcion: "Listar las Solicitudes al Puesto",
        },
      ],
    },
  }),

  computed: {
    listadoRutasPorRol() {
      return this.rutasDisponibles[this.nombreRol] || [];
    },
    grupoDeRutas() {
      const rutas = this.rutasDisponibles[this.nombreRol] || [];
      return this.rutasSeleccionadas.map((current) => rutas[current].name);
    },
  },

  methods: {
    save() {
      if (!this.descripcionGrupo) {
        this.$store.commit("SHOW_NOTIFICATION", {
          text: "Debe agregar nombre al grupo.",
          color: "red",
        });
        return;
      }

      if (!this.grupoDeRutas.length) {
        this.$store.commit("SHOW_NOTIFICATION", {
          text: "Debe seleccionar al menos un ruta.",
          color: "red",
        });
        return;
      }

      const data = {
        nombreRol: this.nombreRol,
        descripcionGrupo: this.descripcionGrupo,
        grupoRuta: JSON.stringify(this.grupoDeRutas),
      };

      // eslint-disable-next-line no-undef
      axios
        .post(this.urlBase, data)
        .then((response) => {
          if (response.data.statusCode === 200) {
            this.$store.commit("SHOW_NOTIFICATION", {
              text: "Nuevo rol disponible.",
            });
          }
        })
        .catch(() => {
          this.$store.commit("SHOW_NOTIFICATION", {
            text: "Error al agregar el rol.",
            color: "red",
          });
        })
        .then(() => {
          this.nombreRol = null;
          this.descripcionGrupo = "";
          this.rutasSeleccionadas = [];
        });
    },
  },
};
</script>
