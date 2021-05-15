<template>
  <v-container fluid>
    <v-row class="my-0">
      <v-col cols="12" sm="6">
        <AutoCompleteApi
          path="/departamento"
          label="Seleccionar el departamento."
          text="nombre"
          idvalue="nombre"
          v-model="filtroDepartamento"
          multiple
        />
      </v-col>
      <v-col cols="12" sm="6">
        <AutoCompleteApi
          path="/categoria/habilidad"
          label="Seleccionar la habilidad."
          text="informacion"
          idvalue="informacion"
          v-model="filtroHabilidades"
        />
      </v-col>
    </v-row>
    <v-row dense>
      <template v-for="user in filteredUserList">
        <v-col cols="3" :key="user.nombreUsuario">
          <v-card>
            <v-img :src="user.curriculum.foto" height="200px" contain></v-img>

            <v-card-title>
              {{ user.nombre }}
              {{ user.apellido }}</v-card-title
            >

            <v-card-subtitle>
              {{ user.genero }} - {{ user.fechaNacimiento }}
            </v-card-subtitle>

            <v-card-actions>
              <v-btn
                color="indigo lighten-2"
                text
                :to="{
                  name: 'usuarioinformacion',
                  params: { username: user.nombreUsuario },
                }"
              >
                <v-icon>mdi-eye</v-icon>
              </v-btn>

              <v-spacer></v-spacer>

              <v-btn icon @click="user.show = !user.show">
                <v-icon>{{
                  user.show ? "mdi-chevron-up" : "mdi-chevron-down"
                }}</v-icon>
              </v-btn>
            </v-card-actions>

            <v-expand-transition>
              <div v-show="user.show">
                <v-divider></v-divider>
                <v-card-text>
                  <div>{{ user.contacto.correo }}</div>
                  <div>{{ user.contacto.numero }}</div>
                  <div>{{ user.departamento.nombre }}</div>

                  <div>
                    <v-btn
                      :href="user.curriculum.fb"
                      target="_blank"
                      text
                      color="primary"
                    >
                      <v-icon>mdi-facebook</v-icon>
                    </v-btn>
                    <v-btn
                      :href="user.curriculum.twitter"
                      target="_blank"
                      text
                      color="primary"
                    >
                      <v-icon>mdi-twitter</v-icon>
                    </v-btn>
                    <v-btn
                      @click="sendEmail(user.contacto.correo)"
                      text
                      color="green darken-4"
                    >
                      <v-icon>mdi-email-send</v-icon>
                    </v-btn>
                  </div>
                </v-card-text>

                <template v-if="user.curriculum.conocimientosAcademicos.length">
                  <v-card-title class="my-0 py-0">Conocimiento</v-card-title>
                  <v-card-text class="my-0 py-0">
                    <v-list two-line subheader>
                      <template
                        v-for="item in user.curriculum.conocimientosAcademicos"
                      >
                        <v-list-item :key="item.idConocimiento">
                          <v-list-item-avatar>
                            <v-img :src="item.pais.banderaUrl"></v-img>
                          </v-list-item-avatar>

                          <v-list-item-content>
                            <v-list-item-title>
                              {{ item.nombreInstitucion }}
                            </v-list-item-title>
                            <v-list-item-title>
                              {{ item.tipoConocimiento.nombreConocimiento }}
                            </v-list-item-title>
                            <v-list-item-subtitle>
                              {{ item.fechaInicio }} hasta {{ item.fechaFin }}
                            </v-list-item-subtitle>
                          </v-list-item-content>
                        </v-list-item>
                      </template>
                    </v-list>
                  </v-card-text>
                </template>

                <template v-if="user.curriculum.certificados.length">
                  <v-card-title class="my-0 py-0">Certificados</v-card-title>
                  <v-card-text class="my-0 py-0">
                    <v-list two-line subheader>
                      <template v-for="item in user.curriculum.certificados">
                        <v-list-item :key="item.idCertificado">
                          <v-list-item-content>
                            <v-list-item-title
                              >{{ item.codigo }} - {{ item.nombreCertificado }}
                            </v-list-item-title>
                            <v-list-item-subtitle>
                              {{ item.fechaObtenido }} -
                              {{ item.fechaExpiracion }}
                            </v-list-item-subtitle>
                          </v-list-item-content>
                        </v-list-item>
                      </template>
                    </v-list>
                  </v-card-text>
                </template>

                <template v-if="user.curriculum.experienciaLaboral.length">
                  <v-card-title class="my-0 py-0"
                    >Experiencia Laboral</v-card-title
                  >
                  <v-card-text class="my-0 py-0">
                    <v-list two-line subheader>
                      <template
                        v-for="item in user.curriculum.experienciaLaboral"
                      >
                        <v-list-item :key="item.idExperienciaLaboral">
                          <v-list-item-content>
                            <v-list-item-title>
                              {{ item.nombreOrg }} - {{ item.cargo }}
                            </v-list-item-title>
                            <v-list-item-subtitle>
                              {{ item.fechaInicio }} hasta {{ item.fechaFin }}
                            </v-list-item-subtitle>
                            <v-list-item-subtitle>
                              {{ item.contacto.correo }}
                            </v-list-item-subtitle>
                            <v-list-item-subtitle>
                              {{ item.contacto.numero }}
                            </v-list-item-subtitle>
                          </v-list-item-content>
                        </v-list-item>
                      </template>
                    </v-list>
                  </v-card-text>
                </template>

                <template v-if="user.curriculum.publicacionesLiterarias.length">
                  <v-card-title class="my-0 py-0">
                    Publicaciones Literarias</v-card-title
                  >
                  <v-card-text class="my-0 py-0">
                    <v-list two-line subheader>
                      <template
                        v-for="item in user.curriculum.publicacionesLiterarias"
                      >
                        <v-list-item :key="item.idPublicacionLiteraria">
                          <v-list-item-content>
                            <v-list-item-title>
                              {{ item.nombre }}
                            </v-list-item-title>
                            <v-list-item-title>
                              {{ item.categoria }} : {{ item.fechaPublicacion }}
                            </v-list-item-title>
                            <v-list-item-subtitle>
                              Ciudad: {{ item.ciudad }}
                            </v-list-item-subtitle>
                            <v-list-item-subtitle>
                              Editorial: {{ item.editorial }}
                            </v-list-item-subtitle>
                            <v-list-item-subtitle v-if="item.isbn">
                              ISBN: {{ item.isbn }}
                            </v-list-item-subtitle>
                          </v-list-item-content>
                        </v-list-item>
                      </template>
                    </v-list>
                  </v-card-text>
                </template>

                <template v-if="user.curriculum.idiomas.length">
                  <v-card-title class="my-0 py-0">Idiomas</v-card-title>
                  <v-card-text class="my-0 py-0">
                    <v-list two-line subheader>
                      <template v-for="item in user.curriculum.idiomas">
                        <v-list-item :key="item.idDetalleIdioma">
                          <v-list-item-content>
                            <v-list-item-title>
                              {{ item.nivelDominio }} : {{ item.idioma }}
                            </v-list-item-title>
                            <v-list-item-subtitle>
                              {{ item.categoria }}
                            </v-list-item-subtitle>
                          </v-list-item-content>
                        </v-list-item>
                      </template>
                    </v-list>
                  </v-card-text>
                </template>

                <template v-if="user.curriculum.habilidades.length">
                  <v-card-title class="my-0 py-0">Habilidades</v-card-title>
                  <v-card-text class="my-0 py-0">
                    <v-list two-line subheader>
                      <template v-for="item in user.curriculum.habilidades">
                        <v-list-item :key="item.idHabilidadTecnica">
                          <v-list-item-content>
                            <v-list-item-title>{{
                              item.informacion
                            }}</v-list-item-title>
                            <v-list-item-subtitle>
                              {{ item.habilidad }}
                            </v-list-item-subtitle>
                          </v-list-item-content>
                        </v-list-item>
                      </template>
                    </v-list>
                  </v-card-text>
                </template>

                <template v-if="user.curriculum.logros.length">
                  <v-card-title class="my-0 py-0">Logros</v-card-title>
                  <v-card-text class="my-0 py-0">
                    <v-list two-line subheader>
                      <template v-for="item in user.curriculum.logros">
                        <v-list-item :key="item.idLogro">
                          <v-list-item-content>
                            <v-list-item-title>{{
                              item.informacion
                            }}</v-list-item-title>
                            <v-list-item-subtitle>
                              {{ item.fechaObtenido }}
                            </v-list-item-subtitle>
                          </v-list-item-content>
                        </v-list-item>
                      </template>
                    </v-list>
                  </v-card-text>
                </template>
              </div>
            </v-expand-transition>
          </v-card>
        </v-col>
      </template>
    </v-row>
  </v-container>
