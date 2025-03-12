<template>

  <MapModal   :modal-is-open="mapModalIsOpen"
              :location-id="randomLocation.locationId"
              :random-game-id="randomGameId"
              @event-close-modal="closeMapModal"
              @event-execute-answering="handleUserAnswer"
  />

  <GetHintModal :hint-modal-is-open="hintModalIsOpen"
                :hint="randomLocation.clue"
                :randomGameId="randomGameId"
                @event-close-modal="closeHintModal"
                @event-open-map-modal-from-hint-modal="openMapModalFromHintModal"

  />




  <div class="container text-center">
    <div class="row justify-content-center">
      <!-- Buttons for the rounds -->
      <div class="col-auto">
        progress
      </div>
    </div>


    <div class="row mt-3 justify-content-center">
      <div class="col-auto">
        <img :src="randomLocation.imageData" class="img-fluid w-100 d-block mx-auto" alt="image">
      </div>
    </div>


    <div class="text-center mt-3">
      <button @click="openHintModal" type="submit" class="btn btn-secondary mx-2">VÕTA VIHJE</button>
      <button @click="openMapModal" type="submit" class="btn btn-success mx-2">AVA KAARDIL</button>
    </div>
  </div>
</template>

<script>


import MapModal from "@/components/modal/MapModal.vue";
import GetHintModal from "@/components/modal/GetHintModal.vue";
import GetHintService from "@/service/GetHintService";
import L from "leaflet";
import GameResultModal from "@/components/modal/GameResultModal.vue";
import {useRoute} from "vue-router";
import GameService from "@/service/GameService";
import NavigationService from "@/service/NavigationService";


export default {
  name: 'GameView',
  components: {GameResultModal, MapModal, GetHintModal },
  data() {
    return {
      randomGameId: Number(useRoute().query.randomGameId),
      mapModalIsOpen: false,
      hintModalIsOpen: false,
      randomLocation: {
        locationId: 0,
        locationName: '',
        longitude: 0,
        latitude: 0,
        clue: '',
        imageData: '',
        isGameComplete: '',
        timeStart: ''
      },
    };
  },

  beforeRouteUpdate(to, from, next) {
    this.randomGameId = Number(to.query.randomGameId); // Uuenda randomGameId
    this.getRandomGameLocations(); // Laadi uued andmed
    next(); // Jätka navigeerimist
  },

  methods: {

    checkIfGameisOver() {
      if(this.randomLocation.isGameComplete) {
        NavigationService.navigateToGameOverView(this.randomGameId)
      }
    },

    handleUserAnswer(clickedLocation, locationId, randomGameId) {
      const userAnswer = {
        randomGameId: randomGameId,
        locationId: locationId,
        clickedLocation: clickedLocation
      };
      this.sendUserAnswer(userAnswer)
    },


    handleUserAnswerResponse(response) {
      const userAnswerResult = response.data;
      NavigationService.navigateToResultView(userAnswerResult, this.randomGameId)

    },

    sendUserAnswer(userAnswer) {
      GameService.sendPostUserAnswerRequest(userAnswer)
          .then(response => this.handleUserAnswerResponse(response))
          .catch(error => this.someDataBlockErrorResponseObject = error.response.data)
    },

    handleGetRandomGameLocationsResponse(response) {
      return this.randomLocation = response.data;
    },

    getRandomGameLocations()
    {
      GameService.sendGetRandomGameLocationsRequest(this.randomGameId)
          .then(response => this.handleGetRandomGameLocationsResponse(response))
          .catch(error => this.someDataBlockErrorResponseObject = error.response.data)
    },

    openMapModalFromHintModal() {
      this.closeHintModal()
      this.openMapModal()
    },

    openMapModal() {
      this.mapModalIsOpen = true;
    },

    closeMapModal() {
      this.mapModalIsOpen = false;
    },

    openHintModal() {
      this.hintModalIsOpen = true;
    },
    closeHintModal() {
      this.hintModalIsOpen = false;
    },

  },
  mounted() {
    this.checkIfGameisOver()
    this.getRandomGameLocations()


  }
}

</script>

