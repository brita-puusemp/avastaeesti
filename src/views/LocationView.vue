<template>
  <div>
    <AlertDanger :message="message"/>
    <div class="container text-center">

      <div class="row justify-content-center">
        <div class="col col-7">
          <h3>Asukoha andmed</h3>
          <div class="input-group flex-nowrap mb-3">
            <span class="input-group-text" id="addon-wrapping">Asukoha nimi</span>
            <input v-model="location.locationName" type="text" class="form-control">
          </div>

          <div class="d-flex gap-4 mb-3">
            <div class="input-group flex-nowrap">
              <span class="input-group-text" id="addon-wrapping">Asukoha pikkuskraad</span>
              <input v-model="location.longitude" type="text" class="form-control">
            </div>
            <div class="input-group flex-nowrap">
              <span class="input-group-text" id="addon-wrapping">Asukoha laiuskraad</span>
              <input v-model="location.lattitude" type="text" class="form-control">
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
          <button v-else @click="createNewLocation" type="submit" class="btn btn-success ms-5">LISA ASUKOHT</button>

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
  name: 'LocationView',
  components: {LocationImage, ImageInput, AlertDanger},
  data() {
    return {
      isEdit: false,
      questionId: 0,
      message: '',
      location: {
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
    saveLocation() {
      //   todo: saada put sõnum andes kaasa requestion parameetrina questionId, requestBodyna dataploki locationon objekt.
      if (this.allFieldsCorrect()) {

      }else{
        this.alertMissingFields()
      }
    },


    handleUpdateLocationRequest(response) {
   this.location = response.data;
    },
    handleUpdateLocationErrorResponse(error) {
     this.location = error.response.data;
    },

    updateLocation() {
      LocationService.sendPutLocationRequest(location,questionId)
          .then(response => this.handleUpdateLocationRequest(response))
          .catch(error => this.handleUpdateLocationErrorResponse(error))
    },


    allFieldsCorrect() {
      return this.location.locationName.length > 0
          && this.location.longitude.length > 0
          && this.location.lattitude.length > 0
          && this.location.clue.length > 0
          && this.location.imageData.length > 0;
    },

    setNewLocationImageData(imageData) {
      this.location.imageData = imageData
    },
    sendCreateNewLocationRequest() {
      LocationService.sendNewLocationPostRequest(this.location)
          .then(() => this.handleNewLocationResponse())
          .catch(error => this.handleNewErrorResponse(error))
    },
    handleNewErrorResponse(error) {
      this.errorResponse = error.response.data
      if (BusinessErrors.CODE_LOCATION_EXISTS === this.errorResponse.errorCode) {
        this.message = this.errorResponse.message
        setTimeout(this.resetAlertMessage, 4000)
      } else {
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
    },
    handleIsEdit() {
      let questionId = Number(this.$route.query.questionId);
      this.isEdit = !isNaN(questionId); // true if questionId is a number, false otherwise
      if (this.isEdit) {
        this.questionId = questionId
      }
      //   todo: kui isEdit on true, siis too ära asukohaandmed get sõnumiga, kasutades QeustionId´d. tulemus panna dataplokki location objekti sisse.
    }

  },

  beforeMount() {
    this.handleIsEdit()
  }

}
</script>