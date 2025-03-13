<template>
  <div>

    <div class="container text-center">
      <h3>Mängu andmed</h3>
      <div class="row justify-content-center">
        <div class="col col-6">
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
                       :style="{width: '250px'}"></td>
              <td>{{ gameLocation.locationName }}</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="row justify-content-center">
        <div class="col col-6 mb-3">
          <LocationsDropdown :locations="locations"
                             :selected-location-id="selectedLocationId"
                             @event-new-location-selected="setGameLocationLocationId"
          />
        </div>
        <div class="col col-2 mb-3">
          <button @click="addNewLocationToUserGame" type="submit" class="btn btn-light">Lisa see mängu</button>
        </div>
        <div>
          <button @click="gameCreated" type="button" class="btn btn-success ms-5">MÄNG ON VALMIS</button>
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

    gameCreated(){
      NavigationService.navigateToProfileInfoView()
    }
  },

  beforeMount() {
    this.getLocations()
    this.getGameLocations()
  }
}
</script>
<script setup lang="ts">
</script>