<template>
  <div class="container text-center">

    <AlertDanger :message="message"/>

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
          <input v-model="newGame.timePerLocation" type="text" class="form-control">
        </div>

        <button @click="createNewGame" type="button" class="btn btn-light">Vali oma mängu küsimused</button>
        <button @click="goBack" type="button" class="btn btn-light">Tagasi</button>

      </div>
    </div>
  </div>
</template>

<script>
import NavigationService from "@/service/NavigationService";
import GameService from "@/service/GameService";
import AlertDanger from "@/components/alert/AlertDanger.vue";

export default {
  name: "NewGameView",
  components: {AlertDanger},
  data() {
    return {
      message: '',
      newGame: {
        userId: sessionStorage.getItem('userId'),
        gameName: '',
        description: '',
        timePerLocation: 0
      }
    }
  },

  methods: {
    createNewGame() {
      if (this.allFieldsCorrect()) {
        this.handleNewGameInfo()
      } else {
        this.alertMissingFields()
      }
    },

    allFieldsCorrect() {
      return this.newGame.gameName.length > 0
          && this.newGame.description.length > 0
          && this.newGame.timePerLocation.length > 0
    },

    handleNewGameInfo() {
      GameService.sendCreateNewGameRequest(this.newGame)
          .then(response => this.handleCreateNewGameResponse(response))
          .catch(() => NavigationService.navigateToErrorView())
    },

    handleCreateNewGameResponse(response) {
      let gameId = response.data;
      NavigationService.navigateToGameQuestionView(gameId)
    },

    alertMissingFields() {
      this.message = 'Kontrolli andmeid'
      setTimeout(this.resetAlertMessage, 4000)
    },

    goBack() {
      this.$router.go(-1)
    }
  }
}
</script>