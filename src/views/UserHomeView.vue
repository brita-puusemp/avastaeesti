<template>

  <div class="row">
    <div class="col-sm-6 mb-3 mb-sm-0">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">Special title treatment</h5>
          <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
          <a @click="createNewRandomGame" href="#/game" class="btn btn-primary">ALUSTA UUT MÄNGU</a>
        </div>
      </div>
    </div>
    <div class="col-sm-6">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">Special title treatment</h5>
          <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
          <a href="#" class="btn btn-primary">VAATA MÄNGE</a>
        </div>
      </div>
    </div>
  </div>

  <div class="row">
    <div class="col-sm-6 mb-3 mb-sm-0">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">Special title treatment</h5>
          <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
          <a href="#/game-new" class="btn btn-primary">LOO UUS MÄNG</a>
        </div>
      </div>
    </div>
    <div class="col-sm-6">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">Special title treatment</h5>
          <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
          <a href="#" class="btn btn-primary">VAATA LEMMIKKOHTI</a>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import axios from "axios";
import GameService from "@/service/GameService";
import NavigationService from "@/service/NavigationService";

export default {
  name: 'UserHomeView',
  data() {
    return {
      userId: sessionStorage.getItem('userId'),

    }
  },
  methods: {

    handleCreateNewRandomGameResponse(response) {
      let randomGameId = response.data;
      NavigationService.navigateToGameView(randomGameId)
    },

    createNewRandomGame() {
      GameService.sendPostNewRandomGame(this.userId)
          .then(response => this.handleCreateNewRandomGameResponse(response))
          .catch(error => this.someDataBlockErrorResponseObject = error.response.data)
    },
  }
}
</script>



