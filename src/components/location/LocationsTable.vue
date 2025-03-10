<template>
  <div>
    <ViewLocationModal :modal-is-open="modalIsOpen" :location="location" :is-delete="true" :location-id="locationId"
                       @event-close-modal="closeViewLocationModal"
                       @event-location-deleted="$emit('event-location-deleted')"
    />
    <table class="table">
      <thead>
      <tr>
        <th scope="col">Järjekorranumber</th>
        <th scope="col">Asukoha nimi</th>
        <th scope="col">Muuda või kustuta</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(location, index) in locations" :key="location.locationId">
        <td>{{ index + 1 }}</td>
        <td>{{ location.locationName }}</td>
        <td>
          <font-awesome-icon icon="pen-to-square" @click="navigateToLocationView(location.locationId)"
                             class="cursor-pointer me-3"/>
          <font-awesome-icon icon="trash" @click="getLocationAndOpenLocationModalWithDelete(location.locationId)"
                             class="cursor-pointer"/>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>

import NavigationService from "@/service/NavigationService";
import ViewLocationModal from "@/components/modal/ViewLocationModal.vue";
import locationService from "@/service/LocationService";

export default {
  name: 'LocationsTable',
  components: {ViewLocationModal},
  props: {
    locations: [{}]
  },

  data() {
    return {
      modalIsOpen: false,
      locationId: 0,
      location: {
        locationName: '',
        longitude: null,
        latitude: null,
        clue: '',
        imageData: '',
      }
    }
  },

  methods: {

    navigateToLocationView(locationId) {
      NavigationService.navigateToLocationView(locationId)
    },

    getLocationAndOpenLocationModalWithDelete(locationId) {
      this.locationId = locationId
      locationService.sendGetLocationRequest(this.locationId)
          .then(response => {
            this.handleGetLocationResponse(response);
          })
          .catch(() => NavigationService.navigateToErrorView())
    },

    handleGetLocationResponse(response) {
      this.location = response.data
      this.modalIsOpen = true
    },

    closeViewLocationModal() {
      this.modalIsOpen = false
    },

  }
}
</script>