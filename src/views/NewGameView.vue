<template>
  <div class="container text-center">
    <div class="row">
      <div class="col">
        <h3>Mängu andmed</h3>
        <div class="input-group flex-nowrap mb-3">
          <span class="input-group-text" id="addon-wrapping">Mängu nimi</span>
          <input v-model="newGame.gameName" type="text" class="form-control">
        </div>

        <div class="input-group mb-3">
          <span class="input-group-text" id="addon-wrapping">Mängu kirjeldus</span>
          <textarea v-model="newGame.description" class="form-control"></textarea>
        </div>

        <div class="input-group flex-nowrap mb-3">
          <span class="input-group-text" id="addon-wrapping">Aega vastamiseks (min)</span>
          <input v-model="newGame.timePerQuestion" type="text" class="form-control">
        </div>


        <button @click="createNewGame" type="submit">Lisa küsimused</button>

      </div>
      <div class="col">
        <button @click="createNewGame" type="submit" class="btn btn-success ms-5">KINNITA</button>
      </div>

    </div>
  </div>
</template>


<script>
import NavigationService from "@/service/NavigationService";
import GameService from "@/service/GameService";

export default {
  gameName: "NewGameView",
  data() {
    return {
      newGame: {
        userId: sessionStorage.getItem('userId'),
        gameName: '',
        description: '',
        timePerQuestion: 0
      }

    }
  },

  methods: {


    handleCreateNewGameResponse(response) {
      let gameId = response.data;
      NavigationService.navigateToGameQuestionView(gameId)
    },

    handleNewGameInfo() {
      GameService.sendCreateNewGameRequest(this.newGame)
          .then(response => this.handleCreateNewGameResponse(response))
          .catch(() => NavigationService.navigateToErrorView())
    },

    createNewGame() {
      if (this.allFieldsCorrect()) {
        this.handleNewGameInfo()
      } else {
        NavigationService.navigateToErrorView()
      }

    },
    allFieldsCorrect() {
      return this.newGame.gameName.length > 0
          && this.newGame.description.length > 0
          && this.newGame.timePerQuestion.length > 0
    },

  }
}
</script>