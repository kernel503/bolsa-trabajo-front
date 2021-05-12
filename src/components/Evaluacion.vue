<template>
  <v-container>
    <v-layout align-center justify-center>
      <v-flex xs12 sm10 md10>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-row>
            <v-col cols="12" sm="6">
              <v-text-field
                v-model="data.nombre"
                :rules="[(v) => !!v || 'Nombre requerido.']"
                label="Nombre de la evaluación"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-autocomplete
                v-model="data.categoriaEvaluacion.idCategoriaEvaluacion"
                :items="listado"
                label="Categoria de la evaluación"
                item-text="nombre"
                item-value="idCategoriaEvaluacion"
                :rules="[(v) => !!v || 'El rubro es requerido.']"
              ></v-autocomplete>
            </v-col>
          </v-row>
        </v-form>
        <template v-for="(pregunta, i) in preguntas">
          <Enunciado
            :enunciado="pregunta.nombre"
            :indice="i"
            :key="i"
            @actualizar-enunciado="editarEnunciado"
          />
        </template>

        <v-text-field
          class="mt-5"
          v-model.trim="enunciado"
          label="Enunciado"
          @keydown.enter="agregarEnunciado"
        ></v-text-field>

        <v-btn color="indigo" @click="almacenarEvaluacion" dark>
          Guardar evaluación
        </v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import Enunciado from "./Enunciado";
const evaluacionInicial = Object.freeze({
  nombre: "",
  fechaCreado: Date.now(),
  enunciados: [],
  categoriaEvaluacion: {
    idCategoriaEvaluacion: "",
  },
  cantidadPreguntas: 0,
});
export default {
  name: "Evaluacion",

  components: { Enunciado },

  data() {
    return {
      valid: true,
      empresa: { idEmpresa: this.$store.state.username },
      listado: [],
      preguntas: [],
      enunciado: "",
      data: {
        ...evaluacionInicial,
        empresa: {
          idEmpresa: this.$store.state.username,
        },
      },
    };
  },

  watch: {
    preguntas(newValue) {
      this.data.cantidadPreguntas = newValue.length;
      this.data.enunciados = newValue;
    },
  },

  created() {
    // eslint-disable-next-line no-undef
    axios
      .get("/categoria/evaluacion")
      .then((result) => (this.listado = result.data.data || []));
  },

  methods: {
    almacenarEvaluacion() {
      if (!this.$refs.form.validate()) {
        this.$store.commit("SHOW_NOTIFICATION", {
          text: "Debe completar los campos.",
          color: "red",
        });
        return;
      }

      if (this.data.enunciados.length === 0) {
        this.$store.commit("SHOW_NOTIFICATION", {
          text: "Debe agregar preguntas.",
          color: "red",
        });
        return;
      }
      // eslint-disable-next-line no-undef
      axios.post("/evaluacion", this.data).then((result) => {
        this.$refs.form.reset();
        this.$store.commit("SHOW_NOTIFICATION", {
          text: result.data.message || "Operación realizada.",
        });
        this.data = {
          ...evaluacionInicial,
          empresa: {
            idEmpresa: this.$store.state.username,
          },
        };
        this.preguntas = [];
      });
    },

    agregarEnunciado() {
      if (this.enunciado) {
        this.preguntas.push({ nombre: this.enunciado, respuestas: [] });
        this.enunciado = "";
      }
    },

    editarEnunciado(valor, indice) {
      this.preguntas[indice] = { ...valor };
    },
  },
};
</script>
