<template>
  <v-app>
    <v-app-bar app color="primary d-flex justify-center" dark>
      <span class="text-lg-h5">Vehicle Management</span>
    </v-app-bar>

    <v-main>
      <VehiclesList :vehicles="this.vehicles" @createVehicle="createVehicle" @deleteVehicle="deleteVehicle" />
    </v-main>
  </v-app>
</template>

<script>
import VehiclesList from './components/VehiclesList.vue';
export default {
  name: 'App',

  components: {
    VehiclesList
  },

  data() {
    return {
      vehicles: []
    }
  },
  created() {
    this.fetchVehicles()
  },
  methods: {
    fetchVehicles() {
      fetch("http://localhost:3000/vehicles")
        .then(res => res.json())
        .then(data => this.vehicles = data)
        .catch(err => alert(err))
    },
    deleteVehicle(id) {
      fetch("http://localhost:3000/vehicles/" + id,
        { method: "DELETE" })
        .then((json) => {
          if (json.status === 200) {
            this.vehicles = this.vehicles.filter((vehicle) => vehicle.id !== id)
            alert("Vehicle succesfully deleted")
          } else
            alert("An issue occurred while deleting vehicle")
        })
        .catch(err => alert(err))
    },
    createVehicle(vehicle) {
      fetch("http://localhost:3000/vehicles/", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(vehicle)
      })
        .then(res => res.json())
        .then(json => {
          this.vehicles.push(json)
        })
        .catch(err => alert(err))
    }
  },

};
</script>
