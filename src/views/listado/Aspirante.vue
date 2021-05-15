<template>
  <v-container fluid>
    <v-row dense>
      <v-col cols="3">
        <v-card>
          <v-img
            src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
            height="250px"
          ></v-img>

          <v-card-title> Top western road trips </v-card-title>

          <v-card-subtitle> 1,000 miles of wonder </v-card-subtitle>

          <v-card-actions>
            <v-btn color="orange lighten-2">
              <v-icon>mdi-eye</v-icon>
            </v-btn>

            <v-spacer></v-spacer>

            <v-btn icon @click="show = !show">
              <v-icon>{{
                show ? "mdi-chevron-up" : "mdi-chevron-down"
              }}</v-icon>
            </v-btn>
          </v-card-actions>

          <v-expand-transition>
            <div v-show="show">
              <v-divider></v-divider>
              <v-card-text>
                I'm a thing. But, like most politicians, he promised more than
                he could deliver. You won't have time for sleeping, soldier, not
                with all the bed making you'll be doing. Then we'll go with that
                data file! Hey, you add a one and two zeros to that or we walk!
                You're going to do his laundry? I've got to find a way to
                escape.
              </v-card-text>
            </div>
          </v-expand-transition>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  name: "ListadoAspirante",

  data() {
    return {
      show: false,
      usersList: [],
    };
  },

  created() {},

  methods: {
    fetchUsers() {
      // eslint-disable-next-line no-undef
      axios
        .get("/solicitud/empleo/filtro", { params: this.formData })
        .then((result) => {
          this.usersList = result?.data?.data || [];
        });
    },
  },
};
</script>
