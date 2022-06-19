<template>
  <v-container>
    <v-card>
      <v-card-title>
        <v-spacer></v-spacer>
        <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details></v-text-field>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="openAddDialog" dark>
          Add vehicle
        </v-btn>
        <vehicle-dialog :show="showVehicleDialog" :item="selectedItem" @confirm="confirmVehicleDialog"
          @cancel="closeDialogs" />
      </v-card-title>

      <confirmation-dialog :title="confirmDeleteDialog" :show="showDeleteDialog" @cancel="closeDialogs"
        @confirm="confirmDelete" />
      <v-data-table :headers="headers" :items="vehicles" :search="search" :loading="isLoading"
        loading-text="Loading... Please wait" item-key="id" class="elevation-1" dense>
        <template v-slot:item.actions="{ item }">
          <v-icon medium @click="openEditDialog(item)">mdi-pencil</v-icon>
          <v-icon medium @click="openDeleteDialog(item)">mdi-delete</v-icon>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script>
import ConfirmationDialog from './ConfirmationDialog';
import VehicleDialog from './VehicleDialog';
import api from '@/api/vehicles'

const headers = () => [
  { text: 'Make', value: "make" },
  { text: 'Model', value: "model" },
  { text: 'Year', value: "year" },
  { text: 'Actions', value: 'actions', sortable: false },
];
const confirmDeleteDialog = () => "Are you sure you want to delete this item ?";

export default {
  name: 'vehicle-list',
  components: {
    VehicleDialog,
    ConfirmationDialog
  },
  data: () => ({
    showVehicleDialog: false,
    showDeleteDialog: false,
    search: "",
    selectedItem: null,
    vehicles: [],
    isLoading: true
  }),
  computed: {
    headers,
    confirmDeleteDialog
  },
  methods: {
    closeDialogs() {
      this.showDeleteDialog = false;
      this.showVehicleDialog = false;
      this.selectedItem = null;
    },
    openAddDialog() {
      this.showVehicleDialog = true;
    },
    openEditDialog(item) {
      this.selectedItem = item;
      this.showVehicleDialog = true;
    },
    openDeleteDialog(item) {
      this.selectedItem = item;
      this.showDeleteDialog = true;
    },
    confirmDelete() {
      this.remove(this.selectedItem.id);
      this.closeDialogs();
    },
    confirmVehicleDialog(vehicle) {
      if (this.selectedItem === null)
        this.create(vehicle);
      else
        this.edit(vehicle);
      this.closeDialogs();
    },
    fetchVehicles() {
      api.fetch()
        .then(response => {
          this.vehicles = response.data;
          this.isLoading = false;
        })
        .catch(err => this.notify('Could not fetch vehicles due to error: ' + err.response.data));
    },
    remove(id) {
      api.remove(id)
        .then(json => {
          if (json.status === 200) {
            this.vehicles = this.vehicles.filter(vehicle => vehicle.id !== id);
            this.notify('Vehicle succesfully deleted!');
          } else {
            this.notify('An issue occurred while deleting vehicle');
          }
        })
        .catch(err => this.notify(err.response.data));
    },
    create(vehicle) {
      api.post(vehicle)
        .then(json => {
          this.notify('Vehicle succesfully created!');
          this.vehicles.push(json.data);
        })
        .catch(err => this.notify(err.response.data));
    },
    edit(vehicle) {
      api.put(vehicle)
        .then(json => {
          this.notify('Vehicle succesfully edited!');
          const index = this.vehicles.findIndex((it) => it.id === json.data.id);
          // The following forces data table to update, whereas editing item in array does not
          this.vehicles = this.vehicles.filter(vehicle => vehicle.id !== json.data.id);
          this.vehicles.push(json.data);
        })
        .catch(err => this.notify(err.response.data));
    },
    notify(message) {
      this.$emit('notification', message);
    }
  },
  created() {
    this.fetchVehicles();
  },
}
</script>
