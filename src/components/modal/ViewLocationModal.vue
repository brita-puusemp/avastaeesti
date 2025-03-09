<template>
  <Modal :modal-is-open="modalIsOpen" @event-close.modal="$emit('event-close-modal')">
    <template #title>
      <div v-if="isDelete">
        Kas sa soovid kustuta asukohta{{ location.locationName }}?
      </div>
      <div v-else>
        {{ location.locationName }}
      </div>
    </template>

    <template #body>
      <div class="row justify-content-center">
        <div class="col">
          <LocationImage :image-data="location.imageData"/>
        </div>
      </div>
    </template>

    <template #footer>
      <button v-if="isDelete" @click="deleteLocation" type="button" class="btn btn-secondary me-2">KUSTUTA</button>
    </template>

  </Modal>
</template>

<script>
import Modal from "@/components/modal/Modal.vue";
import LocationImage from "@/components/image/LocationImage.vue";
import locationService from "@/service/LocationService";
import NavigationService from "@/service/NavigationService";

export default {
  name: "ViewLocationModal",
  components: {LocationImage, Modal},
  props: {
    modalIsOpen: Boolean,
    isDelete: Boolean,
    location: {},
  },

  methods: {

    deleteLocation() {
      locationService.sendDeleteLocationRequest(this.location.locationId)
          .then(() => this.handleDeleteLocationResponse())
          .catch(() => NavigationService.navigateToErrorView())
    },

    handleDeleteLocationResponse() {
      this.$emit('event-location-deleted')
      this.$emit('event-close-modal')
    },
  }
}
</script>