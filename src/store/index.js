import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLoggedIn: false,
    isDoingRequest: false,
    snackbar: { display: false, text: "", color: "indigo" },
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
    },
    LOG_OUT(state) {
      state.isLoggedIn = false;
    },
    SHOW_NOTIFICATION(state, value) {
      state.snackbar = { color: "indigo", ...value, display: true };
    },
  },
  actions: {},
  modules: {},
});
