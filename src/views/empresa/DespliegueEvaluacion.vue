<template>
  <v-container>
    <v-row>
      <v-col>
        <v-autocomplete
          :items="listado"
          label="Nombre de la evaluación"
          item-text="nombre"
          item-value="idEvaluacion"
          clearable
          v-model="testPicked"
        >
        </v-autocomplete
      ></v-col>
    </v-row>
    <v-row v-if="testPicked !== null">
      <v-col>
        <v-card class="mx-auto">
          <v-card-title> {{ testPickedValue.nombre }} </v-card-title>
          <v-card-subtitle>
            {{ testPickedValue.categoria.nombre }}
          </v-card-subtitle>
          <v-card-actions>
            <v-spacer></v-spacer>
          </v-card-actions>
          <v-expand-transition>
            <div>
              <v-divider></v-divider>
              <template v-for="(enunciado, i) in testPickedValue.enunciados">
                <v-card-title :key="enunciado.idEnunciado">
                  {{ i + 1 }} - {{ enunciado.nombre }}
                </v-card-title>
                <template v-for="respuesta in enunciado.respuestas">
                  <div
                    :class="{
                      'deep-purple--text': respuesta.porcentaje,
                      'ml-4': true,
                    }"
                    :key="respuesta.idRespuesta"
                  >
                    {{ respuesta.respuesta }}
                  </div>
                </template>
              </template>
            </div>
          </v-expand-transition>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "DespliegueEvaluacion",
  data() {
    return {
      listado: [],
      selected: 0,
      testPicked: null,
    };
  },
  computed: {
    testPickedValue() {
      return this.listado.filter(
        (element) => element.idEvaluacion === this.testPicked
      )[0];
    },
  },
  created() {
    // eslint-disable-next-line no-undef
    axios
      .get("/evaluacion/" + this.$store.state.username)
      .then((result) => (this.listado = result.data.data || []));
  },
};
</script>
