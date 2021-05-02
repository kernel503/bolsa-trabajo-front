<template>
  <v-container>
    <v-row>
      <template v-for="solicitud in listado">
        <v-col
          class="d-flex"
          cols="12"
          col="8"
          md="4"
          :key="solicitud.idSolicitudEmpleo"
        >
          <v-card class="mx-auto" max-width="350" min-width="350">
            <template slot="progress">
              <v-progress-linear
                color="deep-purple"
                height="10"
                indeterminate
              ></v-progress-linear>
            </template>
            <div class="d-flex flex-column justify-space-between align-center">
              <v-img
                class="align-self-stretch"
                :aspect-ratio="16 / 4"
                :src="solicitud.empresa.logoUrl"
                contain
              ></v-img>
            </div>
            <v-card-title>{{ solicitud.empresa.idEmpresa }}</v-card-title>
            <v-card-text>
              <div class="subtitle-1">
                {{
                  `${solicitud.departamento.nombre} - ${solicitud.tipoEmpleo.nombre}`
                }}
              </div>
            </v-card-text>

            <v-divider class="mx-4"></v-divider>
            <v-card-title>{{ solicitud.perfilAcademico }}</v-card-title>
            <v-card-text>
              {{ solicitud.fechaRegistro }}
              <div>{{ solicitud.habilidad }}</div>
              <div>{{ solicitud.experiencia }}</div>
              <div>{{ solicitud.rangoSalarial }}</div>
              <div>{{ solicitud.informacionAdicional }}</div>
            </v-card-text>
          </v-card>
        </v-col>
      </template>
    </v-row>
  </v-container>
</template>
<script>
export default {
  name: "ListadoEmpleo",
  data() {
    return {
      listado: [],
    };
  },

  created() {
    // eslint-disable-next-line no-undef
    axios
      .get("/solicitud/empleo")
      .then((result) => (this.listado = result.data.data || []));
  },

  methods: {},
};
</script>
