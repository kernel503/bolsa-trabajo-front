<template>
  <v-container>
    <v-layout align-center justify-center>
      <v-flex xs12 sm10 md10>
        <p class="text-h4">Asignación de evaluaciones 📁</p>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-row>
            <v-col cols="12" sm="6">
              <AutoCompleteApi
                :path="path"
                label="Seleccionar la evaluación."
                text="nombre"
                idvalue="idEvaluacion"
                v-model="data.evaluacion.idEvaluacion"
              />
            </v-col>
            <v-col cols="12" sm="6">
              <AutoCompleteApi
                path="/aspirante"
                label="Seleccionar el aspirante."
                text="nombreUsuario"
                idvalue="nombreUsuario"
                v-model="data.aspirante.nombreUsuario"
              />
            </v-col>
          </v-row>
        </v-form>
        <v-btn color="indigo" @click="agregarAsignacion" class="my-4" dark>
          Asignar evaluación
        </v-btn>

        <p class="text-h6 mb-2">{{ texto }}</p>
        <template v-for="solicitud in filtroEmpresa">
          <v-list-item :key="solicitud.idSolicitudEmpleo">
            <v-list-item-content>
              <v-list-item-title class="text-h5">
                {{ solicitud.evaluacion.nombre }}
              </v-list-item-title>
              <v-list-item-subtitle class="text-h6">
                {{ solicitud.aspirante.nombreUsuario }}
              </v-list-item-subtitle>
              <v-list-item-subtitle
                v-if="!solicitud.resuelta"
                class="mt-1 blue--text"
              >
                Evaluación no resuelta
              </v-list-item-subtitle>
              <v-list-item-subtitle v-else class="mt-1 deep-purple--text">
                {{ solicitud.nota }}
              </v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
              <v-icon
                color="red lighten-1"
                @click="eliminar(solicitud.idSolicitudEmpleo)"
              >
                mdi-delete
              </v-icon>
            </v-list-item-action>
          </v-list-item>
        </template>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import AutoCompleteApi from "@/components/AutoCompleteApi.vue";
export default {
  name: "AsignacionEvaluacion",
  components: {
    AutoCompleteApi,
  },
  data() {
    return {
      valid: true,
      path: `evaluacion/${this.$store.state.username}`,
      listado: [],
      data: {
        evaluacion: {
          idEvaluacion: "",
        },
        aspirante: { nombreUsuario: "" },
        resuelta: false,
      },
    };
  },

  created() {
    this.obtenerListado();
  },

  computed: {
    filtroEmpresa() {
      return this.listado.filter(
        (value) =>
          value.evaluacion.empresa.idEmpresa === this.$store.state.username
      );
    },
    texto() {
      return this.filtroEmpresa.length
        ? "Listado de asignaciones:"
        : "No tiene registro de asignaciones.";
    },
  },
  methods: {
    agregarAsignacion() {
      if (!this.$refs.form.validate()) {
        this.$store.commit("SHOW_NOTIFICATION", {
          text: "Debe completar los campos.",
          color: "red",
        });
        return;
      }

      // eslint-disable-next-line no-undef
      axios.post("/asignacion/evaluacion", this.data).then((result) => {
        this.$refs.form.reset();
        this.$store.commit("SHOW_NOTIFICATION", {
          text: result.data.message || "Operación realizada.",
        });
        this.obtenerListado();
      });
    },

    eliminar(id) {
      // eslint-disable-next-line no-undef
      axios.delete("/asignacion/evaluacion/" + id).then((result) => {
        this.$store.commit("SHOW_NOTIFICATION", {
          text: result.data.message || "Operación realizada.",
        });
        this.obtenerListado();
      });
    },

    obtenerListado() {
      // eslint-disable-next-line no-undef
      axios
        .get("/asignacion/evaluacion")
        .then((result) => (this.listado = result.data.data || []));
    },
  },
};
</script>
