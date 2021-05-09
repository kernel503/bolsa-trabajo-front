<template>
  <v-container>
    <v-layout align-center justify-center>
      <v-flex xs12 sm12 md12>
        <p class="text-h6 mb-2">Curriculum</p>
        <v-divider></v-divider>
        <v-form ref="form" v-model="valid" lazy-validation class="mt-2">
          <v-row>
            <v-col md="6">
              <v-avatar
                class="profile"
                color="indigo lighten-4"
                size="164"
                tile
              >
                <v-img :src="formData.foto"></v-img>
              </v-avatar>
              <v-text-field
                class="mt-5"
                v-model="formData.foto"
                label="Foto Perfil"
                required
                :rules="urlRules"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field
                v-model="formData.dui"
                label="Dui"
                required
                :rules="fieldRules"
              ></v-text-field
            ></v-col>
            <v-col>
              <v-text-field
                v-model="formData.nit"
                label="Nit"
                required
                :rules="fieldRules"
              ></v-text-field
            ></v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field
                v-model="formData.nup"
                label="Nup"
                required
                :rules="fieldRules"
              ></v-text-field
            ></v-col>
            <v-col>
              <v-text-field
                v-model="formData.pasaporte"
                label="Pasaporte"
                required
                :rules="fieldRules"
              ></v-text-field
            ></v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field
                v-model="formData.fb"
                label="Facebook"
                required
                prepend-inner-icon="mdi-facebook"
                :rules="urlRules"
              ></v-text-field
            ></v-col>
            <v-col>
              <v-text-field
                v-model="formData.twitter"
                label="Twitter"
                prepend-inner-icon="mdi-twitter"
                required
                :rules="urlRules"
              ></v-text-field
            ></v-col>
          </v-row>
          <v-btn color="blue-grey darken-1" @click="cleanUserForm" dark
            >Cancelar</v-btn
          >
          <v-btn
            class="mx-3"
            color="primary"
            :disabled="!valid"
            @click="updateUserInformation"
            >Actualizar</v-btn
          >
        </v-form>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
export default {
  name: "Curriculum",

  mounted() {
    this.fetchUserInformation();
  },

  data() {
    return {
      regexp: new RegExp(
        "^(https?:\\/\\/)?" + // protocol
          "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
          "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
          "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
          "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
          "(\\#[-a-z\\d_]*)?$",
        "i"
      ), // fragment locator,
      fieldRules: [(v) => !!v || "Campo requerido"],
      urlRules: [
        (v) => !!v || "Campo requerido",
        (v) => this.regexp.test(v) || "Debe ser una URL valida.",
      ],
      formData: {
        idCv: this.$store.state.idCv,
        dui: "",
        nit: "",
        nup: "",
        pasaporte: "",
        fb: "",
        twitter: "",
        foto: "",
      },
      valid: true,
    };
  },

  methods: {
    fetchUserInformation() {
      // eslint-disable-next-line no-undef
      axios.get("/aspirante/" + this.$store.state.username).then((response) => {
        const {
          dui,
          nit,
          nup,
          pasaporte,
          fb,
          twitter,
          foto,
        } = response.data.data.curriculum;
        this.formData = {
          idCv: this.$store.state.idCv,
          dui,
          nit,
          nup,
          pasaporte,
          fb,
          twitter,
          foto:
            foto ||
            "https://avatars.dicebear.com/api/human/" +
              Date.now().toString(28) +
              ".svg",
        };
      });
    },

    cleanUserForm() {
      this.$refs.form.resetValidation();
      this.fetchUserInformation();
    },

    updateUserInformation() {
      if (!this.$refs.form.validate()) {
        this.$store.commit("SHOW_NOTIFICATION", {
          text: "Debe completar el formulario.",
          color: "red",
        });
        return;
      }
      // eslint-disable-next-line no-undef
      axios.post("/curriculum", this.formData).then((response) => {
        if (response.data.statusCode === 200) {
          this.$store.commit("SHOW_NOTIFICATION", {
            text: "Información actualizada.",
          });
          this.fetchUserInformation();
        }
      });
    },
  },
};
</script>
