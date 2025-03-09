<template>
  <div>
    <ViewLocationModal :modal-is-open="modalIsOpen" :location="location" :is-delete="isDelete"
                       @event-close-modal="closeViewLocationModal"
                       @event-location-deleted="$emit('event-location-deleted')"

    />
    <table class="table">
      <thead>
      <tr>
        <!--      todo: kas siin saaks genereerida JKN?-->
        <th scope="row">Järjekorranumber</th>
        <th scope="col">ASUKOHA NIMI</th>
        <!--        todo: vaata üle, kas see muuda/kustuta ikka jääb-->
        <th scope="col">Muuda/Kustuta</th>

        <th v-if="isAdmin" scope="col"></th>
      </tr>
      </thead>

      <tbody>


      <tr v-for="location in locations" :key="location.locationId">
        <th scope="row">{{ location.locationName }}</th>
      </tr>

      <tr>
        <td v-if="isAdmin">
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
    //todo: kas lodations{} või location [ja sisu ka? ja datasse hoopis]
  },
  data() {
    return {
      modalIsOpen: false,
      isDelete: false,
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
          .then(response => this.handleGetLocationRequest(response))
          .catch(() => NavigationService.navigateToErrorView())
    },

    handleGetLocationRequest(response) {
      this.location = response.data
    }
  }
}
</script>