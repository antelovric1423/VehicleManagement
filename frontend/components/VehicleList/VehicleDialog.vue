<template>
  <v-dialog v-model="showDialog" max-width="500px">
    <template #activator="{ on, attrs }">
      <v-btn color="primary" dark v-bind="attrs" v-on="on">
        Add vehicle
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="text-h5">Add new vehicle</span>
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
        <v-btn color="blue darken-1" text @click="close">
          Cancel
        </v-btn>
        <v-btn color="blue darken-1" text @click="add">
          Add
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
const initItem = () => ({ make: "", model: "", year: null });
export default {
  name: 'vehicle-dialog',
  data: () => ({
    showDialog: false,
    editedItem: initItem()
  }),
  methods: {
    close() {
      this.showDialog = false;
      this.editedItem = initItem();
    },
    add() {

      console.log("add")
      this.$emit("createVehicle", this.editedItem);
      this.editedItem = initItem();
      this.close();
    }
  }
}
</script>
