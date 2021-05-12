<template>
  <v-data-table :headers="headers" :items="listado" class="elevation-1">
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Rubro</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
              Agregar
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="12" md="12">
                    <v-text-field
                      v-model.trim="editedItem.nombre"
                      label="Nombre"
                      @keydown.enter="save"
                      autofocus
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">
                Cancelar
              </v-btn>
              <v-btn
                color="blue darken-1"
                text
                @click="save"
                :disabled="!editedItem.nombre"
              >
                Guardar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="headline">
              ¿Desea eliminar este registro?
            </v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">
                Cancelar
              </v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">
                OK
              </v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon class="mr-2" @click="editItem(item)" color="indigo">
        mdi-pencil
      </v-icon>
      <v-icon @click="deleteItem(item)" color="red" class="mx-3">
        mdi-delete
      </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="fetchDataTable"> Actualizar </v-btn>
    </template>
  </v-data-table>
</template>
<script>
export default {
  name: "Rubro",

  data: () => ({
    urlBase: "/rubro/",
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        text: "Nombre",
        align: "start",
        sortable: true,
        value: "nombre",
      },
      { text: "Acciones", value: "actions", align: "end", sortable: false },
    ],
    listado: [],
    editedIndex: -1,
    editedItem: {
      nombre: "",
    },
    defaultItem: {
      nombre: "",
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Agregar" : "Editar";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  created() {
    this.fetchDataTable();
  },

  methods: {
    fetchDataTable() {
      // eslint-disable-next-line no-undef
      axios.get(this.urlBase).then((response) => {
        if (response.data.statusCode === 200) {
          this.listado = response?.data?.data || [];
        }
      });
    },

    editItem(item) {
      this.editedIndex = this.listado.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.listado.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      // eslint-disable-next-line no-undef
      axios
        .delete(this.urlBase + this.editedItem.idRubro)
        .then((response) => {
          if (response.data.statusCode === 200) {
            this.$store.commit("SHOW_NOTIFICATION", {
              text: "Elemento eliminado.",
            });
            this.fetchDataTable();
          }
        })
        .catch(() => {
          this.$store.commit("SHOW_NOTIFICATION", {
            text: "No se puede eliminar este registro FK.",
            color: "red",
          });
        });
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (!this.editedItem.nombre) {
        this.$store.commit("SHOW_NOTIFICATION", {
          text: "Debe completar el formulario",
          color: "red",
        });
        return;
      }

      // eslint-disable-next-line no-undef
      axios
        .post(this.urlBase, this.editedItem)
        .then((response) => {
          if (response.data.statusCode === 200) {
            this.$store.commit("SHOW_NOTIFICATION", {
              text: "Operación satisfactoria.",
            });
            this.fetchDataTable();
          }
        })
        .catch(() => {
          this.$store.commit("SHOW_NOTIFICATION", {
            text: "Error al agregar el elemento.",
            color: "red",
          });
        })
        .then(() => {
          this.close();
        });
    },
  },
};
</script>
