<template>
  <div>
    <template v-for="(enunciado, i) in enunciados">
      <v-card class="my-2" :key="enunciado.idEnunciado">
        <v-card-text>
          <v-list flat subheader>
            <v-list-item-group
              active-class=""
              v-model="seleccion[enunciado.idEnunciado]"
            >
              <p class="text-h6">{{ enunciado.nombre }}</p>
              <v-divider v-if="i !== 0"></v-divider>
              <template v-for="respuesta in enunciado.respuestas">
                <v-list-item :key="respuesta.idRespuesta">
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
    <v-divider class="my-4"> </v-divider>
    <v-btn color="indigo" dark @click="obtenerResultado">
      Guardar respuestas
    </v-btn>
  </div>
</template>
<script>
export default {
  name: "DespliegueEnunciados",
  props: {
    enunciados: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      seleccion: {},
      puntosMaximo: 0,
      enunciadoById: {},
    };
  },
  mounted() {
    this.enunciadoById = this.enunciados.reduce((accum, current) => {
      const asociado = { [current.idEnunciado]: current.respuestas };
      return { ...accum, ...asociado };
    }, {});

    this.puntosMaximo = this.enunciados.reduce((accum, current) => {
      current.respuestas.forEach((value) => {
        accum += +value.porcentaje;
      });
      return accum;
    }, 0);
  },
  methods: {
    obtenerResultado() {
      Object.keys(this.seleccion).forEach((key) =>
        this.seleccion[key] === undefined ? delete this.seleccion[key] : {}
      );

      if (this.enunciados.length !== Object.keys(this.seleccion).length) {
        console.log("Debe completar el cuestionario");
        return;
      }

      let puntosObtenidos = 0;
      for (const seleccion in this.seleccion) {
        const indice = this.seleccion[seleccion];
        const respuesta = this.enunciadoById[seleccion][indice];
        const { porcentaje } = respuesta;
        puntosObtenidos += porcentaje;
      }
      this.$emit(
        "modificar-resultado",
        "Puntos obtenidos: " + puntosObtenidos + " de " + this.puntosMaximo
      );
    },
  },
};
</script>
