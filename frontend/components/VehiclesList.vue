<template>
  <v-container>
    <v-card>
      <v-card-title>
        <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details></v-text-field>
      </v-card-title>
      <v-data-table dense :headers="headers" :items="this.vehicles" item-key="id" class="elevation-1"
        :loading="this.isLoading" loading-text="Loading... Please wait" :search="search">

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
    { text: 'Year', value: "year" }
    ],
    search: ""
  }),
  props: ["vehicles"],
  computed: {
    isLoading() {
      return this.vehicles.length == 0
    }
  }
}
</script>
