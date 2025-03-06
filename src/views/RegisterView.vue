<template>
  <div>

    <AlertDanger :message="message"/>

    <div class="container text-center">
      <div class="row justify-content-center">
        <div class="col col-4">
          <h3>Loo uus kasutaja</h3>
          <div class="input-group mb-3">
            <span class="input-group-text">E-MAIL</span>
            <input v-model="newUser.email" type="text" class="form-control">
          </div>
          <div class="input-group mb-3">
            <span class="input-group-text">KASUTAJANIMI</span>
            <input v-model="newUser.username" type="text" class="form-control">
          </div>
          <!--todo: parool peab võrduma korda parool + ui visble/not visble nupp-->
          <div class="input-group mb-3">
            <span class="input-group-text">PAROOL</span>
            <input v-model="newUser.password" type="password" class="form-control">
          </div>
          <div class="input-group mb-3">
            <span class="input-group-text">KORDA PAROOLI</span>
            <input v-model="newUser.passwordRepeat" type="password" class="form-control">
          </div>

          <button @click="goBack">Tagasi</button>
          <button @click="createNewUser" type="submit" class="btn btn-success ms-5">Loo kasutaja</button>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import UserService from "@/service/UserService";
import NavigationService from "@/service/NavigationService";
import BusinessErrors from "@/errors/BusinessErrors";
import AlertDanger from "@/components/alert/AlertDanger.vue";

export default {
  gameName: 'RegisterView',
  components: {AlertDanger},
  data() {
    return {
      message: '',
      newUser: {
        email: "",
        username: "",
        password: "",
        passwordRepeat: ""
      },
      errorResponse: {
        message: '',
        errorCode: 0
      }
    }
  },
  methods: {

    goBack() {
      this.$router.go(-1)
    },

    handleRegistrationResponse() {
      this.$emit('event-show-nav-menu')
      NavigationService.navigateToLoginView()
    },

    handleRegistrationErrorResponse(error) {
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

    sendCreateNewUserRequest() {
      UserService.sendPostRegisterRequest(this.newUser)
          .then(() => this.handleRegistrationResponse())
          .catch(error => this.handleRegistrationErrorResponse(error))
    },

    allFieldsCorrect() {
      return this.newUser.username.length > 0
          && this.newUser.password.length > 0
          && this.newUser.password === this.newUser.passwordRepeat
          && this.newUser.email.length > 0;
    },

    createNewUser() {
      if (this.allFieldsCorrect()) {
        this.sendCreateNewUserRequest();
      } else {
        this.alertMissingFields()
      }
    },

    alertMissingFields() {
      this.message = 'Kontrolli andmeid'
      setTimeout(this.resetAlertMessage, 4000)
    },
    resetAlertMessage() {
      this.message = ''
    },

  }
}
</script>



