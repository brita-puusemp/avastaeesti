<template>
  <div class="row">
    <div class="col">
      <h3 v-if="isUpdate">Muuda oma andmeid</h3>
      <h3 v-else>Minu andmed</h3>
      <div v-if="isUpdate" class="row justify-content-center align-items-start">
        <div class="col col-4 text-start">

          <div class="input-group mb-3">
            <span class="input-group-text">Kasutajanimi</span>
            <input v-model="user.username" type="text" class="form-control">
          </div>
          <div class="input-group mb-3">
            <span class="input-group-text">Parool</span>
            <input v-model="user.password" :type="showPassword ? 'text' : 'password'" class="form-control">
            <span class="input-group-text" @click="initiateShowPassword" style="cursor: pointer;">
             <font-awesome-icon :icon="['fas', 'eye']"/>
            </span>

          </div>
          <div class="input-group mb-3">
            <span class="input-group-text">Korda parooli</span>
            <input v-model="user.passwordRepeate" :type="showPasswordRepeat ? 'text' : 'password'" class="form-control">
            <span class="input-group-text" @click="initiatePasswordRepeate" style="cursor: pointer;">
            <font-awesome-icon :icon="['fas', 'eye']"/>
          </span>
          </div>
          <div class="input-group mb-3">
            <span class="input-group-text">E-mail</span>
            <input v-model="user.email" type="email" class="form-control">
          </div>
        </div>
      </div>
      <div v-else>
        <h4>{{ user.username }}</h4>
        <h4>{{ user.email }}</h4>
      </div>
      <button v-if="!isUpdate" @click="handleIsUpdate" class="btn btn-outline-secondary">Muuda</button>
      <button v-if="isUpdate" @click="updateUser" type="button" class=" btn btn-light">Salvesta</button>
      <button @click="deleteUserInfo" type="button" class="btn btn-light">Kustuta konto</button>
      <div class="row justify-content-center">
        <div class="col col-4">
          <AlertDanger :message="errorMessage"/>
          <AlertSuccess :message="successMessage"/>
        </div>
      </div>
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
import BusinessErrors from "@/errors/BusinessErrors";

export default {
  name: "ProfileInfoView",
  components: {AlertSuccess, AlertDanger},
  data() {
    return {
      isUpdate: false,
      user: {
        username: '',
        password: '',
        passwordRepeate: '',
        email: '',
      },
      userId: Number(sessionStorage.getItem("userId")),
      showPassword: false,
      showPasswordRepeat: false,
      successMessage: '',
      errorMessage: '',
      errorResponse: {
        message: '',
        errorCode: 0
      },
      allGames: [{
        gameId: 0,
        gameName: '',
        gameDescription: '',
        totalTopScore: 0
      }]
    }
  },
  methods: {

    initiateShowPassword() {
      this.showPassword = true
      setTimeout(() => this.showPassword = false, 2000)
    },

    initiatePasswordRepeate() {
      this.showPasswordRepeat = true
      setTimeout(() => this.showPasswordRepeat = false, 2000)
    },

    getUser(userId) {
      UserService.sendGetUserInfoRequest(userId)
          .then(response => this.handleGetUserRequest(response))
          .catch(() => NavigationService.navigateToErrorView())
    },

    handleGetUserRequest(response) {
      this.user = response.data
    },

    updateUser() {
      if (this.allFieldsCorrect()) {
        UserService.sendPutUserUpdateRequest(this.user, this.userId)
            .then(response => this.handleUserInfoUpdateRequest())
            .catch(error => this.handleUserInfoErrorResponse(error))
      } else {
        this.alertMissingFields()
      }
    },

    handleUserInfoUpdateRequest(response) {
      this.successMessage = 'Sinu andmed on edukalt muudetud'
      setTimeout(this.resetAllMessages, 4000)

    },

    handleUserInfoErrorResponse(error) {
      this.errorResponse = error.response.data;
      if (this.isIncorrectUsername() || this.isIncorrectEmail()) {
        this.handleIncorrectCredentials();
      } else {
        NavigationService.navigateToErrorView()
      }
    },

    isIncorrectUsername() {
      return BusinessErrors.CODE_USERNAME_EXISTS === this.errorResponse.errorCode;
    },

    isIncorrectEmail() {
      return BusinessErrors.CODE_EMAIL_EXISTS === this.errorResponse.errorCode;
    },

    handleIncorrectCredentials() {
      this.message = this.errorResponse.message;
      setTimeout(this.resetAlertMessage, 4000);
    },

    resetAlertMessage() {
      this.message = ''
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
          && this.user.password.length > 0 && this.user.passwordRepeate === this.user.password
          && this.user.email.length > 0
    },

    alertMissingFields() {
      this.errorMessage = 'Kontrolli andmeid'
      setTimeout(this.resetAlertMessage, 4000)
    },


    resetAllMessages() {
      this.errorMessage = ''
      this.successMessage = ''
    },

    // todo minu MÄNGU tabeli teemad
    getGames() {
      GameService.sendGetUserGames(this.userId)
          .then(response => this.handleGetGamesResponse(response))
          .catch(() => NavigationService.navigateToErrorView());
    },
    handleGetGamesResponse(response) {
      this.allGames = response.data;
    }
    ,

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
    ,
  },

  beforeMount() {
    this.getUser(this.userId)
    this.getGames()
  },
}

</script>

