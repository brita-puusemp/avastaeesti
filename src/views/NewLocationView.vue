<template>
  <div>
    <AlertDanger :message="message"/>
    <div class="container text-center">

      <div class="row justify-content-center">
        <div class="col col-7">
          <h3>Asukoha andmed</h3>
          <div class="input-group flex-nowrap mb-3">
            <span class="input-group-text" id="addon-wrapping">Asukoha nimi</span>
            <input v-model="newLocation.locationName" type="text" class="form-control">
          </div>

          <div class="d-flex gap-4 mb-3">
            <div class="input-group flex-nowrap">
              <span class="input-group-text" id="addon-wrapping">Asukoha pikkuskraad</span>
              <input v-model="newLocation.longitude" type="text" class="form-control">
            </div>
            <div class="input-group flex-nowrap">
              <span class="input-group-text" id="addon-wrapping">Asukoha laiuskraad</span>
              <input v-model="newLocation.lattitude" type="text" class="form-control">
            </div>
          </div>

          <div class="input-group mb-3">
            <span class="input-group-text" id="addon-wrapping">Koha vihje</span>
            <textarea v-model="newLocation.clue" class="form-control"></textarea>
          </div>

          <div class="input-group mb-4">
            <label class="input-group-text" for="imageInput">Lisa pilt</label>
            <ImageInput @event-new-image-selected="setNewLocationImageData"/>
          </div>

          <div>
            <LocationImage :image-data="newLocation.imageData"/>
          </div>

          <router-link to="/location">Tühista</router-link>
          <button @click="createNewLocation" type="submit" class="btn btn-success ms-5">KINNITA</button>
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
import BusinessErrors from "@/errors/BusinessErrors";

export default {
  name: 'NewLocationView',
  components: {LocationImage, ImageInput, AlertDanger},
  data() {
    return {
      message: '',
      newLocation: {
        locationName: '',
        longitude: '',
        lattitude: '',
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
    createNewLocation() {
      if (this.allFieldsCorrect()
      ) {
        this.sendCreateNewLocationRequest()
      } else {
        this.alertMissingFields()
      }
    },
    allFieldsCorrect() {
      return this.newLocation.locationName.length > 0
          && this.newLocation.longitude.length > 0
          && this.newLocation.lattitude.length > 0
          && this.newLocation.clue.length > 0
          && this.newLocation.imageData.length > 0;
    },

    setNewLocationImageData(imageData) {
      this.newLocation.imageData = imageData
    },
    sendCreateNewLocationRequest() {
      LocationService.sendNewLocationPostRequest(this.newLocation)
          .then(()=> this.handleNewLocationResponse())
          .catch(error=>this.handleNewErrorResponse(error))
    },
    handleNewErrorResponse(error){
      this.errorResponse = error.response.data
      if (BusinessErrors.CODE_LOCATION_EXISTS === this.errorResponse.errorCode){
        this.message = this.errorResponse.message
        setTimeout(this.resetAlertMessage, 4000)
      }else{
        NavigationService.navigateToErrorView()
      }
    },
    // todo: ei lähe admin lehele edasi
    handleNewLocationResponse() {
      NavigationService.navigateToAdminView()
    },

    alertMissingFields() {
      this.message = 'Kontrolli andmeid'
      setTimeout(this.resetAlertMessage, 4000)
    },
    resetAlertMessage() {
      this.message = ''
    }
}
}
</script>