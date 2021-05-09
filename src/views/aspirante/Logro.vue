<template>
  <v-container>
    <v-layout align-center justify-center>
      <v-flex xs12 sm12 md8>
        <p class="text-h6 mb-2">Logros</p>
        <v-divider></v-divider>
        <v-form ref="form" v-model="valid" lazy-validation class="mt-2">
          <v-row>
            <v-col class="my-0 py-2">
              <v-text-field
                label="Nombre"
                required
                v-model="formData.informacion"
                :rules="fieldRules"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col class="my-0 py-2">
              <v-menu
                v-model="menu"
                :close-on-content-click="false"
                :close-on-click="true"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="formData.fechaObtenido"
                    label="Fecha obtenido"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                    :rules="fieldRules"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="formData.fechaObtenido"
                  @input="menu = false"
                ></v-date-picker>
              </v-menu>
            </v-col>
          </v-row>
          <v-btn class="mt-3" color="blue-grey darken-1" @click="resetForm" dark
            >Cancelar</v-btn
          >
          <v-btn
            class="mx-3 mt-3"
            color="primary"
            :disabled="!valid"
            @click="addInformation"
            >Agregar</v-btn
          >
        </v-form>

        <v-list two-line subheader class="mt-8">
          <template v-for="item in list">
            <v-list-item :key="item.idLogro">
              <v-list-item-content>
                <v-list-item-title>{{ item.informacion }}</v-list-item-title>
                <v-list-item-subtitle>
                  {{ item.fechaObtenido }}
                </v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-icon>
                <v-icon color="red" @click="deleteInformation(item.idLogro)">
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
export default {
  name: "Logro",

  mounted() {
    this.fetchInformation();
  },

  data() {
    return {
      fieldRules: [(v) => !!v || "Campo requerido"],
      date: "",
      menu: false,
      formData: {
        idCv: this.$store.state.idCv,
        informacion: "",
        fechaObtenido: "",
      },
      urlBase: "/logro/",
      list: [],
      valid: false,
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
