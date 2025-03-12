<template>

  <MapModal   :modal-is-open="mapModalIsOpen"
              :locationId="randomLocation.locationId"
              @event-close-modal="closeMapModal"
              @increment-id="incrementId"
              @location-clicked="handleLocationClick"/>

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
        <div class="form-check form-check-inline">
          <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1">
          <label class="form-check-label" for="inlineRadio1"></label>
        </div>
        <div class="form-check form-check-inline">
          <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2">
          <label class="form-check-label" for="inlineRadio2"></label>
        </div>
        <div class="form-check form-check-inline">
          <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio3" value="option3">
          <label class="form-check-label" for="inlineRadio3"></label>
        </div>
        <div class="form-check form-check-inline">
          <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio4" value="option4">
          <label class="form-check-label" for="inlineRadio4"></label>
        </div>
        <div class="form-check form-check-inline">
          <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio5" value="option5">
          <label class="form-check-label" for="inlineRadio5"></label>
        </div>
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


export default {
  name: 'GameView',
  components: {GameResultModal, MapModal, GetHintModal },
  data() {
    return {
      randomGameId: Number(useRoute().query.randomGameId),
      mapModalIsOpen: false,
      hintModalIsOpen: false,
      gameResultIsOpen: false,
      clickedLocation: null,
      randomLocation: {
        locationName: '',
        longitude: 0,
        latitude: 0,
        clue: '',
        imageData: '',
        locationId: 0,
        isGameComplete: true,
        timeStart: ''
      },
      /*id: 3,
      correct_latitude: 58.835353046883235,
      correct_longitude: 25.356445312500004,
      allowedDistanceInMeters: 10000,
      answerIsCorrect: false*/
    };
  },
  methods: {

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

   /* openGameResultModal() {
      this.hintModalIsOpen = true;
    },
    closeGameResultModal() {
      this.hintModalIsOpen = false;
    },*/


   /* handleLocationClick(location) {
      this.clickedLocation = location;
      console.log(`Chosen Location: ${location.lat}, ${location.lng}`);
      this.calculateDistance(location);
    },

    calculateDistance(clickedLocation) {
      const correctLatLng = L.latLng(this.correct_latitude, this.correct_longitude);
      const clickedLatLng = L.latLng(clickedLocation.lat, clickedLocation.lng);
      const distance = correctLatLng.distanceTo(clickedLatLng);
      console.log(distance);
      console.log(this.allowedDistanceInMeters);

      this.answerIsCorrect = distance <= this.allowedDistanceInMeters;
    },

    incrementId() {
      this.id += 1;
    },*/

    fetch() {

    },

   /* async fetchHint() {
      try {
        const response = await GetHintService.sendGetHintRequest(this.id);
        this.hint = response.data;
      } catch (error) {
        console.error("Error fetching hint:", error);
        this.hint = "Viga vihje laadimisel"; // Fallback hint in case of error
      }
    },*/
  },
  mounted() {
    this.getRandomGameLocations()
  /*  this.fetchHint();*/

  }
}

</script>

