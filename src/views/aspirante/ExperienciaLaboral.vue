<template>
  <v-container>
    <v-layout align-center justify-center>
      <v-flex xs12 sm12 md8>
        <p class="text-h6 mb-2">Experiencia laboral</p>
        <v-divider></v-divider>
        <v-form ref="form" v-model="valid" lazy-validation class="mt-2">
          <v-row>
            <v-col class="my-0 py-2">
              <v-text-field
                label="Cargo desempeñado"
                required
                v-model="formData.cargo"
                :rules="fieldRules"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col class="my-0 py-2">
              <v-text-field
                label="Nombre de la empresa"
                required
                v-model="formData.nombreOrg"
                :rules="fieldRules"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col class="my-0 py-2">
              <v-text-field
                label="Correo de contacto"
                required
                v-model="formData.contacto.correo"
                :rules="emailField"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col class="my-0 py-2">
              <v-text-field
                label="Número de contacto"
                required
                v-model="formData.contacto.numero"
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
                    v-model="formData.fechaInicio"
                    label="Fecha inicio"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                    :rules="fieldRules"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="formData.fechaInicio"
                  @input="menu = false"
                ></v-date-picker>
              </v-menu>
            </v-col>
          </v-row>

          <v-row>
            <v-col class="my-0 py-2">
              <v-menu
                v-model="menu2"
                :close-on-content-click="false"
                :close-on-click="true"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="formData.fechaFin"
                    label="Fecha fin"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                    :rules="fieldRules"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="formData.fechaFin"
                  @input="menu2 = false"
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
            <v-list-item :key="item.idExperienciaLaboral">
              <v-list-item-content>
                <v-list-item-title>
                  {{ item.nombreOrg }} - {{ item.cargo }}
                </v-list-item-title>
                <v-list-item-subtitle>
                  {{ item.fechaInicio }} hasta {{ item.fechaFin }}
                </v-list-item-subtitle>
                <v-list-item-subtitle>
                  {{ item.contacto.correo }}
                </v-list-item-subtitle>
                <v-list-item-subtitle>
                  {{ item.contacto.numero }}
                </v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-icon>
                <v-icon
                  color="red"
                  @click="deleteInformation(item.idExperienciaLaboral)"
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
export default {
  name: "ExperienciaLaboral",

  mounted() {
    this.fetchInformation();
  },

  data() {
    return {
      regexEmail: /\S+@\S+\.\S+/,
      emailField: [(v) => this.regexEmail.test(v) || "Ingresar correo válido"],
      fieldRules: [(v) => !!v || "Campo requerido"],
      urlBase: "/experiencia/laboral/",
      formData: {
        idCv: this.$store.state.idCv,
        cargo: "",
        nombreOrg: "",
        contacto: {
          correo: "",
          numero: "",
        },
        fechaInicio: "",
        fechaFin: "",
      },
      valid: false,
      menu: false,
      menu2: false,
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