</template>
<script>
import AutoCompleteApi from "@/components/AutoCompleteApi.vue";

export default {
  name: "ListadoAspirante",

  components: {
    AutoCompleteApi,
  },

  data() {
    return {
      userList: [],
      filtroDepartamento: [],
      filtroHabilidades: [],
    };
  },

  created() {
    this.fetchUsers();
  },

  computed: {
    filteredUserList() {
      let list = this.userList;

      if (this.filtroDepartamento.length) {
        const listDepartamentos = this.filtroDepartamento.join(", ");
        list = list.filter((current) => {
          return listDepartamentos.includes(current.departamento.nombre);
        });
      }

      if (this.filtroHabilidades) {
        list = list.filter((current) => {
          const listHabilidades = current.curriculum.habilidades.reduce(
            (accum, current) => {
              return (accum += ", " + current.habilidad);
            },
            ""
          );
          return listHabilidades.includes(this.filtroHabilidades);
        });
      }

      return list;
    },
  },

  methods: {
    fetchUsers() {
      // eslint-disable-next-line no-undef
      axios.get("/aspirante/").then((result) => {
        this.userList = result?.data?.data || [];
        this.userList = this.userList.map((current) => {
          return { ...current, show: false };
        });
      });
    },

    sendEmail(email) {
      window.open(`mailto:${email}?subject=Sitio Aldebaran&body=Hi!`);
    },
  },
};
</script>
