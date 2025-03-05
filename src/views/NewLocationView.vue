<template>
  <div>
    <AlertDanger :message="message"/>
    <div class="container text-center">

      <div class="row justify-content-center">
        <div class="col col-7">
          <h3>Asukoha andmed</h3>
          <div class="input-group flex-nowrap mb-3">
            <span class="input-group-text" id="addon-wrapping">Asukoha nimi</span>
            <input type="text" class="form-control">
          </div>

          <div class="d-flex gap-4 mb-3">
            <div class="input-group flex-nowrap">
              <span class="input-group-text" id="addon-wrapping">Asukoha pikkuskraad</span>
              <input type="text" class="form-control">
            </div>
            <div class="input-group flex-nowrap">
              <span class="input-group-text" id="addon-wrapping">Asukoha laiuskraad</span>
              <input type="text" class="form-control">
            </div>
          </div>

          <div class="input-group mb-3">
            <span class="input-group-text" id="addon-wrapping">Koha vihje</span>
            <textarea class="form-control"></textarea>
          </div>

          <div class="input-group mb-4">
            <label class="input-group-text" for="imageInput">Lisa pilt</label>
            <ImageInput @event-new-image-selected="setNewLocationImageData"/>
          </div>

          <div>
            <LocationImage :image-data="newLocation.imageData"/>
          </div>

          <router-link to="/newLocation">Tühista</router-link>
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

export default {
  name: 'NewLocationView',
  components: {LocationImage, ImageInput, AlertDanger},
  data() {
    return {
      message: '',
      newLocation: {
        locationName: '',
        // kas siin väikesetähega vist name ja siis meetodi sees ka parandus
        longitude: '',
        lattitude: '',
        clue: '',
        imageData: '',
        // picture
      },
      locationResponse: {
        locationId: 0,
      }
    }
  },
  methods: {

    setNewLocationImageData(imageData) {
      console.log("OLEN SIIN")
      this.newLocation.imageData = imageData
    },


    createNewLocation() {
      if (this.newLocation.locationName.length > 0
          && this.newLocation.longitude.length > 0
          && this.newLocation.lattitude.length > 0
          && this.newLocation.clue.length > 0
      ) {
        this.sendNewLocationPostRequest()
      } else {
        this.alertMissingFields()
      }
    },

    sendNewLocationPostRequest() {
      LocationService.sendNewLocationPostRequest(this.newLocation)
          .then(response => this.handleNewLocationResponse(response))
          .catch(error => this.handleNewLocationErrorResponse(error))
    },

    handleNewLocationResponse(response) {
      this.newLocation = response.data;
      sessionStorage.setItem('locationId', this.newLocation.locationId)
      this.$emit('event-show-nav-menu')
      NavigationService.navigateToAdminView()
    },

    handleNewLocationErrorResponse(error) {
      this.newLocation = error.response.data;
      // kas peaks siin mingeid välju kontrollima.. (sama nimega/koordinaatidega võib ju olla..teise nurga alt pilt, teine vihje lihtsalt)
      NavigationService.navigateToErrorView()
    },

    alertMissingFields() {
      this.message = 'Kontrolli andmeid'
      setTimeout(this.resetAlertMessage, 4000)
    }

  }
}
</script>