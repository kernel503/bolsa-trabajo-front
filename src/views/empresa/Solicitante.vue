<template>
  <v-container>
    <v-layout align-center justify-center>
      <v-flex xs12 sm10 md10>
        <p class="text-h6 mb-2">
          {{ listado.length ? "Mi registro" : "No tiene registro" }}
        </p>
        <template v-for="solicitud in listado">
          <v-list-item :key="solicitud.idAplicarPuesto">
            <v-list-item-content>
              <v-list-item-title class="text-h5">
                {{ solicitud.nombreUsuario.nombreUsuario }}
              </v-list-item-title>
              <v-list-item-subtitle class="text-h6">
                {{
                  $store.state.isEmpresa
                    ? solicitud.idSolicitudEmpleo.perfilAcademico
                    : solicitud.idSolicitudEmpleo.empresa.nombreUsuario +
                      " - " +
                      solicitud.idSolicitudEmpleo.perfilAcademico
                }}
              </v-list-item-subtitle>
              <v-list-item-subtitle
                v-if="!solicitud.resuelta"
                class="mt-1 blue--text"
              >
                {{ solicitud.fechaAplicacion }}
              </v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action v-if="$store.state.isEmpresa">
              <v-icon
                color="grey"
                class="mr-3"
                @click="showInfo(solicitud.nombreUsuario.nombreUsuario)"
              >
                mdi-eye
              </v-icon>
            </v-list-item-action>
            <v-list-item-action v-if="$store.state.isEmpresa">
              <v-icon
                color="indigo"
                @click="
                  sendMessage(
                    solicitud.nombreUsuario.contacto.correo,
                    solicitud.idSolicitudEmpleo.perfilAcademico
                  )
                "
              >
                mdi-email
              </v-icon>
            </v-list-item-action>
            <v-list-item-action>
              <v-icon
                color="red lighten-1"
                @click="eliminar(solicitud.idAplicarPuesto)"
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
export default {
  name: "Solicitante",
  data() {
    return {
      listado: [],
    };
  },

  created() {
    this.obtenerListado();
  },

  methods: {
    sendMessage(email, job) {
      window.location.href = `mailto:${email}?subject=${job}&body=Solicitud`;
    },
    eliminar(id) {
      // eslint-disable-next-line no-undef
      axios.delete("/aplicar/puesto/" + id).then((result) => {
        this.$store.commit("SHOW_NOTIFICATION", {
          text: result.data.message || "Operación realizada.",
        });
        this.obtenerListado();
      });
    },
    obtenerListado() {
      let url = "/aplicar/puesto/";
      if (this.$store.state.isAspirante) {
        url = "/aplicar/puesto/usuario/";
      }
      // eslint-disable-next-line no-undef
      axios
        .get(url + this.$store.state.username)
        .then((result) => (this.listado = result.data.data || []));
    },
    goToComponentInfoUser(user) {
      this.$router.push({
        name: "usuarioinformacion",
        params: { username: user },
      });
    },
  },
};
</script>
