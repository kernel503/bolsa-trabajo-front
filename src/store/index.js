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
    isAdministrador: false,
    idCv: "Not Found",
    rutas: [],
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
      if (!login) {
        state.isLoggedIn = false;
        return;
      }
      state.isLoggedIn = true;
      state.username = login.data.nombreUsuario;
      if (login.data.idRol === 1) {
        state.isAdministrador = true;
        state.rutas = rutaAdministador;
        return;
      }
      if (login.data.rolEmpresa) {
        state.isEmpresa = true;
        state.rutas = rutaEmpresa;
        return;
      }
      if (login.data.rolAspirante) {
        state.isAspirante = true;
        state.rutas = rutaAspirante;
        state.idCv =
          login?.data?.rolAspirante?.curriculum?.idCurriculum || "Not Found";
      }
    },
  },
  actions: {},
  modules: {},
});
