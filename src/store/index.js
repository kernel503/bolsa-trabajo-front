import Vue from "vue";
import Vuex from "vuex";
// eslint-disable-next-line no-unused-vars
import { rutaAdministador, rutaEmpresa, rutaAspirante } from "./path";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLoggedIn: false,
    isDoingRequest: false,
    snackbar: { display: false, text: "", color: "indigo" },
    username: "",
    isEmpresa: false,
    isAspirante: false,
    isAdmin: false,
    idCv: "Not Found",
    rutas: [],
    permisos: [],
  },
  mutations: {
    START_REQUEST(state) {
      state.isDoingRequest = true;
    },
    END_REQUEST(state) {
      state.isDoingRequest = false;
    },
    LOG_IN(state) {
      state.isLoggedIn = true;
      this.commit("VALIDATE_SESSION");
    },
    LOG_OUT(state) {
      state.isLoggedIn = false;
      localStorage.removeItem("login");
    },
    SHOW_NOTIFICATION(state, value) {
      state.snackbar = { color: "indigo", ...value, display: true };
    },
    VALIDATE_SESSION(state) {
      const login = JSON.parse(localStorage.getItem("login"));
      state.permisos = login?.data?.permiso?.grupoRuta || [];

      if (!login) {
        state.isLoggedIn = false;
        return;
      }

      state.isLoggedIn = true;
      state.username = login.data.nombreUsuario;

      if (login.data.idRol === 4) {
        state.rutas = [];
        return;
      }

      if (login.data.idRol === 1) {
        state.isAdmin = true;
        let ruta = rutaAdministador;
        if (state.permisos.length) {
          ruta = rutaAdministador.filter((current) =>
            state.permisos.includes(current.href.name)
          );
        }
        state.rutas = ruta;
        return;
      }

      if (login.data.idRol === 2) {
        state.isEmpresa = true;
        let ruta = rutaEmpresa;
        if (state.permisos.length) {
          ruta = rutaEmpresa.filter((current) =>
            state.permisos.includes(current.href.name)
          );
        }
        state.rutas = ruta;
        return;
      }

      if (login.data.idRol === 3) {
        state.isAspirante = true;
        let ruta = rutaAspirante;
        if (state.permisos.length) {
          ruta = rutaAspirante.filter((current) =>
            state.permisos.includes(current.href.name)
          );
        }
        state.rutas = ruta;
        state.idCv =
          login?.data?.rolAspirante?.curriculum?.idCurriculum || "Not Found";
      }
    },
  },
  actions: {},
  modules: {},
});
