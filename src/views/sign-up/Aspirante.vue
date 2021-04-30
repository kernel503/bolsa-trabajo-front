<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md6>
        <v-card class="elevation-12">
          <v-toolbar dark color="blue-grey darken-2">
            <v-toolbar-title>Registro Aspirante ✍</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-text-field
                v-model.trim="formData.nombre"
                prepend-icon="mdi-rename-box"
                name="nombres"
                label="Nombres "
                type="text"
                :rules="[(value) => !!value || 'Requerido.']"
              ></v-text-field>

              <v-text-field
                v-model.trim="formData.apellido"
                prepend-icon="mdi-rename-box"
                name="apellidos"
                label="Apellidos"
                type="text"
                :rules="[(value) => !!value || 'Requerido.']"
              ></v-text-field>
              <v-menu
                v-model="menu"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="formData.fechaNacimiento"
                    label="Fecha de nacimiento"
                    prepend-icon="mdi-calendar"
                    :rules="[(value) => !!value || 'Requerido.']"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="formData.fechaNacimiento"
                  locale="es-sv"
                  :max="max_calendar"
                  min="1950"
                  @input="menu = false"
                ></v-date-picker>
              </v-menu>

              <v-autocomplete
                v-model.trim="formData.genero"
                prepend-icon="mdi-gender-female"
                :items="lista_genero"
                label="Genero"
                item-text="nombre"
                item-value="nombre"
                :rules="[(v) => !!v || 'El genero es requerido']"
              ></v-autocomplete>

              <v-autocomplete
                v-model.trim="formData.departamento.idDepartamento"
                prepend-icon="mdi-home-city"
                :items="departamentos"
                label="Departamento donde vive actualmente"
                item-text="nombre"
                item-value="idDepartamento"
                key="id"
                :rules="[(v) => !!v || 'El departamento es requerido']"
              ></v-autocomplete>
              <v-text-field
                v-model.trim="formData.contacto.numero"
                prepend-icon="mdi-cellphone"
                name="número contacto"
                label="Número/s de contacto"
                type="text"
                :rules="[(value) => !!value || 'Requerido.']"
              ></v-text-field>
              <v-text-field
                v-model.trim="formData.contacto.correo"
                prepend-icon="mdi-email"
                name="login"
                label="Correo"
                type="text"
                :rules="emailField"
                validate-on-blur
              ></v-text-field>
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
  name: "SignUpAspirante",
  props: {
    usuario: { type: Object, required: true },
  },
  data() {
    return {
      regexEmail: /\S+@\S+\.\S+/,
      emailField: [
        (v) => this.regexEmail.test(v) || "Ingresar correo valido.",
        (v) => !!v || "El correo es requerido.",
      ],
      formData: {
        nombreUsuario: "",
        nombre: "",
        apellido: "",
        genero: "",
        fechaNacimiento: "",
        contacto: {
          correo: "",
          numero: "",
        },
        departamento: { idDepartamento: "" },
      },
      departamentos: [],
      lista_genero: [
        { id: "M", nombre: "Masculino" },
        { id: "F", nombre: "Femenino" },
        { id: "N", nombre: "Prefiero No Decir" },
      ],
      valid: true,
      menu: false,
      date: new Date().toISOString().substr(0, 10),
      on: null,
      attrs: null,
      max_calendar: new Date().toISOString().substr(0, 10),
    };
  },
  created() {
    // eslint-disable-next-line no-undef
    axios
      .get("/pais/sv")
      .then(
        (result) => (this.departamentos = result.data.data.departamentos || [])
      );
    this.formData.contacto.correo = this.usuario.correo;
    this.formData.nombreUsuario = this.usuario.usuario;
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
      axios.post("/aspirante", this.formData).then((result) => {
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
