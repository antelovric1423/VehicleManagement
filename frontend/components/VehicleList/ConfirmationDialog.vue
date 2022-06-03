<template>
  <v-dialog :value="show" max-width="500px">
    <v-card>
      <v-card-title>{{ title }}</v-card-title>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="close">
          Cancel
        </v-btn>
        <v-btn color="blue darken-1" text @click="confirm">
          Confirm
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'confirmation-dialog',
  props: {
    show: { type: Boolean, required: true },
    title: { type: String }
  },
  methods: {
    close() {
      this.$emit("cancel");
    },
    confirm() {
      this.$emit("confirm");
    }
  }
}
</script>
