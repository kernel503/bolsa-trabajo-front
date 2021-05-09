<template>
  <v-container>
    <v-layout align-center justify-center>
      <v-flex xs12 sm12 md8>
        <p class="text-h6 mb-2">Idioma</p>
        <v-divider></v-divider>
        <v-form ref="form" v-model="valid" lazy-validation class="mt-2">
          <v-row>
            <v-col class="my-0 py-2">
              <AutoCompleteApi
                path="/idioma"
                label="Seleccionar el idioma"
                text="nombre"
                idvalue="idIdioma"
                v-model="formData.idIdioma"
              />
            </v-col>
          </v-row>

          <v-row>
            <v-col class="my-0 py-2">
              <AutoCompleteApi
                path="/nivel/dominio"
                label="Seleccionar el nivel"
                text="nombre"
                idvalue="idNivelDominio"
                v-model="formData.idNivelDominio"
              />
            </v-col>
          </v-row>

          <v-row>
            <v-col class="my-0 py-2">
              <AutoCompleteApi
                path="/lengua/categoria"
                label="Clasificación"
                text="nombre"
                idvalue="idLenguaCategoria"
                v-model="formData.idLenguaCategoria"
              />
            </v-col>
          </v-row>

          <v-btn class="mt-4" color="blue-grey darken-1" @click="resetForm" dark
            >Cancelar</v-btn
          >
          <v-btn
            class="mx-3 mt-4"
            color="primary"
            :disabled="!valid"
            @click="addInformation"
            >Agregar</v-btn
          >
        </v-form>

        <v-list two-line subheader class="mt-8">
          <template v-for="item in list">
            <v-list-item :key="item.idDetalleIdioma">
              <v-list-item-content>
                <v-list-item-title>
                  {{ item.nivelDominio }} : {{ item.idioma }}
                </v-list-item-title>
                <v-list-item-subtitle>
                  {{ item.categoria }}
                </v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-icon>
                <v-icon
                  color="red"
                  @click="deleteInformation(item.idDetalleIdioma)"
                >
                  mdi-delete
                </v-icon>
              </v-list-item-icon>
            </v-list-item>
          </template>
        </v-list>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import AutoCompleteApi from "@/components/AutoCompleteApi.vue";
export default {
  name: "PublicacionLiteraria",

  components: {
    AutoCompleteApi,
  },

  mounted() {
    this.fetchInformation();
  },

  data() {
    return {
      fieldRules: [(v) => !!v || "Campo requerido"],
      urlBase: "/detalle/idioma/",
      formData: {
        idCv: this.$store.state.idCv,
        idIdioma: "",
        idNivelDominio: "",
        idLenguaCategoria: "",
      },
      valid: false,
      menu: false,
      list: [],
    };
  },

  methods: {
    fetchInformation() {
      // eslint-disable-next-line no-undef
      axios.get(this.urlBase + this.$store.state.idCv).then((response) => {
        if (response.data.statusCode === 200) {
          this.list = response?.data?.data || [];
          //this.fetchUserInformation();
        }
      });
    },

    addInformation() {
      if (!this.$refs.form.validate()) {
        this.$store.commit("SHOW_NOTIFICATION", {
          text: "Debe completar el formulario.",
          color: "red",
        });
        return;
      }
      // eslint-disable-next-line no-undef
      axios.post(this.urlBase, this.formData).then((response) => {
        if (response.data.statusCode === 200) {
          this.$store.commit("SHOW_NOTIFICATION", {
            text: "Elemento agregado.",
          });
          this.fetchInformation();
          this.$refs.form.reset();
        }
      });
    },

    deleteInformation(id) {
      // eslint-disable-next-line no-undef
      axios.delete(this.urlBase + id).then((response) => {
        if (response.data.statusCode === 200) {
          this.$store.commit("SHOW_NOTIFICATION", {
            text: "Elemento eliminado.",
          });
          this.fetchInformation();
          this.$refs.form.reset();
        }
      });
    },

    resetForm() {
      this.$refs.form.reset();
    },
  },
};
</script>
