<template>
  <div class="container text-center">
    <div class="row">
      <div class="col">
        <h3>TULEMUSED</h3>
        <p>Õiged vastused: {{this.gameOverResults.correctCount}}</p>
        <p>Valed vastused: {{this.gameOverResults.inCorrectCount}}</p>
        <p>Aega läks: {{formatTime(this.gameOverResults.totalTime)}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import GameService from "@/service/GameService";
import {useRoute} from "vue-router";

export default {
  name: 'GameOverView',
  data() {
    return {
      randomGameId: Number(useRoute().query.randomGameId),
      gameOverResults: {
        correctCount: 0,
       inCorrectCount: 0,
       totalTime: 0
      }
    }
  },
  methods: {

    handleGetGameOverResultsResponse(response) {
      return this.gameOverResults = response.data;
    },
    getGameResults() {
      GameService.sendGetGameOverResultsRequest(this.randomGameId)
          .then(response => this.handleGetGameOverResultsResponse(response))
          .catch(error => this.someDataBlockErrorResponseObject = error.response.data)
    },
    formatTime(totalTime) {
      const minutes = Math.floor(totalTime / 60); // Arvuta minutid
      const seconds = totalTime % 60; // Arvuta sekundid
      return `${minutes} min ja ${seconds} sek`;
}

  },
  mounted() {
    this.getGameResults()
  }
}
</script>



