<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md6>
        <v-card class="elevation-12">
          <v-toolbar dark color="blue-grey darken-2">
            <v-toolbar-title>Registrar Empresa 🏭</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-img
              lazy-src="https://picsum.photos/id/11/10/6"
              :max-height="150"
              :max-width="150"
              contain
              :src="formData.logoUrl"
            ></v-img>
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-text-field
                v-model.trim="formData.nombre"
                prepend-icon="mdi-store"
                name="nombre"
                label="Nombre de la empresa"
                type="text"
                :rules="[(value) => !!value || 'Requerido.']"
              ></v-text-field>

              <v-autocomplete
                v-model="formData.rubro.idRubro"
                prepend-icon="mdi-check-bold"
                :items="rubros"
                label="Rubros"
                item-text="nombre"
                item-value="idRubro"
                :rules="[(v) => !!v || 'El rubro es requerido.']"
              ></v-autocomplete>

              <v-text-field
                v-model.trim="formData.logoUrl"
                prepend-icon="mdi-link"
                name="logo_url"
                label="Enlace del logo"
                type="text"
                :rules="[(value) => !!value || 'Requerido.']"
              ></v-text-field>

              <v-textarea
                v-model.trim="formData.informacion"
                prepend-icon="mdi-information-variant"
                name="informacion"
                label="Informacion adicional"
                type="text"
                :counter="300"
              ></v-textarea>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue-grey darken-1" @click="limpiar" dark
              >Cancelar</v-btn
            >
            <v-btn color="primary" :disabled="!valid" @click="ingresar"
              >Crear</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: "SignUpEmpresa",
  // nombre_usuario, id_rubro, nombre, logo_url, informacion
  props: {
    usuario: String,
  },
  data() {
    return {
      formData: {
        nombre: "",
        logoUrl: "",
        informacion: "",
        nombreUsuario: "",
        rubro: { idRubro: "" },
      },
      rubros: [],
      valid: true,
    };
  },
  created() {
    // eslint-disable-next-line no-undef
    axios
      .get("/rubro")
      .then((result) => (this.rubros = result.data.data || []));
    this.formData.nombreUsuario = this.usuario;
  },
  methods: {
    ingresar() {
      if (!this.$refs.form.validate()) {
        this.$store.commit("SHOW_NOTIFICATION", {
          text: "Debe verificar los campos.",
          color: "red",
        });
        return;
      }
      // eslint-disable-next-line no-undef
      axios.post("/empresa", this.formData).then((result) => {
        this.$store.commit("SHOW_NOTIFICATION", {
          text: result.data.message || "Operación realizada.",
        });
        this.$router.push("ingresar");
      });
    },
    limpiar() {
      this.$refs.form.reset();
    },
  },
};
</script>
