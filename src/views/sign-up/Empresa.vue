<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md6>
        <v-card class="elevation-12">
          <v-toolbar dark color="blue-grey darken-2">
            <v-toolbar-title>Registrar Empresa 🏙</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-text-field
                v-model.trim="formData.nombre"
                prepend-icon="mdi-store"
                name="nombre"
                label="Nombre de la empresa"
                type="text"
                :rules="[(value) => !!value || 'Requerido.']"
              ></v-text-field>

              <v-select
                v-model.trim="formData.id_rubro"
                prepend-icon="mdi-check-bold"
                :items="lista_rubro"
                label="Rubros"
                item-text="nombre"
                item-value="id"
                :rules="[(v) => !!v || 'El rubro es requerido']"
              ></v-select>

              <v-img
                lazy-src="https://picsum.photos/id/11/10/6"
                :max-height="250"
                :max-width="250"
                contain
                :src="formData.logo_url"
                align-center
              ></v-img>

              <v-text-field
                v-model.trim="formData.logo_url"
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
                :counter="250"
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
    nombre_usuario: String,
  },
  data() {
    return {
      formData: {
        id_rubro: "",
        informacion: "",
        logo_url: "",
        nombre_usuario: "",
        nombre: "",
      },
      lista_rubro: [
        { id: 1, nombre: "Agroservicio" },
        { id: 2, nombre: "Aire" },
        { id: 3, nombre: "Alimentacion" },
        { id: 4, nombre: "Otros" },
      ],
      valid: true,
    };
  },
  methods: {
    ingresar() {
      if (!this.$refs.form.validate()) {
        console.log("Mostra Alerta");
        this.$store.commit("SHOW_NOTIFICATION", {
          text: "Debe verificar los campos.",
          color: "red",
        });
        return;
      }

      console.log(this.formData);
    },
    limpiar() {
      this.$refs.form.reset();
    },
  },
};
</script>
