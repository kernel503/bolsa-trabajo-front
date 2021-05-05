<template>
  <v-container>
    <v-layout align-center justify-center>
      <v-flex xs12 sm10 md10>
        <p class="text-h6 mb-2">{{ $route.params.username }}</p>
        <v-card class="mx-auto" v-if="informacionUsuario !== null">
          <v-card-title
            >{{ informacionUsuario.nombre }}
            {{ informacionUsuario.apellido }}
          </v-card-title>
          <v-card-text>
            <div>Contacto: {{ informacionUsuario.contacto.numero }}</div>
            <div>Correo: {{ informacionUsuario.contacto.correo }}</div>
          </v-card-text>
          <v-divider class="mx-4"></v-divider>
          <v-card-title>Habilidades</v-card-title>
          <v-card-text> </v-card-text>
          <v-card-title>Conocimientos</v-card-title>
          <v-card-text> </v-card-text>
          <v-card-title>Certificados</v-card-title>
          <v-card-text> </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
export default {
  name: "InformacionContacto",

  data() {
    return {
      informacionUsuario: null,
    };
  },

  created() {
    this.obtenerInformacionUsuario();
  },

  methods: {
    obtenerInformacionUsuario() {
      // eslint-disable-next-line no-undef
      axios
        .get("/aspirante/" + this.$route.params.username)
        .then((result) => (this.informacionUsuario = result?.data?.data || {}));
    },
  },
};
</script>
