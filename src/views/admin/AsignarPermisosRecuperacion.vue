<template>
  <v-container>
    <v-tabs fixed-tabs background-color="basil" v-model="tab">
      <v-tab> Empresas </v-tab>
      <v-tab> Aspirantes </v-tab>
      <v-tab> Administradores </v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-tab-item>
        <v-autocomplete
          class="mt-3"
          label="Seleccionar rol"
          :items="permisosEmpresa"
          v-model="idRol"
          item-text="descripcionGrupo"
          item-value="idPermiso"
        ></v-autocomplete>
        <v-btn depressed color="primary" @click="updatePermissions">
          Aplicar
        </v-btn>
        <v-list subheader two-line flat>
          <v-list-item-group v-model="selectedUsers" multiple>
            <template v-for="item in listadoEmpresa">
              <v-list-item :key="item.nombre_usuario">
                <template v-slot:default="{ active }">
                  <v-list-item-action>
                    <v-checkbox
                      :input-value="active"
                      color="primary"
                    ></v-checkbox>
                  </v-list-item-action>
                  <v-list-item-content>
                    <v-list-item-title v-text="item.nombre_usuario">
                    </v-list-item-title>
                    <v-list-item-content>
                      {{ JSON.parse(item.grupo_ruta).join(", ") }}
                    </v-list-item-content>
                    <v-list-item-subtitle
                      v-text="item.descripcion_ruta"
                    ></v-list-item-subtitle>
                    <v-list-item-subtitle
                      v-if="item.bloqueado"
                      class="red--text"
                    >
                      Usuario Bloqueado
                    </v-list-item-subtitle>
                  </v-list-item-content>
                  <v-list-item-icon
                    @click="changePassword(item.nombre_usuario, item.correo)"
                  >
                    <v-icon color="red">mdi-form-textbox-password</v-icon>
                  </v-list-item-icon>
                  <v-list-item-icon @click="sendEmailToUser(item.correo)">
                    <v-icon>mdi-message-text</v-icon>
                  </v-list-item-icon>
                </template>
              </v-list-item>
            </template>
          </v-list-item-group>
        </v-list>
      </v-tab-item>

      <v-tab-item>
        <v-autocomplete
          class="mt-3"
          label="Seleccionar rol"
          :items="permisosAspirante"
          v-model="idRol"
          item-text="descripcionGrupo"
          item-value="idPermiso"
        ></v-autocomplete>
        <v-btn depressed color="primary" @click="updatePermissions">
          Aplicar
        </v-btn>
        <v-list subheader two-line flat>
          <v-list-item-group v-model="selectedUsers" multiple>
            <template v-for="item in listadoAspirante">
              <v-list-item :key="item.nombre_usuario">
                <template v-slot:default="{ active }">
                  <v-list-item-action>
                    <v-checkbox
                      :input-value="active"
                      color="primary"
                    ></v-checkbox>
                  </v-list-item-action>
                  <v-list-item-content>
                    <v-list-item-title v-text="item.nombre_usuario">
                    </v-list-item-title>
                    <v-list-item-content>
                      {{ JSON.parse(item.grupo_ruta).join(", ") }}
                    </v-list-item-content>
                    <v-list-item-subtitle
                      v-text="item.descripcion_ruta"
                    ></v-list-item-subtitle>
                    <v-list-item-subtitle
                      v-if="item.bloqueado"
                      class="red--text"
                    >
                      Usuario Bloqueado
                    </v-list-item-subtitle>
                  </v-list-item-content>
                  <v-list-item-icon
                    @click="changePassword(item.nombre_usuario, item.correo)"
                  >
                    <v-icon color="red">mdi-form-textbox-password</v-icon>
                  </v-list-item-icon>
                  <v-list-item-icon @click="sendEmailToUser(item.correo)">
                    <v-icon>mdi-message-text</v-icon>
                  </v-list-item-icon>
                </template>
              </v-list-item>
            </template>
          </v-list-item-group>
        </v-list>
      </v-tab-item>

      <v-tab-item>
        <v-autocomplete
          class="mt-3"
          label="Seleccionar rol"
          :items="permisosAdministrador"
          v-model="idRol"
          item-text="descripcionGrupo"
          item-value="idPermiso"
        ></v-autocomplete>
        <v-btn depressed color="primary" @click="updatePermissions">
          Aplicar
        </v-btn>
        <v-list subheader two-line flat>
          <v-list-item-group v-model="selectedUsers" multiple>
            <template v-for="item in listadoAdministrador">
              <v-list-item :key="item.nombre_usuario">
                <template v-slot:default="{ active }">
                  <v-list-item-action>
                    <v-checkbox
                      :input-value="active"
                      color="primary"
                    ></v-checkbox>
                  </v-list-item-action>

                  <v-list-item-content>
                    <v-list-item-title v-text="item.nombre_usuario">
                    </v-list-item-title>
                    <v-list-item-content>
                      {{ JSON.parse(item.grupo_ruta).join(", ") }}
                    </v-list-item-content>
                    <v-list-item-subtitle
                      v-text="item.descripcion_ruta"
                    ></v-list-item-subtitle>
                    <v-list-item-subtitle
                      v-if="item.bloqueado"
                      class="red--text"
                    >
                      Usuario Bloqueado
                    </v-list-item-subtitle>
                  </v-list-item-content>
                  <v-list-item-icon
                    @click="changePassword(item.nombre_usuario, item.correo)"
                  >
                    <v-icon color="red">mdi-form-textbox-password</v-icon>
                  </v-list-item-icon>
                  <v-list-item-icon @click="sendEmailToUser(item.correo)">
                    <v-icon>mdi-message-text</v-icon>
                  </v-list-item-icon>
                </template>
              </v-list-item>
            </template>
          </v-list-item-group>
        </v-list>
      </v-tab-item>
    </v-tabs-items>
  </v-container>
