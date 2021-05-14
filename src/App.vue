<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-app-bar-nav-icon
        @click.stop="sidebarMenu = !sidebarMenu"
        v-if="isLoggedIn"
      ></v-app-bar-nav-icon>
      <v-toolbar-title>Aldebaran</v-toolbar-title>
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          transition="scale-transition"
          width="200"
        />
      </div>
      <v-spacer></v-spacer>
      <v-btn text :to="{ name: 'listadousuarios' }" class="mr-2">
        <v-icon>mdi-account-search</v-icon>
      </v-btn>
      <v-btn text :to="{ name: 'listadoempleos' }" class="mr-2">
        <v-icon>mdi-briefcase-search</v-icon>
      </v-btn>
      <v-btn text to="/registrar" class="mr-2" v-if="!isLoggedIn">
        <v-icon>mdi-account-plus-outline</v-icon>
      </v-btn>
      <v-btn text to="/ingresar" v-if="!isLoggedIn">
        <v-icon>mdi-login</v-icon>
      </v-btn>
    </v-app-bar>
    <v-navigation-drawer
      v-if="isLoggedIn"
      app
      floating
      v-model="sidebarMenu"
      :permanent="sidebarMenu"
      :mini-variant="toggleMini"
      :mini-variant-width="80"
      dark
    >
      <v-list dense>
        <v-list-item>
          <v-list-item-action>
            <v-icon @click.stop="sidebarMenu = !sidebarMenu"
              >mdi-chevron-left</v-icon
            >
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-list-item class="px-2" @click="toggleMini = !toggleMini">
        <v-list-item-avatar>
          <v-icon>mdi-account-outline</v-icon>
        </v-list-item-avatar>
        <v-list-item-content class="text-truncate">
          {{ $store.state.username }}
        </v-list-item-content>
        <v-btn icon small>
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
      </v-list-item>
      <v-divider></v-divider>
      <v-list class="py-0">
        <v-list-item
          v-for="item in $store.state.rutas"
          :key="item.title"
          link
          :to="item.href"
        >
          <v-list-item-icon>
            <v-icon dark>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>

        <v-list-item @click="logOut">
          <v-list-item-icon>
            <v-icon dark>mdi-logout</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Salir</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <v-progress-linear
        indeterminate
        color="red"
        v-if="isDoingRequest"
      ></v-progress-linear>
      <v-container class="px-4 py-4 fill-height" fluid>
        <v-row class="fill-height">
          <v-col>
            <transition name="fade">
              <router-view></router-view>
            </transition>
          </v-col>
        </v-row>
      </v-container>

      <v-snackbar
        v-model="snackbar.display"
        :color="snackbar.color"
        left
        timeout="3000"
      >
        {{ snackbar.text }}
        <template v-slot:action="{ attrs }">
          <v-btn text v-bind="attrs" @click="snackbar.display = false">
            Cerrar
          </v-btn>
        </template>
      </v-snackbar>
      <v-btn
        v-scroll="onScroll"
        v-show="fab"
        fab
        dark
        fixed
        bottom
        right
        :color="isDoingRequest ? 'indigo' : 'primary'"
        @click="toTop"
        :loading="isDoingRequest"
        ><v-icon>mdi-arrow-up</v-icon>
      </v-btn>
    </v-main>
    <v-footer v-show="!sidebarMenu">
      <v-col class="text-center py-0 my-1" cols="12">
        {{ new Date().toISOString().slice(0, 10) }} —
        <strong>Aldebaran</strong>
      </v-col>
      <v-col class="text-center py-0 my-0" cols="12">
        <v-btn class="mx-3" @click="sendEmailToAdmin" small>
          Contactar al administrador
          <v-icon color="light-blue darken-4" class="mx-3"
            >mdi-email-send</v-icon
          >
        </v-btn>
      </v-col>
    </v-footer>
  </v-app>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "App",
  data: () => ({
    sidebarMenu: false,
    toggleMini: true,
    items: [],
    right: null,
    fab: false,
  }),
  computed: {
    ...mapState(["isDoingRequest", "snackbar", "isLoggedIn"]),
  },
  methods: {
    logOut() {
      this.$store.commit("LOG_OUT");
      this.$router.push("/");
    },

    onScroll(e) {
      if (typeof window === "undefined") return;
      const top = window.pageYOffset || e.target.scrollTop || 0;
      this.fab = top > 20;
    },

    toTop() {
      this.$vuetify.goTo(0);
    },

    sendEmailToAdmin() {
      window.open(
        "mailto:juanko682@gmail.com?subject=Sitio Aldebaran&body=Hi!"
      );
    },
  },
};
</script>
