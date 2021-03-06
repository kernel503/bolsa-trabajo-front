import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
const axios = require("axios");

store.commit("VALIDATE_SESSION");

const instance = axios.create({
  baseURL: "https://bolsa-trabajo-spring.herokuapp.com/api",
  timeout: 8000,
  headers: { Accept: "application/json", "Content-Type": "application/json" },
});

instance.interceptors.request.use(
  function (config) {
    store.commit("START_REQUEST");
    return config;
  },
  function (error) {
    store.commit("END_REQUEST");
    store.commit("SHOW_NOTIFICATION", {
      text: "Error en la petición.",
      color: "red",
    });
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  function (response) {
    store.commit("END_REQUEST");
    return response;
  },
  function (error) {
    store.commit("END_REQUEST");
    const text = error.response?.data?.message || "Error en la petición.";
    store.commit("SHOW_NOTIFICATION", {
      text,
      color: "red",
    });
    return Promise.reject(error);
  }
);

window.axios = instance;

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