</template>
<script>
export default {
  name: "AsignarRol",

  data: () => ({
    urlBase: "/usuarios/",
    urlPermiso: "/permiso/",
    tab: null,
    idRol: null,
    userList: [],
    permissionsList: [],
    selectedUsers: [],
  }),

  created() {
    this.fetchUsersList();
    this.fecthPermissionsList();
  },

  watch: {
    tab() {
      this.selectedUsers = [];
      this.idRol = null;
    },
  },

  computed: {
    listadoEmpresa() {
      return this.userList.filter(
        (current) => current.nombre_rol === "Empresa"
      );
    },

    listadoAspirante() {
      return this.userList.filter(
        (current) => current.nombre_rol === "Aspirante"
      );
    },

    listadoAdministrador() {
      return this.userList.filter(
        (current) => current.nombre_rol === "Administrador"
      );
    },

    permisosAdministrador() {
      return this.permissionsList.filter(
        (current) => current.nombreRol === "Administrador"
      );
    },

    permisosAspirante() {
      return this.permissionsList.filter(
        (current) => current.nombreRol === "Aspirante"
      );
    },

    permisosEmpresa() {
      return this.permissionsList.filter(
        (current) => current.nombreRol === "Empresa"
      );
    },
  },

  methods: {
    fecthPermissionsList() {
      // eslint-disable-next-line no-undef
      axios.get(this.urlPermiso).then((response) => {
        if (response.data.statusCode === 200) {
          this.permissionsList = response?.data?.data || [];
        }
      });
    },

    fetchUsersList() {
      // eslint-disable-next-line no-undef
      axios.get(this.urlBase).then((response) => {
        if (response.data.statusCode === 200) {
          this.userList = response?.data?.data || [];
        }
      });
    },

    updateAndResetFormData() {
      this.fetchUsersList();
      this.selectedUsers = [];
      this.idRol = null;
    },

    updatePermissions() {
      if (!this.selectedUsers.length) {
        this.$store.commit("SHOW_NOTIFICATION", {
          text: "Debe seleccionar al menos un usuario.",
          color: "red",
        });
        return;
      }

      if (this.idRol === null) {
        this.$store.commit("SHOW_NOTIFICATION", {
          text: "Debe seleccionar el rol.",
          color: "red",
        });
        return;
      }

      const users = this.selectedUsers.map((current) => {
        if (this.tab === 0) {
          return this.listadoEmpresa[current].nombre_usuario;
        }
        if (this.tab === 1) {
          return this.listadoAspirante[current].nombre_usuario;
        }
        if (this.tab === 2) {
          return this.listadoAdministrador[current].nombre_usuario;
        }
      });

      Promise.all(this.promiseUsers(users, this.idRol))
        .then(() => {
          this.$store.commit("SHOW_NOTIFICATION", {
            text: "Permisos modificados.",
          });
          this.updateAndResetFormData();
        })
        .catch(() =>
          this.$store.commit("SHOW_NOTIFICATION", {
            text: "Error al actualizar los permisos.",
            color: "red",
          })
        );
    },

    promiseUsers(list, id) {
      return list.map((current) =>
        // eslint-disable-next-line no-undef
        axios.post(`/usuario/rol/${current}/${id}`)
      );
    },

    sendEmailToUser(user) {
      setTimeout(() => {
        this.selectedUsers = [];
      });
      window.open(`mailto:${user}?subject=Administración aldebaran&body=Hi!`);
    },

    changePassword(userName, email) {
      setTimeout(() => {
        this.selectedUsers = [];
      });
      const password = prompt(
        "Modificar la contraseña al usuario: " + userName
      );
      if (!password) {
        this.$store.commit("SHOW_NOTIFICATION", {
          text: "Acción cancelada.",
        });
        return;
      }

      // eslint-disable-next-line no-undef
      axios
        .post("/usuario/editar/password", null, {
          params: { usuario: userName, clave: password },
        })
        .then((result) => {
          this.$store.commit("SHOW_NOTIFICATION", {
            text: result.data.message || "Operación realizada.",
          });
          this.updateAndResetFormData();
          window.open(
            `mailto:${email}?subject=Contraseña Modificada: ${userName}&body=Nueva Contraseña: ${password}`
          );
        });
    },
  },
};
</script>
<style>
/* Helper classes */
.basil {
  background-color: #fffbe6 !important;
}
.basil--text {
  color: #356859 !important;
}
</style>
