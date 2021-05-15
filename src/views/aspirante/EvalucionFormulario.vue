<template>
  <v-container>
    <v-layout align-center justify-center>
      <v-flex xs12 sm10 md10>
        <p class="text-h6 mb-2">{{ texto }}</p>
        <template v-for="solicitud in listado">
          <v-list-item :key="solicitud.idSolicitudEmpleo">
            <v-list-item-content>
              <v-list-item-title class="text-h5">
                {{ solicitud.evaluacion.nombre }}
              </v-list-item-title>
              <v-list-item-subtitle>
                {{ solicitud.evaluacion.empresa.nombreUsuario }}
              </v-list-item-subtitle>
              <v-list-item-subtitle>
                {{ solicitud.evaluacion.categoriaEvaluacion.nombre }}
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
              <v-list-item-action-text></v-list-item-action-text>
              <v-icon
                color="indigo lighten-1"
                @click="desplegarEvaluacion(solicitud)"
                v-if="!solicitud.resuelta"
              >
                mdi-eye
              </v-icon>
            </v-list-item-action>
            <v-list-item-action class="ml-8">
              <v-list-item-action-text></v-list-item-action-text>
              <v-icon
                color="red lighten-1"
                @click="eliminar(solicitud.idSolicitudEmpleo)"
              >
                mdi-delete
              </v-icon>
            </v-list-item-action>
          </v-list-item>
        </template>
        <v-divider class="mt-2"></v-divider>
        <template v-if="showForm">
          <p class="text-h6 mt-5">{{ nombreEvaluacion }}</p>
          <DespliegueEnunciados
            :enunciados="enunciados"
            @modificar-resultado="actualizarAsignacion"
          />
        </template>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import DespliegueEnunciados from "./DespliegueEnunciados";
export default {
  name: "EvalucionFormulario",
  components: {
    DespliegueEnunciados,
  },
  data() {
    return {
      showForm: false,
      nombreEvaluacion: "",
      enunciados: [],
      listado: [],
      data: {
        idAsignacionEvaluacion: "",
        evaluacion: {
          idEvaluacion: "",
        },
        aspirante: { nombreUsuario: this.$store.state.username },
        resuelta: true,
        nota: "",
      },
    };
  },

  created() {
    this.obtenerListado();
  },
  computed: {
    texto() {
      return this.listado.length
        ? "Evaluaciones asignadas 📝"
        : "No tiene evaluaciones 📝";
    },
  },
  methods: {
    obtenerListado() {
      // eslint-disable-next-line no-undef
      axios
        .get(`/asignacion/evaluacion/${this.$store.state.username}`)
        .then((result) => (this.listado = result.data.data || []));
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
    actualizarAsignacion(nota) {
      this.showForm = false;
      this.data.nota = nota;
      // eslint-disable-next-line no-undef
      axios.post("/asignacion/evaluacion", this.data).then((result) => {
        this.$store.commit("SHOW_NOTIFICATION", {
          text: result.data.message || "Operación realizada.",
        });
        this.obtenerListado();
      });
    },
    desplegarEvaluacion(evaluacion) {
      this.showForm = true;
      this.nombreEvaluacion = evaluacion.evaluacion.nombre;
      this.enunciados = evaluacion.evaluacion.enunciados;
      this.data.idAsignacionEvaluacion = evaluacion.idAsignacionEvaluacion;
      this.data.evaluacion.idEvaluacion = evaluacion.evaluacion.idEvaluacion;
    },
  },
};
</script>
