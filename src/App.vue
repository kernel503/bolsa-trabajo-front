<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://i.imgur.com/0QvhIIF.png"
          transition="scale-transition"
          width="200"
        />
      </div>

      <v-spacer></v-spacer>
      <v-btn
        text
        to="/logout"
        class="mr-2"
        v-if="isLoggedIn"
        @click="$store.commit('LOG_OUT')"
      >
        <span class="mr-2">Salir</span>
        <v-icon>mdi-logout</v-icon>
      </v-btn>
      <v-btn text to="/registrar" class="mr-2" v-if="!isLoggedIn">
        <span class="mr-2">Registrarse</span>
        <v-icon>mdi-account-plus-outline</v-icon>
      </v-btn>
      <v-btn text to="/ingresar" v-if="!isLoggedIn">
        <span class="mr-2">Ingresar</span>
        <v-icon>mdi-login</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <v-progress-linear
        indeterminate
        color="purple darken-1"
        v-if="isDoingRequest"
      ></v-progress-linear>
      <router-view></router-view>
      <v-snackbar
        v-model="snackbar.display"
        :color="snackbar.color"
        left
        timeout="2500"
      >
        {{ snackbar.text }}
        <template v-slot:action="{ attrs }">
          <v-btn text v-bind="attrs" @click="snackbar.display = false">
            Cerrar
          </v-btn>
        </template>
      </v-snackbar>
    </v-main>
  </v-app>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "App",
  data: () => ({
    //
  }),
  computed: {
    ...mapState(["isDoingRequest", "snackbar", "isLoggedIn"]),
  },
};
</script>
