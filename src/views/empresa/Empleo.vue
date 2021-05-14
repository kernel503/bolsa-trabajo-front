<template>
  <v-container>
    <v-layout align-center justify-center>
      <v-flex xs12 sm10 md10>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-row>
            <v-col cols="12" sm="6">
              <v-text-field
                v-model="data.perfilAcademico"
                :rules="[(v) => !!v || 'Campo requerido']"
                label="Posición laboral"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                v-model="data.habilidad"
                :rules="[(v) => !!v || 'Campo requerido']"
                label="Conocimientos o Habilidades"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="6">
              <v-text-field
                v-model="data.experiencia"
                :rules="[(v) => !!v || 'Experiencia requerido']"
                label="Experiencia"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                v-model="data.rangoSalarial"
                :rules="[(v) => !!v || 'Salario requerido']"
                label="Salario"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" sm="6">
              <AutoCompleteApi
                path="/tipo/empleo"
                label="Tipo de Empleo"
                text="nombre"
                idvalue="idTipoEmpleo"
                v-model="data.tipoEmpleo.idTipoEmpleo"
              />
            </v-col>
            <v-col cols="12" sm="6">
              <AutoCompleteApi
                path="/departamento"
                label="Departamento"
                text="nombre"
                idvalue="idDepartamento"
                v-model="data.departamento.idDepartamento"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="6">
              <v-text-field
                v-model="data.informacionAdicional"
                label="Comentario Adicional"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-switch
                v-model="data.visible"
                label="Solicitud visible"
              ></v-switch>
            </v-col>
          </v-row>
        </v-form>
        <v-btn color="indigo" @click="crearEmpleo" dark>
          Guardar solicitud
        </v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import AutoCompleteApi from "@/components/AutoCompleteApi.vue";
export default {
  name: "EmpresaEmpleo",
  components: {
    AutoCompleteApi,
  },
  data() {
    return {
      valid: true,
      data: {
        tipoEmpleo: {
          idTipoEmpleo: "",
        },
        empresa: { idEmpresa: this.$store.state.username },
        departamento: {
          idDepartamento: "",
        },
        perfilAcademico: "",
        habilidad: "",
        experiencia: "",
        rangoSalarial: "",
        informacionAdicional: "",
        fechaRegistro: Date.now(),
        visible: true,
      },
    };
  },

  created() {
    // eslint-disable-next-line no-undef
    axios
      .get("/categoria/evaluacion")
      .then((result) => (this.listado = result.data.data || []));
  },

  methods: {
    crearEmpleo() {
      if (!this.$refs.form.validate()) {
        this.$store.commit("SHOW_NOTIFICATION", {
          text: "Debe completar los campos.",
          color: "red",
        });
        return;
      }
      // eslint-disable-next-line no-undef
      axios.post("/solicitud/empleo", this.data).then((result) => {
        this.$refs.form.reset();
        this.$store.commit("SHOW_NOTIFICATION", {
          text: result.data.message || "Operación realizada.",
        });
      });
    },
  },
};
</script>
