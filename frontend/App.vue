<template>
  <v-app>
    <v-app-bar app color="primary d-flex justify-center" dark>
      <span class="text-lg-h5">Vehicle Management</span>
    </v-app-bar>
    <v-main>
      <vehicle-list @notification="this.createNotification" />
    </v-main>

    <v-snackbar v-model="snackbarShow">
      {{ this.snackbarText }}
    </v-snackbar>
  </v-app>
</template>

<script>
import VehicleList from '@/components/VehicleList';
export default {
  name: 'app',
  data: function () {
    return {
      snackbarShow: false,
      snackbarText: null
    }
  },
  methods: {
    createNotification(message) {
      this.snackbarText = message;
      this.snackbarShow = true;
    }
  },
  components: {
    VehicleList
  }
};
</script>
