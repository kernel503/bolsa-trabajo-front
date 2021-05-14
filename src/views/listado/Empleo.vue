<template>
  <v-container>
    <v-row class="my-0">
      <v-col cols="12" sm="6">
        <v-text-field
          label="Nombre empresa"
          v-model.trim="empresa"
          clearable
        ></v-text-field
      ></v-col>
      <v-col cols="12" sm="6">
        <v-text-field
          label="Filtrar puesto"
          v-model.trim="cargo"
          clearable
        ></v-text-field
      ></v-col>
    </v-row>
    <v-row class="my-0">
      <v-col cols="12" sm="6">
        <AutoCompleteApi
          path="/departamento"
          label="Seleccionar el departamento."
          text="nombre"
          idvalue="idDepartamento"
          v-model="idDepartamento"
          multiple
        />
      </v-col>
      <v-col cols="12" sm="6">
        <AutoCompleteApi
          path="/tipo/empleo"
          label="Seleccionar el tipo de empleo."
          text="nombre"
          idvalue="idTipoEmpleo"
          v-model="idTipoPuesto"
          multiple
        />
      </v-col>
    </v-row>

    <v-row>
      <p class="text-h6 mb-2" v-if="!filtroEmpleos.length">Sin resultados</p>
      <template v-for="solicitud in filtroEmpleos">
        <v-col
          class="d-flex"
          cols="12"
          col="8"
          md="4"
          :key="solicitud.idSolicitudEmpleo"
        >
          <v-card class="mx-auto" max-width="350" min-width="350">
            <template slot="progress">
              <v-progress-linear
                color="deep-purple"
                height="10"
                indeterminate
              ></v-progress-linear>
            </template>
            <div class="d-flex flex-column justify-space-between align-center">
              <v-img
                class="align-self-stretch"
                :aspect-ratio="16 / 8"
                :src="solicitud.empresa.logoUrl"
                contain
              ></v-img>
            </div>
            <v-card-title>{{ solicitud.empresa.idEmpresa }}</v-card-title>
            <v-card-text>
              <div class="subtitle-1">
                {{
                  `${solicitud.departamento.nombre} - ${solicitud.tipoEmpleo.nombre}`
                }}
              </div>
            </v-card-text>

            <v-divider class="mx-4"></v-divider>
            <v-card-title>{{ solicitud.perfilAcademico }}</v-card-title>
            <v-card-text>
              {{ solicitud.fechaRegistro }}

              <div class="mt-2">
                Perfil solicitado
                <ul v-for="(li, i) in solicitud.habilidad.split('.')" :key="i">
                  <li v-if="li">{{ li }}.</li>
                </ul>
              </div>

              <div class="mt-2">
                Experiencia
                <ul
                  v-for="(li, i) in solicitud.experiencia.split('.')"
                  :key="i"
                >
                  <li v-if="li">{{ li }}.</li>
                </ul>
              </div>

              <div class="mt-2">
                Salario
                <ul
                  v-for="(li, i) in solicitud.rangoSalarial.split('.')"
                  :key="i"
                >
                  <li v-if="li">{{ li }}.</li>
                </ul>
              </div>

              <div class="mt-2" v-if="solicitud.informacionAdicional">
                Información Adicional
                <ul
                  v-for="(li, i) in solicitud.informacionAdicional.split('.')"
                  :key="i"
                >
                  <li v-if="li">{{ li }}.</li>
                </ul>
              </div>
            </v-card-text>
            <v-card-actions
              v-if="
                solicitud.empresa.idEmpresa === $store.state.username &&
                $store.state.isEmpresa &&
                $store.state.isLoggedIn
              "
            >
              <v-btn
                color="deep-purple"
                text
                dark
                @click="
                  udpdate(solicitud.idSolicitudEmpleo, !solicitud.visible)
                "
              >
                Ocultar
              </v-btn>
            </v-card-actions>
            <v-card-actions
              v-if="$store.state.isAspirante && $store.state.isLoggedIn"
            >
              <v-btn
                color="deep-purple"
                text
                dark
                @click="aplicar(solicitud.idSolicitudEmpleo)"
              >
                Aplicar al puesto
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </template>
    </v-row>
  </v-container>
</template>
<script>
import AutoCompleteApi from "@/components/AutoCompleteApi.vue";
export default {
  name: "ListadoEmpleo",
  components: {
    AutoCompleteApi,
  },

  data() {
    return {
      idTipoPuesto: [],
      idDepartamento: [],
      cargo: "",
      empresa: "",
      formData: { idTipoPuesto: "", idDepartamento: "", cargo: "" },
      listado: [],
    };
  },

  computed: {
    filtroEmpleos() {
      if (this.empresa) {
        return this.listado.filter((current) =>
          current.empresa.nombreUsuario
            .toLowerCase()
            .includes(this.empresa.toLowerCase())
        );
      }
      return this.listado;
    },
  },

  created() {
    this.fetchData();
  },

  watch: {
    idTipoPuesto(value) {
      if (value.length) {
        this.formData.idTipoPuesto = value.join(", ");
      } else {
        this.formData.idTipoPuesto = "";
      }
      this.fetchData();
    },

    idDepartamento(value) {
      if (value.length) {
        this.formData.idDepartamento = value.join(", ");
      } else {
        this.formData.idDepartamento = "";
      }
      this.fetchData();
    },

    cargo(value) {
      if (value) {
        this.formData.cargo = value;
      } else {
        this.formData.cargo = "";
      }
      this.fetchData();
    },
  },

  methods: {
    fetchData() {
      // eslint-disable-next-line no-undef
      axios
        .get("/solicitud/empleo/filtro", { params: this.formData })
        .then((result) => {
          this.listado = result?.data?.data || [];
          this.listado = this.listado.filter((current) => current.visible);
        });
    },

    udpdate(id, status) {
      // eslint-disable-next-line no-undef
      axios.put(`/solicitud/empleo/${id}/${status}`).then((result) => {
        this.$store.commit("SHOW_NOTIFICATION", {
          text: result.data.message || "Operación realizada.",
        });
        this.fetchData();
      });
    },

    aplicar(id) {
      const data = {
        nombreUsuario: { nombreUsuario: this.$store.state.username },
        idSolicitudEmpleo: { idSolicitudEmpleo: id },
      };
      // eslint-disable-next-line no-undef
      axios.post("/aplicar/puesto", data).then((result) => {
        this.$store.commit("SHOW_NOTIFICATION", {
          text: result.data.message || "Operación realizada.",
        });
        this.fetchData();
      });
    },
  },
};
</script>
