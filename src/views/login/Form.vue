<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card class="elevation-12">
          <v-toolbar dark color="blue-grey darken-2">
            <v-toolbar-title>Bienvenido 🚀</v-toolbar-title>
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
                v-model.trim="formData.clave"
                id="password"
                prepend-icon="mdi-lock"
                name="password"
                label="Password"
                type="password"
                :rules="requiredField"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="ingresar">Login</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: "LoginForm",
  props: {
    source: String,
  },
  data() {
    return {
      formData: { nombre_usuario: "", clave: "" },
      valid: true,
      requiredField: [(v) => !!v || "Campo requerido"],
    };
  },
  methods: {
    ingresar() {
      if (!this.$refs.form.validate()) {
        console.log("Mostra Alerta");
        this.$store.commit("SHOW_NOTIFICATION", {
          text: "Debe completar los campos.",
          color: "red",
        });
        return;
      }
      console.log("Hacer peticion");
      console.log(this.$refs.form.validate() ? "Valido" : "No Valido");
      console.log(JSON.stringify(this.formData));
      this.$router.push("About");
      this.$store.commit("START_REQUEST");
      this.$store.commit("SHOW_NOTIFICATION", {
        text: "Good JOB.",
      });
      this.$store.commit("LOG_IN");
      setTimeout(() => {
        this.$store.commit("END_REQUEST");
      }, 2000);
    },
  },
};
</script>
