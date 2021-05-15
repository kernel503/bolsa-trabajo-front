<template>
  <v-container>
    <v-layout align-center justify-center>
      <v-flex xs12 sm9 md9>
        <v-card class="mx-auto" v-if="informacionUsuario !== null">
          <v-img
            :src="informacionUsuario.curriculum.foto"
            height="200px"
            contain
          ></v-img>
          <v-card-title>
            {{ informacionUsuario.nombre }}
            {{ informacionUsuario.apellido }}
          </v-card-title>
          <v-card-subtitle>
            {{ $route.params.username }}
            <div>
              {{ informacionUsuario.genero }}
            </div>
          </v-card-subtitle>
          <v-card-text>
            <div>Contacto: {{ informacionUsuario.contacto.numero }}</div>
            <div>Correo: {{ informacionUsuario.contacto.correo }}</div>
            <div>
              Departamento: {{ informacionUsuario.departamento.nombre }}
            </div>
            <div>
              Fecha nacimiento: {{ informacionUsuario.fechaNacimiento }}
            </div>

            <div>
              <v-btn
                :href="informacionUsuario.curriculum.fb"
                target="_blank"
                text
                color="primary"
              >
                <v-icon>mdi-facebook</v-icon>
              </v-btn>
              <v-btn
                :href="informacionUsuario.curriculum.twitter"
                target="_blank"
                text
                color="primary"
              >
                <v-icon>mdi-twitter</v-icon>
              </v-btn>
              <v-btn
                @click="sendEmail(informacionUsuario.contacto.correo)"
                text
                color="green darken-4"
              >
                <v-icon>mdi-email-send</v-icon>
              </v-btn>
            </div>
          </v-card-text>
          <v-divider class="mx-4"></v-divider>

          <template
            v-if="
              $store.state.isEmpresa ||
              $store.state.username === informacionUsuario.nombreUsuario
            "
          >
            <v-card-title>Información Personal</v-card-title>
            <v-card-text>
              <div>DUI: {{ informacionUsuario.curriculum.dui }}</div>
              <div>NIT: {{ informacionUsuario.curriculum.nit }}</div>
              <div>NUP: {{ informacionUsuario.curriculum.nup }}</div>
              <div>
                Pasaporte: {{ informacionUsuario.curriculum.pasaporte }}
              </div>
            </v-card-text>

            <template v-if="informacionUsuario.curriculum.referencias.length">
              <v-card-title>Referencias</v-card-title>
              <v-card-text>
                <v-list two-line subheader>
                  <template
                    v-for="item in informacionUsuario.curriculum.referencias"
                  >
                    <v-list-item :key="item.idReferencia">
                      <v-list-item-content>
                        <v-list-item-title>
                          {{ item.tipo }} - {{ item.nombrePersona }}
                        </v-list-item-title>
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
          </template>

          <template
            v-if="informacionUsuario.curriculum.conocimientosAcademicos.length"
          >
            <v-card-title class="py-0">Conocimiento</v-card-title>
            <v-card-text class="py-0">
              <v-list two-line subheader>
                <template
                  v-for="item in informacionUsuario.curriculum
                    .conocimientosAcademicos"
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

          <template v-if="informacionUsuario.curriculum.certificados.length">
            <v-card-title class="py-0">Certificados</v-card-title>
            <v-card-text class="py-0">
              <v-list two-line subheader>
                <template
                  v-for="item in informacionUsuario.curriculum.certificados"
                >
                  <v-list-item :key="item.idCertificado">
                    <v-list-item-content>
                      <v-list-item-title
                        >{{ item.codigo }} - {{ item.nombreCertificado }}
                      </v-list-item-title>
                      <v-list-item-subtitle>
                        {{ item.fechaObtenido }} - {{ item.fechaExpiracion }}
                      </v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </template>
              </v-list>
            </v-card-text>
          </template>

          <template
            v-if="informacionUsuario.curriculum.experienciaLaboral.length"
          >
            <v-card-title class="py-0">Experiencia Laboral</v-card-title>
            <v-card-text class="py-0">
              <v-list two-line subheader>
                <template
                  v-for="item in informacionUsuario.curriculum
                    .experienciaLaboral"
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

          <template
            v-if="informacionUsuario.curriculum.publicacionesLiterarias.length"
          >
            <v-card-title class="py-0"> Publicaciones Literarias</v-card-title>
            <v-card-text class="py-0">
              <v-list two-line subheader>
                <template
                  v-for="item in informacionUsuario.curriculum
                    .publicacionesLiterarias"
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

          <template v-if="informacionUsuario.curriculum.idiomas.length">
            <v-card-title class="py-0">Idiomas</v-card-title>
            <v-card-text class="py-0">
              <v-list two-line subheader>
                <template v-for="item in informacionUsuario.curriculum.idiomas">
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

          <template v-if="informacionUsuario.curriculum.habilidades.length">
            <v-card-title class="py-0">Habilidades</v-card-title>
            <v-card-text class="py-0">
              <v-list two-line subheader>
                <template
                  v-for="item in informacionUsuario.curriculum.habilidades"
                >
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

          <template v-if="informacionUsuario.curriculum.logros.length">
            <v-card-title class="py-0">Logros</v-card-title>
            <v-card-text class="py-0">
              <v-list two-line subheader>
                <template v-for="item in informacionUsuario.curriculum.logros">
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
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: "InformacionContacto",

  data() {
    return {
      informacionUsuario: null,
    };
  },

  created() {
    this.obtenerInformacionUsuario();
  },

  methods: {
    obtenerInformacionUsuario() {
      // eslint-disable-next-line no-undef
      axios
        .get("/aspirante/" + this.$route.params.username)
        .then(
          (result) => (this.informacionUsuario = result?.data?.data || null)
        );
    },

    sendEmail(email) {
      window.open(`mailto:${email}?subject=Sitio Aldebaran&body=Hi!`);
    },
  },
};
</script>
