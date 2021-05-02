<template>
  <v-autocomplete
    v-model="select"
    :items="listado"
    :label="label"
    :item-text="[text]"
    :item-value="[idvalue]"
    :rules="[(v) => !!v || 'El campo es requerido.']"
    @input="$emit('input', select)"
  ></v-autocomplete>
</template>

<script>
export default {
  name: "AutoCompleteApi",
  props: {
    path: {
      type: String,
      default: "",
      required: true,
    },
    label: {
      type: String,
      default: "",
    },
    text: {
      type: String,
      default: "",
      required: true,
    },
    idvalue: {
      type: String,
      default: "",
      required: true,
    },
    value: {
      default: "",
    },
  },
  created() {
    // eslint-disable-next-line no-undef
    axios
      .get(this.path)
      .then((result) => (this.listado = result.data.data || []));
  },
  data() {
    return {
      select: "",
      listado: [],
    };
  },
};
</script>
