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
                v-model.trim="formData.usuario"
                prepend-icon="mdi-account"
                name="usuario"
                label="Usuario"
                type="text"
                @keypress.enter="ingresar"
                :rules="requiredField"
              ></v-text-field>
              <v-text-field
                v-model.trim="formData.clave"
                prepend-icon="mdi-lock"
                name="password"
                label="Password"
                type="password"
                :rules="requiredField"
                @keypress.enter="ingresar"
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
      formData: { usuario: "", clave: "" },
      valid: true,
      requiredField: [(v) => !!v || "Campo requerido"],
    };
  },
  methods: {
    ingresar() {
      if (!this.$refs.form.validate()) {
        this.$store.commit("SHOW_NOTIFICATION", {
          text: "Debe completar los campos.",
          color: "red",
        });
        return;
      }
      // eslint-disable-next-line no-undef
      axios.post("/login", null, { params: this.formData }).then((result) => {
        localStorage.setItem("login", JSON.stringify(result.data));
        this.$store.commit("SHOW_NOTIFICATION", {
          text: result.data.message || "Operación realizada.",
        });
        this.$router.push("/");
        window.location.reload();
      });
    },
  },
};
</script>
