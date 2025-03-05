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
            <input v-model="newUser.password" type="password" class="form-control" >
          </div>
          <div class="input-group mb-3">
            <span class="input-group-text">KORDA PAROOLI</span>
            <input v-model="newUser.passwordRepeat" type="password" class="form-control">
          </div>

          <router-link to="/login">Tagasi</router-link>
          <button @click="createNewUser" type="submit" class="btn btn-success ms-5">Loo kasutaja</button>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import UserService from "@/service/UserService";
import NavigationService from "@/service/NavigationService";
import HttpStatusCodes from "@/errors/HttpStatusCodes";
import BusinessErrors from "@/errors/BusinessErrors";
import AlertDanger from "@/components/alert/AlertDanger.vue";

export default {
  name: 'RegisterView',
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
      loginResponse: {
        userId: 0,
        roleName: ''
      },
      errorResponse: {
        message: '',
        errorCode: 0
      }
    }
  },
  methods: {


    handleRegistrationResponse(response) {
      this.loginResponse = response.data;
      sessionStorage.setItem('userId', this.loginResponse.userId)
      sessionStorage.setItem('roleName', this.loginResponse.roleName)
      this.$emit('event-show-nav-menu')
      NavigationService.navigateToUserHomeView()
    },

    handleRegistrationErrorResponse(error) {
      this.errorResponse = error.response.data;



      if (this.isIncorrectUsername()) {
        this.handleIncorrectCredentials();
      } else if (this.isIncorrectEmail()) {
        this.handleIncorrectCredentials();
      } else {
        NavigationService.navigateToErrorView()
      }
    },

    isIncorrectUsername() {
      return BusinessErrors.CODE_USERNAME_EXISTS === this.errorResponse.errorCode;
    },

    isIncorrectEmail() {
      // todo: siin on buggi  ei jõua "or" lõppu.
      return BusinessErrors.CODE_EMAIL_EXISTS === this.errorResponse.errorCode;
    },

    handleIncorrectCredentials() {
      this.message = this.errorResponse.message;
      setTimeout(this.resetAlertMessage, 4000);
    },

    sendPostRequest() {
      UserService.sendPostRegisterRequest(this.newUser)
          .then(response => this.handleRegistrationResponse(response))
          .catch(error => this.handleRegistrationErrorResponse(error))
    },

    createNewUser() {
      if (this.newUser.username.length > 0
          && this.newUser.password.length > 0
          && this.newUser.password === this.newUser.passwordRepeat
          && this.newUser.email.length > 0) {
        this.sendPostRequest();
      } else {
        this.alertMissingFields()
      }
    },
    resetAlertMessage() {
      this.message = ''
    },
    alertMissingFields() {
      this.message = 'Kontrolli andmeid'
      setTimeout(this.resetAlertMessage, 4000)
    }

  }
}
</script>



