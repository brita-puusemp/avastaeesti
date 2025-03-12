<template>
  <div>
    <div class="container text-center">
      <div class="row justify-content-center">
        <div class="col col-7">
          <h3 v-if="isEdit">Muuda asukoha andmeid</h3>
          <h3 v-else>Lisa asukoha andmed</h3>
          <AlertDanger :message="errorMessage"/>
          <AlertSuccess :message="successMessage"/>
          <div class="input-group flex-nowrap mb-3">
            <span class="input-group-text" id="addon-wrapping">Asukoha nimi</span>
            <input v-model="location.locationName" type="text" class="form-control">
          </div>

          <div class="d-flex gap-4 mb-3">
            <div class="input-group flex-nowrap">
              <span class="input-group-text" id="addon-wrapping">Pikkuskraad</span>
              <input v-model="location.longitude" type="number" class="form-control">
            </div>
            <div class="input-group flex-nowrap">
              <span class="input-group-text" id="addon-wrapping">Laiuskraad</span>
              <input v-model="location.latitude" type="number" class="form-control">
            </div>
          </div>

          <div class="input-group mb-3">
            <span class="input-group-text" id="addon-wrapping">Asukoha vihje</span>
            <textarea v-model="location.clue" class="form-control"></textarea>
          </div>

          <div class="input-group mb-4">
            <label class="input-group-text" for="imageInput">Lisa pilt</label>
            <ImageInput @event-new-image-selected="setNewLocationImageData"/>

          </div>

          <div class="d-flex justify-content-center">
            <LocationImage :image-data="location.imageData" style="width: 500px; height: 500px;"/>
          </div>
          <button @click="goBack" type="button" class="btn btn-light">Nimekirja juurde</button>
          <button v-if="isEdit" @click="saveLocation" type="submit" class="btn btn-success ms-5">SALVESTA</button>
          <button v-else @click="addNewLocation" type="submit" class="btn btn-success ms-5">LISA ASUKOHT</button>

        </div>
      </div>
    </div>
  </div>
</template>

<script>

import AlertDanger from "@/components/alert/AlertDanger.vue"
import NavigationService from "@/service/NavigationService"
import ImageInput from "@/components/image/ImageInput.vue";
import LocationImage from "@/components/image/LocationImage.vue";
import LocationService from "@/service/LocationService";
import locationService from "@/service/LocationService";
import BusinessErrors from "@/errors/BusinessErrors";
import AlertSuccess from "@/components/alert/AlertSuccess.vue";

export default {
  name: 'LocationView',
  components: {LocationImage, ImageInput, AlertDanger, AlertSuccess},
  data() {
    return {
      isEdit: false,
      locationId: 0,
      successMessage: '',
      errorMessage: '',
      location: {
        locationName: '',
        longitude: null,
        latitude: null,
        clue: '',
        imageData: '',
      },
      errorResponse: {
        message: '',
        errorCode: 0
      }
    }
  },
  methods: {

    addNewLocation() {
      if (this.allFieldsCorrect()) {
        this.sendCreateNewLocationRequest()
      } else {
        this.alertMissingFields()
      }
    },

    sendCreateNewLocationRequest() {
      LocationService.sendNewLocationPostRequest(this.location)
          .then(() => this.handleNewLocationResponse())
          .catch(error => this.handleNewErrorResponse(error))
    },

    // todo ei anna edukat asukoht lisatud, läks kohe home-admin lehele.
    handleNewLocationResponse() {
      sessionStorage.setItem('successMessage', 'Asukoht lisatud')
      // setTimeout(this.resetAllMessages, 4000,) see siin ei tööta
      NavigationService.navigateToAdminHomeView()
    },

    handleNewErrorResponse(error) {
      this.errorResponse = error.response.data
      if (BusinessErrors.CODE_LOCATION_EXISTS === this.errorResponse.errorCode) {
        this.errorMessage = this.errorResponse.message
        setTimeout(this.resetAllMessages, 4000)
      } else {
        NavigationService.navigateToErrorView()
      }
    },

    updateLocation() {
      LocationService.sendPutLocationRequest(this.location, this.locationId)
          .then(response => this.handleUpdateLocationResponse(response))
          .catch(() => NavigationService.navigateToErrorView())
    },

    handleUpdateLocationResponse() {
      this.successMessage = 'Asukoha info on edukalt muudetud'
      setTimeout(this.resetAllMessages, 4000)
    },

    saveLocation() {
      if (this.allFieldsCorrect()) {
        this.updateLocation()
      } else {
        this.alertMissingFields()
      }
    },

    alertMissingFields() {
      this.errorMessage = 'Kontrolli andmeid'
      setTimeout(this.resetAllMessages, 4000)
    },

    allFieldsCorrect() {
      return this.location.locationName.length > 0
          && this.location.longitude !== null
          && this.location.latitude !== null
          && this.location.clue.length > 0
          && this.location.imageData.length > 0
    },

    handleIsEdit() {
      let locationId = Number(this.$route.query.locationId)
      this.isEdit = !isNaN(locationId)
      if (this.isEdit) {
        this.locationId = locationId
        this.getLocation(locationId)
      }
    },

    getLocation(locationId) {
      locationService.sendGetLocationRequest(locationId)
          .then(response => this.handleGetLocationRequest(response))
          .catch(() => NavigationService.navigateToErrorView())
    },

    handleGetLocationRequest(response) {
      this.location = response.data
    },

    setNewLocationImageData(imageData) {
      this.location.imageData = imageData
    },

    resetAllMessages() {
      this.errorMessage = ''
      this.successMessage = ''
    },

    goBack() {
      this.$router.go(-1)
    }
  },

  beforeMount() {
    this.handleIsEdit()
  }
}
</script>