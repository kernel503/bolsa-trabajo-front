<template>
  <v-card class="my-2">
    <v-card-title>{{ enunciado }}</v-card-title>
    <v-card-subtitle>
      <v-text-field
        v-model.trim="respuesta"
        label="Respuestas"
        @keydown.enter="agregar"
      ></v-text-field>
    </v-card-subtitle>
    <v-card-text v-if="respuestas.length > 0">
      Doble click sobre la respuesta para eliminarla.
      <v-list flat>
        <v-list-item-group active-class="" v-model="correcta">
          <template v-for="(respuesta, i) in respuestas">
            <v-list-item
              :key="`${i}-${respuesta.respuesta}`"
              @dblclick="eliminar(i)"
            >
              <template v-slot:default="{ active }">
                <v-list-item-action>
                  <v-checkbox :input-value="active"></v-checkbox>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title>
                    {{ respuesta.respuesta }}
                  </v-list-item-title>
                </v-list-item-content>
              </template>
            </v-list-item>
          </template>
        </v-list-item-group>
      </v-list>
    </v-card-text>
  </v-card>
</template>
<script>
export default {
  name: "Enunciado",
  props: {
    enunciado: {
      type: String,
      default: "",
      required: true,
    },
    indice: {
      type: Number,
      required: true,
    },
  },
  watch: {
    respuestas() {
      this.actualizar();
    },
    correcta(value) {
      if (value !== undefined) {
        this.respuestas = this.respuestas.map((current, index) =>
          value === index
            ? { ...current, porcentaje: 10 }
            : { ...current, porcentaje: 0 }
        );
      } else {
        this.respuestas = this.respuestas.map((current) => ({
          ...current,
          porcentaje: 0,
        }));
      }
      this.actualizar();
    },
  },
  data() {
    return {
      respuesta: "",
      correcta: [],
      respuestas: [],
    };
  },
  methods: {
    agregar() {
      if (this.respuesta) {
        this.respuestas.push({
          respuesta: this.respuesta,
          porcentaje: 0,
        });
        this.respuesta = "";
      }
    },
    actualizar() {
      this.$emit(
        "actualizar-enunciado",
        { nombre: this.enunciado, respuestas: this.respuestas },
        this.indice
      );
    },
    eliminar(i) {
      this.respuestas.splice(i, 1);
    },
  },
};
</script>
