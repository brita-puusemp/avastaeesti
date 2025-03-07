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
              <span class="input-group-text" id="addon-wrapping">Asukoha pikkuskraad</span>
              <input v-model="location.longitude" type="number" class="form-control">
            </div>
            <div class="input-group flex-nowrap">
              <span class="input-group-text" id="addon-wrapping">Asukoha laiuskraad</span>
              <input v-model="location.latitude" type="number" class="form-control">
            </div>
          </div>

          <div class="input-group mb-3">
            <span class="input-group-text" id="addon-wrapping">Koha vihje</span>
            <textarea v-model="location.clue" class="form-control"></textarea>
          </div>

          <div class="input-group mb-4">
            <label class="input-group-text" for="imageInput">Lisa pilt</label>
            <ImageInput @event-new-image-selected="setNewLocationImageData"/>
          </div>

          <div>
            <LocationImage :image-data="location.imageData"/>
          </div>
          <!--todo: et andmed tühjaks läheksid ka, kui tühista nuppu vajutad, et saaks uuesti sisestama hakata-->
          <router-link to="/location">Tühista</router-link>
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
  locationName: 'LocationView',
  components: {LocationImage, ImageInput, AlertDanger, AlertSuccess},
  data() {
    return {
      isEdit: false,
      locationId: 0,
      locations: [
        {
          locationId: 0,
          locationName: '',
        }
      ],
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

    updateLocation() {
      LocationService.sendPutLocationRequest(this.location, this.locationId)
          .then(response => this.handleUpdateLocationRequest(response))
          .catch(() => NavigationService.navigateToErrorView())
    },

    saveLocation() {
      if (this.allFieldsCorrect()) {
        this.updateLocation()
      } else {
        this.alertMissingFields()
      }
    },

    allFieldsCorrect() {
      return this.location.locationName.length > 0
          && this.location.longitude !== null
          && this.location.latitude !== null
          && this.location.clue.length > 0
          && this.location.imageData.length > 0
    },

    // todo: ei tule edukas message
    handleUpdateLocationRequest() {
      this.successMessage = 'Asukoha info on edukalt muudetud'
      setTimeout(this.resetAllMessages, 4000)

    },

    setNewLocationImageData(imageData) {
      this.location.imageData = imageData
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

    // todo: ei näita asukoht lisatud
    handleNewLocationResponse() {
      this.successMessage = 'Asukoht lisatud'
      NavigationService.navigateToAdminView()
    },

    alertMissingFields() {
      this.errorMessage = 'Kontrolli andmeid'
      setTimeout(this.resetAllMessages, 4000)
    },

    resetAllMessages() {
      this.errorMessage = ''
      this.successMessage = ''
    },

    handleIsEdit() {
      let locationId = Number(this.$route.query.locationId);
      this.isEdit = !isNaN(locationId); // true if questionId is a number, false otherwise
      if (this.isEdit) {
        this.locationId = locationId
        this.getLocation(locationId)
      }
      //   todo: kui isEdit on true, siis too ära asukohaandmed get sõnumiga, kasutades locationId´d. tulemus panna dataplokki location objekti sisse.
    },

    getLocation(locationId) {
      locationService.sendGetLocationRequest(locationId)
          .then(response => this.handleGetLocationRequest(response))
          .catch(() => NavigationService.navigateToErrorView(error))

    },

    handleGetLocationRequest(response) {
      this.location = response.data;
    },

  },

  beforeMount() {
    this.handleIsEdit()

  }

}

</script>