<template>
  <div class="container text-center">
    <div class="row">
      <div class="col">
        <font-awesome-icon :icon="['fas', 'trophy']"/>
        <h3>TOP SKOORID</h3>
        {{}}
        <h3>SINU SKOOR</h3>
        {{score}}
        <h3>TULEMUSED</h3>
        <p>Õiged vastused: {{this.gameOverResults.correctCount}}</p>
        <p>Valed vastused: {{this.gameOverResults.inCorrectCount}}</p>
        <p>Aega läks: {{formatTime(this.gameOverResults.totalTime)}}</p>
        <a @click="createNewRandomGame" href="#/game" class="btn btn-primary">ALUSTA UUT MÄNGU</a>
      </div>
    </div>
  </div>
</template>

<script>
import {useRoute} from "vue-router";
import GameService from "@/service/GameService";

export default {
  name: 'GameScoreView',
  data() {
    return {
      userId: sessionStorage.getItem('userId'),
      userGameId: Number(useRoute().query.userGameId),
      gameOverResults: {
        correctCount: 0,
        inCorrectCount: 0,
        totalTime: 0
      },
      score: 0
    }},
  methods: {

    handleGetGameOverScoreResponse(response) {
      return this.score = response.data;
    },

    getGameScore() {
      GameService.sendGetUserGameOverScoreRequest(this.userGameId)
          .then(response => this.handleGetGameOverScoreResponse(response))
          .catch(error => this.someDataBlockErrorResponseObject = error.response.data)
    },

    handleGetGameOverResultsResponse(response) {
      return this.gameOverResults = response.data;
    },
    getGameResults() {
      GameService.sendGetUserGameOverResultsRequest(this.userGameId)
          .then(response => this.handleGetGameOverResultsResponse(response))
          .catch(error => this.someDataBlockErrorResponseObject = error.response.data)
    },
    formatTime(totalTime) {
      const minutes = Math.floor(totalTime / 60); // Arvuta minutid
      const seconds = totalTime % 60; // Arvuta sekundid
      return `${minutes} min ja ${seconds} sek`;
    },
  },
  mounted() {
    this.getGameResults()
    this.getGameScore()
  }
}
</script>