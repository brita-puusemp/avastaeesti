
<template>
  <div>

    <div class="container text-center">
      <h3>Mängu andmed</h3>
      <div class="row justify-content-center">
        <div class="col col-3">
          <table class="table">
            <thead>
            <tr>
              <th scope="col">PILT</th>
              <th scope="col">KOHANIMI</th>
            </tr>
            </thead>
            <tbody>
            <tr  v-for="(preview, index) in locationPreviews" :key="index">
              <td><img :src="preview.imageData" :alt="preview.locationName + ' pilt'" :style="{width: '140px'}"></td>
              <td>{{ preview.locationName }}</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="row justify-content-center">
        <div class="col col-2">
          <LocationsDropdown :locations="locations"
                             :selected-location-id="selectedLocationId"
                             @event-new-location-selected="setGameLocationLocationId"
          />
        </div>
        <div class="col col-2">
          <button @click="getLocationPreview" type="submit">Lisa mõistatus mängu</button>
        </div>

      </div>

      <div class="col">
        <button @click="saveNewGame" type="submit" class="btn btn-success">LOO MÄNG</button>
      </div>

    </div>

  </div>
</template>
<script>
import LocationsDropdown from "@/components/location/LocationsDropdown.vue";
import LocationService from "@/service/LocationService";
import NavigationService from "@/service/NavigationService";
import GameService from "@/service/GameService";

export default {
  name: 'gameQuestionsView',
  components: {LocationsDropdown},
  data() {
    return {
      gameId: 0,
      locationPreviews: [],
      selectedLocationId: 0,
      locations: [],
      locationPreview: {
        locationId: 0,
        locationName: '',
        imageData: ''
      }
    }
  },
  methods: {

    saveNewGame() {
      const locationIds = this.locationPreviews.map(preview => preview.locationId);
      const gameData = {
        gameId: this.gameId,
        locationIds: locationIds,
      }
    },

  //todo: save gamelocations

    handleLocationPreviewResponse(response) {
      this.locationPreviews.push({
            locationId: response.data.locationId,
        locationName: response.data.locationName,
        imageData: response.data.imageData,
      });
    },

    handleLocationPreviewErrorResponse(error) {
      return this.someDataBlockErrorResponseObject = error.response.data;
    },

    getLocationPreview() {
      LocationService.sendGetLocationPreviewRequest(this.selectedLocationId)
          .then(response => this.handleLocationPreviewResponse(response))
          .catch(error => this.handleLocationPreviewErrorResponse(error))
    },

    sendLocation() {
      LocationService.sendGetLocationsRequest()
          .then(response => this.handleGetLocationsResponse(response))
          .catch(() => NavigationService.navigateToErrorView());
    },

    handleGetLocationsResponse(response) {
      return this.locations = response.data;
    },
    setGameLocationLocationId(selectedLocationId) {
      console.log("Valitud ID-d enne uuendamist:", this.selectedLocationId);
      this.selectedLocationId = selectedLocationId
      console.log("Valitud ID-d pärast uuendamist:", this.selectedLocationId);
    },
  },
  beforeMount() {
    this.sendLocation()
  }
}
</script>
<script setup lang="ts">
</script>