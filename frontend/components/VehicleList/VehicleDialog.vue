<template>
  <v-dialog v-model="showDialog" max-width="500px">
    <v-card>
      <v-card-title>
        <span class="text-h5">{{ title }}</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12" sm="6" md="4">
              <v-text-field v-model="editedItem.make" label="Make" single-line required />
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-text-field v-model="editedItem.model" label="Model" single-line required />
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-text-field v-model="editedItem.year" label="Year" single-line required type="number" />
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="this.$emit('cancel')">
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
const initItem = () => ({ make: "", model: "", year: null });
export default {
  name: 'vehicle-dialog',
  props: {
    show: { type: Boolean, required: true },
    item: { type: Object }
  },
  data: () => ({
    editedItem: initItem(),
    showDialog: false
  }),
  methods: {
    confirm() {
      this.$emit("confirm", this.editedItem);
      this.editedItem = initItem();
    }
  },
  watch: {
    show(newValue, oldValue) {
      if (newValue === true) {
        this.showDialog = true;
        if (this.item !== null) {
          this.editedItem = { ...this.item };
        }
      }
      else {
        this.showDialog = false;
        this.editedItem = initItem();
      }
    },
    showDialog(newValue, oldValue) {
      if (newValue === false)
        this.$emit('cancel')
    }
  },
  computed:
  {
    title() {
      return this.item === null ? "Add new item" : "Edit item"
    },
  }
}
</script>
