<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md6>
        <v-card class="elevation-12">
          <v-toolbar dark color="blue-grey darken-2">
            <v-toolbar-title>Registro Aspirante 👔</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-text-field
                v-model.trim="formData.nombres"
                prepend-icon="mdi-rename-box"
                name="nombres"
                label="Nombres "
                type="text"
                :rules="[(value) => !!value || 'Requerido.']"
              ></v-text-field>
              <v-text-field
                v-model.trim="formData.apellidos"
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
                    v-model="formData.fecha_nacimiento"
                    label="Fecha de nacimiento"
                    prepend-icon="mdi-calendar"
                    :rules="[(value) => !!value || 'Requerido.']"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="formData.fecha_nacimiento"
                  locale="es-sv"
                  :max="max_calendar"
                  min="1950"
                  @input="menu = false"
                ></v-date-picker>
              </v-menu>

              <v-select
                v-model.trim="formData.genero"
                prepend-icon="mdi-gender-female"
                :items="lista_genero"
                label="Genero"
                item-text="nombre"
                item-value="id"
                :rules="[(v) => !!v || 'El genero es requerido']"
              ></v-select>

              <v-select
                v-model.trim="formData.id_departamento"
                prepend-icon="mdi-home-city"
                :items="lista_departamento"
                label="Departamento donde vive actualmente"
                item-text="nombre"
                item-value="id"
                :rules="[(v) => !!v || 'El departamento es requerido']"
              ></v-select>

              <v-autocomplete
                v-model="formData.nacionalidad"
                :items="lista_nacionalidad"
                prepend-icon="mdi-home-account"
                item-text="nombre"
                item-value="nombre"
                label="Nacionalidad"
                auto-select-first
                chips
                clearable
                :rules="[(v) => !!v || 'La nacionalidad es requerido']"
              ></v-autocomplete>
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
//Nombre_usuario,id_contacto,id_departamento,nombres,apellidos,genero, fecha_nacimiento,nacionalidad

export default {
  name: "NotFound",
  props: {
    nombre_usuario: String,
  },
  data() {
    return {
      formData: {
        apellidos: null,
        id_contacto: null,
        id_departamento: null,
        nombres: null,
        nombre_usuario: null,
        fecha_nacimiento: null,
        genero: null,
        nacionalidad: null,
      },
      lista_rubro: [
        { id: 1, nombre: "Agroservicio" },
        { id: 2, nombre: "Aire" },
        { id: 3, nombre: "Alimentacion" },
        { id: 4, nombre: "Otros" },
      ],
      lista_departamento: [
        { id: 1, nombre: "Ahuachapán", iso: "SLV" },
        { id: 2, nombre: "Cabañas", iso: "SLV" },
        { id: 3, nombre: "Chalatenango", iso: "SLV" },
        { id: 4, nombre: "Cuscatlán", iso: "SLV" },
        { id: 5, nombre: "La Libertad", iso: "SLV" },
        { id: 6, nombre: "La Paz", iso: "SLV" },
        { id: 7, nombre: "La Unión", iso: "SLV" },
        { id: 8, nombre: "Morazán", iso: "SLV" },
        { id: 9, nombre: "San Miguel", iso: "SLV" },
        { id: 10, nombre: "San Salvador", iso: "SLV" },
        { id: 11, nombre: "San Vicente", iso: "SLV" },
        { id: 12, nombre: "Santa Ana", iso: "SLV" },
        { id: 13, nombre: "Sonsonate", iso: "SLV" },
        { id: 14, nombre: "Usulután", iso: "SLV" },
        { id: 15, nombre: "Extranjero", iso: "Otros" },
      ],
      lista_genero: [
        { id: "M", nombre: "Masculino" },
        { id: "F", nombre: "Femenino" },
        { id: "N", nombre: "Prefiero No Decir" },
      ],
      lista_nacionalidad: [
        { nombre: "Salvadoreño" },
        { nombre: "Guatemanteco" },
        { nombre: "Hondureño" },
        { nombre: "Internacional" },
      ],
      valid: true,
      menu: false,
      date: new Date().toISOString().substr(0, 10),
      on: null,
      attrs: null,
      max_calendar: new Date().toISOString().substr(0, 10),
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
