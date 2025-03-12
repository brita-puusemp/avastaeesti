<template>
  <div class="row">
    <div class="col">
      <h3 v-if="isUpdate">Muuda oma andmeid</h3>
      <h3 v-else>Minu andmed</h3>
      <AlertDanger :message="errorMessage"/>
      <AlertSuccess :message="successMessage"/>
      <div class="row justify-content-center align-items-start">
        <div class="col col-4 text-start">

          <div class="input-group mb-3">
            <input v-model="user.username" type="text" class="form-control">
            <button v-if="isUpdate" @click="updateUser" class="btn btn-outline-secondary" type="button" id="usernama">
              Salvesta
            </button>
          </div>

          <div class="input-group mb-3">
            <input v-model="user.password" type="password" class="form-control">
            <button v-if="isUpdate" @click="updateUser" class="btn btn-outline-secondary" type="button" id="password">
              Salvesta
            </button>
          </div>

          <div class="input-group mb-3">
            <input v-model="user.email" type="email" class="form-control">
            <button v-if="isUpdate" @click="updateUser" class="btn btn-outline-secondary" type="button" id="email">
              Salvesta
            </button>
          </div>
        </div>
      </div>
      <button v-if="!isUpdate" @click="handleIsUpdate" class="btn btn-outline-secondary">Muuda</button>
      <button @click="deleteUserInfo" type="button" class="btn btn-light">Kustuta konto</button>
    </div>
  </div>
  <div class="row mt-5">
    <div class="col">
      <h3>Minu loodud mängud</h3>
    </div>
  </div>
  <div>
    <table class="table">
      <thead>
      <tr>
        <th scope="col">Mängu nimi</th>
        <th scope="col">Kirjeldus</th>
        <th scope="col">Kustuta</th>
      </tr>
      </thead>
      <tbody>
      <!--      todo: kas on siin allGames?-->
      <tr v-for="(newGame) in allGames" :key="newGame.gameId">
        <td>{{ newGame.gameName }}</td>
        <td>{{ newGame.gameDescription }}</td>
        <td>
          <font-awesome-icon icon="trash" @click="deleteUserGame(newGame.gameId)"
                             class="cursor-pointer"/>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>


<script>

import NavigationService from "@/service/NavigationService";
import AlertSuccess from "@/components/alert/AlertSuccess.vue";
import AlertDanger from "@/components/alert/AlertDanger.vue";
import GameService from "@/service/GameService";
import UserService from "@/service/UserService";

export default {
  name: "ProfileInfoView",
  components: {AlertSuccess, AlertDanger},
  data() {
    return {
      isUpdate: false,
      user: {
        username: '',
        password: '',
        email: '',
      },
      userId: Number(sessionStorage.getItem("userId")),
      successMessage: '',
      errorMessage: '',
      allGames: [{
        gameId: 0,
        gameName: '',
        gameDescription: '',
        totalTopScore: 0
      }]
    }
  },
  methods: {

    getUser(userId) {
      UserService.sendGetUserInfoRequest(userId)
          .then(response => this.handleGetUserRequest(response))
          .catch(() => this.handleGetUserErrorResponse())
    },

    handleGetUserRequest(response) {
      this.user = response.data
    },

    handleGetUserErrorResponse() {
      this.errorMessage = "Viga kasutaja andmete laadimisel!"
      setTimeout(this.resetAllMessages, 4000)
    },

    updateUser() {
      if (this.allFieldsCorrect()) {
        UserService.sendPutUserUpdateRequest(this.user, this.userId)
            .then(response => this.handleUserInfoUpdateRequest(response))
            .catch(() => NavigationService.navigateToErrorView())
      } else {
        this.alertMissingFields()
      }
    },

    handleUserInfoUpdateRequest(response) {
      this.successMessage = 'Sinu andmed on edukalt muudetud'
      setTimeout(this.resetAllMessages, 4000)
    },

    deleteUserInfo() {
      UserService.sendDeleteUserInfoRequest(this.userId)
          .then(response => this.handleDeleteUserInfoRequest(response))
          .catch(() => NavigationService.navigateToErrorView())
    },

    handleDeleteUserInfoRequest(response) {
      this.successMessage = "Konto on edukalt kustutatud"
      setTimeout(() => this.resetAllMessages, 4000)
      NavigationService.navigateToLoginView()
    },

    allFieldsCorrect() {
      return this.user.username.length > 0
          && this.user.password.length > 0
          && this.user.email.length > 0
    },

    alertMissingFields() {
      this.message = 'Kontrolli andmeid'
      setTimeout(this.resetAlertMessage, 4000)
    },

    resetAlertMessage() {
      this.message = ''
    },

    resetAllMessages() {
      this.errorMessage = ''
      this.successMessage = ''
    },

    // todo minu MÄNGU tabeli teemad
    getGames() {
      GameService.sendGetGamesRequest()
          .then(response => this.handleGetGamesResponse(response))
          .catch(() => NavigationService.navigateToErrorView());
    },
    handleGetGamesResponse(response) {
      this.allGames = response.data;
    },

// todo - mängu kustutamise nupp - backis delete teenus teha
    // deleteUserGame() .- todo sarnane.. nupp siis ka startDeleteUserGameProcess(gameId)
    // startDeleteLocationProcess(locationId) {
    //   this.selectedLocationId = locationId
    //   LocationService.sendGetLocationRequest(this.selectedLocationId)
    //       .then(response => {
    //         this.handleGetLocationResponse(response);
    //       })
    //       .catch(() => NavigationService.navigateToErrorView())
    // },
    //
    // handleGetLocationResponse(response) {
    //   this.location = response.data
    //   this.modalIsOpen = true
    // },
    //
    // deleteLocation() {
    //   LocationService.sendDeleteLocationRequest(this.selectedLocationId)
    //       .then(() => this.handleDeleteLocationResponse())
    // },
    //
    // handleDeleteLocationResponse() {
    //   this.getLocations()
    //   this.successMessage = "Asukoht on edukalt kustutatud"
    //   setTimeout(this.resetAllMessages, 4000)
    // },

    handleIsUpdate() {
      this.isUpdate = true
    }
  },

  beforeMount() {
    this.getUser(this.userId)
    this.getGames()
  },
}

</script>

