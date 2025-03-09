<template>
  <div>
    <ViewLocationModal :modal-is-open="modalIsOpen" :location="location" :is-delete="isDelete"
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
          <font-awesome-icon icon="trash" @click="openViewLocationModalWithDelete(location.locationId)"
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
    isAdmin: Boolean,
    locations: [{}],
  },

  data() {
    return {
      isDelete: false,
      modalIsOpen: false,
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

    closeViewLocationModal() {
      this.modalIsOpen = false
      this.isDelete = false
    },

    navigateToLocationView(locationId) {
      NavigationService.navigateToLocationView(locationId)
    },

    openViewLocationModalWithDelete(locationId) {
      this.isDelete = true
      this.openViewLocationModal(locationId)
    },

    openViewLocationModal(locationId) {
      locationService.sendGetLocationRequest(locationId)
          .then(response => this.location = response.data,
              this.modalIsOpen = true)
          .catch(() => NavigationService.navigateToErrorView())
    }
  }
}
</script>