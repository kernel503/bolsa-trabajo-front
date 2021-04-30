<template>
  <v-container fluid class="px-15">
    <v-stepper v-model="e1" non-linear>
      <v-stepper-header>
        <v-stepper-step step="1" editable> Crear Cuenta </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step step="2" editable>
          Completar el formulario
        </v-stepper-step>
      </v-stepper-header>

      <v-stepper-items>
        <v-stepper-content step="1">
          <v-layout align-center justify-center class="mb-8">
            <v-flex xs12 sm8 md6>
              <v-card class="elevation-12">
                <v-toolbar dark color="blue-grey darken-2">
                  <v-toolbar-title>Registrar Usuario 🚀</v-toolbar-title>
                </v-toolbar>
                <v-card-text>
                  <v-form ref="form" v-model="valid" lazy-validation>
                    <v-text-field
                      v-model.trim="formData.usuario"
                      prepend-icon="mdi-account"
                      name="login"
                      label="Usuario"
                      type="text"
                      persistent-hint
                      hint="Los usuarios son sensibles a mayúsculas."
                      :rules="noSpacesField"
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
                      hint="Como mínimo 8 caracteres"
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
                    <v-switch
                      label="Registrar cuenta para empresa"
                      v-model="switchInput"
                      color="blue-grey darken-3"
                      hide-details
                    ></v-switch>
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
        </v-stepper-content>

        <v-stepper-content step="2">
          <SignUpEmpresa
            v-if="switchInput && +e1 === 2"
            v-bind:usuario="formData.usuario"
          ></SignUpEmpresa>
          <SignUpAspirante
            v-bind:usuario="formData"
            v-if="!switchInput && +e1 === 2"
          ></SignUpAspirante>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </v-container>
</template>

<script>
import SignUpEmpresa from "./Empresa";
import SignUpAspirante from "./Aspirante";
export default {
  name: "SignUpForm",
  components: {
    SignUpEmpresa,
    SignUpAspirante,
  },
  props: {
    source: String,
  },
  data() {
    return {
      e1: 1,
      switchInput: false,
      formData: {
        usuario: "",
        clave: "",
        correo: "",
      },
      valid: true,
      regexEmail: /\S+@\S+\.\S+/,
      requiredField: [(v) => !!v || "Campo requerido"],
      noSpacesField: [
        (v) => !/\s/g.test(v) || "No debe contener espacios.",
        (v) => !!v || "Campo requerido",
      ],
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
        this.$store.commit("SHOW_NOTIFICATION", {
          text: "Debe verificar los campos.",
          color: "red",
        });
        return;
      }

      // eslint-disable-next-line no-undef
      axios
        .post("/usuario/crear", null, { params: this.formData })
        .then((result) => {
          console.log(result);
          this.usuario = result.data.nombreUsuario;
          this.e1 = 2;
          this.$store.commit("SHOW_NOTIFICATION", {
            text: result.data.message || "Debe verificar los campos.",
          });
        });
    },
    limpiar() {
      this.$refs.form.reset();
    },
  },
};
</script>
