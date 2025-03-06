<template>
  <div class="container text-center">
    <div class="row">
      <div class="col">
        <h3>Mängu andmed</h3>
        <div class="input-group flex-nowrap mb-3">
          <span class="input-group-text" id="addon-wrapping">Mängu nimi</span>
          <input type="text" class="form-control">
        </div>

        <div class="input-group mb-3">
          <span class="input-group-text" id="addon-wrapping">Koha vihje</span>
          <textarea class="form-control"></textarea>
        </div>

        <div class="input-group flex-nowrap mb-3">
          <span class="input-group-text" id="addon-wrapping">Aega vastamiseks (min)</span>
          <input type="text" class="form-control">
        </div>

        <LocationsDropdown
            :questions="questions"
            :selected-locations-id="gameQuestions.questionId"
            @event-new-location-selected="setGameQuestionQuestionId"

        />



      </div>
      <div class="col">
        Column
      </div>

    </div>
  </div>
</template>


<script>
import NavigationService from "@/service/NavigationService";
import LocationsDropdown from "@/components/location/LocationsDropdown.vue";
import LocationService from "@/service/LocationService";

export default {
  name: "NewGameView",
  components: {LocationsDropdown},
  data() {
    return {
      questions: [],
      gameQuestions: {
        gameId: 0,
        questionId: [],
      }
    }
  },

  methods: {

    sendlocation() {
      LocationService.sendGetLocationsRequest()
          .then(response => this.handleGetLocationsResponse(response))
          .catch(() => NavigationService.navigateToErrorView());
    },

    handleGetLocationsResponse(response) {
      return this.questions = response.data;
    },
    setGameQuestionQuestionId(selectedLocationsId) {
      console.log("Valitud ID-d enne uuendamist:", this.gameQuestions.questionId);
      this.gameQuestions.questionId = [...selectedLocationsId]
      console.log("Valitud ID-d pärast uuendamist:", this.gameQuestions.questionId);
    },


  },
  beforeMount() {
    this.sendlocation()
  }
}
</script>