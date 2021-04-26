<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card class="elevation-12">
          <v-toolbar dark color="blue-grey darken-2">
            <v-toolbar-title>Registrar 🚀</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-text-field
                v-model.trim="formData.nombre_usuario"
                prepend-icon="mdi-account"
                name="login"
                label="Usuario"
                type="text"
                :rules="requiredField"
              ></v-text-field>
              <v-text-field
                v-model.trim="formData.correo"
                prepend-icon="mdi-email"
                name="login"
                label="Correo"
                type="text"
                :rules="emailField"
                validate-on-blur
              ></v-text-field>
              <v-text-field
                v-model.trim="formData.clave"
                id="password"
                prepend-icon="mdi-lock"
                name="password"
                label="Password"
                type="password"
                :rules="requiredField"
              ></v-text-field>
              <v-text-field
                id="password2"
                prepend-icon="mdi-lock"
                name="password2"
                label="Repetir Password"
                type="password"
                :rules="sameField"
                validate-on-blur
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue-grey darken-1" @click="limpiar" dark
              >Cancelar</v-btn
            >
            <v-btn color="primary" @click="ingresar">Crear</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: "SignUpForm",
  props: {
    source: String,
  },
  data() {
    return {
      formData: { nombre_usuario: "", clave: "", correo: "" },
      valid: true,
      regexEmail: /\S+@\S+\.\S+/,
      requiredField: [(v) => !!v || "Campo requerido"],
      emailField: [(v) => this.regexEmail.test(v) || "Ingresar correo valido"],
      sameField: [
        (v) => v === this.formData.clave || "La contraseña no coincide",
        (v) => !!v || "Campo requerido",
      ],
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
      console.log("Hacer peticion");
      console.log(this.$refs.form.validate() ? "Valido" : "No Valido");
      this.$store.commit("START_REQUEST");
      setTimeout(() => {
        this.$store.commit("END_REQUEST");
      }, 2000);
    },
    limpiar() {
      this.$refs.form.reset();
    },
  },
};
</script>
