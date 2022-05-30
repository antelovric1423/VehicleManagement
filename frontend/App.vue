<template>
  <v-app>
    <v-app-bar app color="primary d-flex justify-center" dark>
      <span class="text-lg-h5">Vehicle Management</span>
    </v-app-bar>

    <v-main>
      <VehiclesList :vehicles="this.vehicles" />
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
    }
  }
};
</script>
