
<template>
  <div>

    <div class="container text-center">
      <h1>Küsimused</h1>
      <div class="row justify-content-center">
        <div class="col col-3">
          <table class="table">
            <thead>
            <tr>
              <th scope="col">pilt</th>
              <th scope="col">kohanimi</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td><img src="" alt="Mingi mõis pilt"></td>
              <td>Mingi mõis</td>
            </tr>
            <tr>
              <td><img src="" alt="Mingi teine mõis pilt"></td>
              <td>Mingi teine mõis</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="row justify-content-center">
        <div class="col col-2">
          <LocationsDropdown :questions="questions"
                             :selected-location-id="gameQuestions.questionId"
                             @event-new-location-selected="setGameQuestionQuestionId"
          />
        </div>
        <div class="col col-2">
          <button type="submit">Lisa</button>
        </div>

      </div>
    </div>

  </div>
</template>
<script>
import LocationsDropdown from "@/components/location/LocationsDropdown.vue";
import LocationService from "@/service/LocationService";
import NavigationService from "@/service/NavigationService";

export default {
  gameName: 'gameQuestionsView',
  components: {LocationsDropdown},
  data() {
    return {
      questions: [],
      gameQuestions: {
        gameId: 0,
        questionId: 0,
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
    setGameQuestionQuestionId(selectedLocationId) {
      console.log("Valitud ID-d enne uuendamist:", this.gameQuestions.questionId);
      this.gameQuestions.questionId = selectedLocationId
      console.log("Valitud ID-d pärast uuendamist:", this.gameQuestions.questionId);
    },
  },
  beforeMount() {
    this.sendlocation()
  }
}
</script>
