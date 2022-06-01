<template>
  <v-container>
    <v-card>
      <v-card-title>
        <v-spacer></v-spacer>
        <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details></v-text-field>
        <v-spacer></v-spacer>

        <v-dialog v-model="dialogAdd" max-width="500px">
          <template v-slot:activator="{ on, attrs }">
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
                    <v-text-field v-model="editedItem.make" label="Make" single-line required></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.model" label="Model" single-line required></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.year" label="Year" single-line required type="number">
                    </v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">
                Cancel
              </v-btn>
              <v-btn color="blue darken-1" text @click="addItem">
                Add
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-card-title>

      <v-data-table dense :headers="headers" :items="this.vehicles" item-key="id" class="elevation-1"
        :loading="this.isLoading" loading-text="Loading... Please wait" :search="search">

        <template v-slot:item.actions="{ item }">
          <v-icon medium @click="deleteItem(item)">mdi-delete</v-icon>
        </template>

      </v-data-table>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: 'VehiclesList',

  data: () => ({
    headers: [{ text: 'Make', value: "make" },
    { text: 'Model', value: "model" },
    { text: 'Year', value: "year" },
    { text: 'Actions', value: 'actions', sortable: false },
    ],
    dialogAdd: false,
    dialogDelete: false,
    search: "",
    editedItem: { make: "", model: "", year: null }
  }),
  props: ["vehicles"],
  computed: {
    isLoading() {
      return this.vehicles.length == 0
    },
  },
  methods: {
    defaultItem() {
      return { make: "", model: "", year: null }
    },
    close() {
      this.dialogAdd = false
      this.dialogDelete = false
      this.editedItem = this.defaultItem()
    },
    addItem() {
      const newItem = {
        make: this.editedItem.make,
        model: this.editedItem.model,
        year: this.editedItem.year
      }
      this.$emit("createVehicle", newItem)
      this.editedItem = this.defaultItem()
      this.close()
    },
    deleteItem(item) {
      console.log("emit delete: " + item.id)
      this.$emit("deleteVehicle", item.id)
    }
  }
}
</script>

<style scoped>
</style>
