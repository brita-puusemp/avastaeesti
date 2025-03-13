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
            <tr v-for="(gameLocation) in gameLocations" :key="gameLocation.gameLocationId">
              <td><img :src="gameLocation.locationImage" :alt="gameLocation.locationName + ' pilt'"
                       :style="{width: '240px'}"></td>
              <td>{{ gameLocation.locationName }}</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="row justify-content-center">
        <div class="col col-2 mb-3">
          <LocationsDropdown :locations="locations"
                             :selected-location-id="selectedLocationId"
                             @event-new-location-selected="setGameLocationLocationId"
          />
        </div>
        <div class="col col-2 mb-3">
          <button @click="addNewLocationToUserGame" type="submit" class="btn btn-success">LISA KÜSIMUS MÄNGU</button>
        </div>

      </div>


    </div>

  </div>
</template>
<script>
import LocationsDropdown from "@/components/location/LocationsDropdown.vue";
import LocationService from "@/service/LocationService";
import NavigationService from "@/service/NavigationService";
import GameService from "@/service/GameService";
import {useRoute} from "vue-router";

export default {
  name: 'gameQuestionsView',
  components: {LocationsDropdown},
  data() {
    return {
      gameId: Number(useRoute().query.gameId),
      gameLocations:
          [
            {
              gameLocationId: 0,
              locationImage: '',
              locationName: ''
            }
          ],
      selectedLocationId: 0,
      locations: [
        {
          locationId: 0,
          locationName: ''
        }
      ],
      locationPreview: {
        locationId: 0,
        locationName: '',
        imageData: ''
      },
      gameData: {
        gameId: Number(useRoute().query.gameId),
        locationIds: [],
      }
    }
  },
  methods: {
    // todo __ ümber teha.. previewed NOK ja POST juurde.

    getGameLocations() {
      LocationService.sendGetGameLocationsRequest(this.gameId)
          .then(response => this.handleGameLocationResponse(response))
          .catch(() => NavigationService.navigateToErrorView())
    },

    handleGameLocationResponse(response) {
      this.gameLocations = response.data;
    },

    addNewLocationToUserGame() {
      GameService.sendPostNewLocationToUserGame(this.gameId, this.selectedLocationId)
          .then(() => this.handleAddedGameLocationResponse())
          .catch(() => NavigationService.navigateToErrorView())
    },

    handleAddedGameLocationResponse() {
      this.getGameLocations()
    },



    createNewGameLocations() {
      this.gameData.locationIds = this.gameLocations.map(preview => preview.locationId);
      this.saveNewGameLocation(this.gameData)
    },

    saveNewGameLocation(gameData) {
      GameService.sendSaveGameLocations(gameData)
          .then(() => this.handleSaveGameLocationsResponse())
          .catch(() => NavigationService.navigateToErrorView())
    },

    handleSaveGameLocationsResponse() {
      this.$router.go(-2)

    },

    getLocationPreview() {
      LocationService.sendGetLocationPreviewRequest(this.selectedLocationId)
          .then(response => this.handleLocationPreviewResponse(response))
          .catch(error => this.handleLocationPreviewErrorResponse(error))
    },

    handleLocationPreviewResponse(response) {
      this.gameLocations.push({
        locationId: response.data.locationId,
        locationName: response.data.locationName,
        imageData: response.data.imageData,
      });
    },

    handleLocationPreviewErrorResponse(error) {
      this.someDataBlockErrorResponseObject = error.response.data;
    },

    getLocations() {
      LocationService.sendGetLocationsRequest()
          .then(response => this.handleGetLocationsResponse(response))
          .catch(() => NavigationService.navigateToErrorView());
    },

    handleGetLocationsResponse(response) {
      this.locations = response.data;
    },

    setGameLocationLocationId(selectedLocationId) {
      this.selectedLocationId = selectedLocationId
    },
  },

  beforeMount() {
    this.getLocations()
    this.getGameLocations()
  }
}
</script>
<script setup lang="ts">
</script>