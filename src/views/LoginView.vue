<template>

  <InstructionsModal :modal-is-open="modalIsOpen"
                     @event-close-modal="closeModal
"/>
  <div class="container text-center">
    <div class="row justify-content-center mb-5">
      <div class="col col-8">
        <AlertDanger :message="message"/>
      </div>
    </div>
    <div class="row justify-content-center mb-5">
      <div class="col">
        <h1>Avasta Eestimaad</h1>
        <button @click="openInstructionsModal" class="btn btn-light">Kuidas mängida?</button>

        <h3>Sisene kasutajaga</h3>

        <div class="row justify-content-center mb-3">
          <div class="col col-4">
            <div class="input-group mb-3">
              <span class="input-group-text">Kasutajanimi</span>
              <input v-model="username" type="text" class="form-control">
            </div>
            <div class="input-group mb-3">
              <span class="input-group-text">Parool</span>
              <input v-model="password" type="password" class="form-control">
            </div>
          </div>
        </div>

        <router-link to="/register">Loo kasutaja</router-link>
        <button @click="login" type="submit" class="btn btn-success ms-5">LOGI SISSE</button>

      </div>

    </div>
  </div>

</template>

<script>
import LoginService from "@/service/LoginService";
import NavigationService from "@/service/NavigationService";
import HttpStatusCodes from "@/errors/HttpStatusCodes";
import BusinessErrors from "@/errors/BusinessErrors";
import AlertDanger from "@/components/alert/AlertDanger.vue";
import InstructionsModal from "@/components/modal/InstructionsModal.vue";

export default {
  name: 'LoginView',
  components: {InstructionsModal, AlertDanger},
  data() {
    return {
      modalIsOpen: false,
      username: '',
      password: '',
      message: '',
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

    openInstructionsModal() {
      this.modalIsOpen = true
    },

    sendLoginRequest() {
      LoginService.sendLoginRequest(this.username, this.password)
          .then(response => this.handleLoginResponse(response))
          .catch(error => this.handleLoginErrorResponse(error))
    },

    handleLoginResponse(response) {
      this.loginResponse = response.data;
      sessionStorage.setItem('userId', this.loginResponse.userId)
      sessionStorage.setItem('roleName', this.loginResponse.roleName)
      this.$emit('event-update-nav-menu')
      if (this.loginResponse.roleName === 'admin') {
        NavigationService.navigateToAdminHomeView()
      } else {
        NavigationService.navigateToUserHomeView()
      }
    },

    handleLoginErrorResponse(error) {
      this.errorResponse = error.response.data;
      const httpStatusCode = error.response.status

      if (this.isIncorrectCredentials(httpStatusCode)) {
        this.handleIncorrectCredentials();
      } else {
        NavigationService.navigateToErrorView()
      }
    },

    isIncorrectCredentials(httpStatusCode) {
      return HttpStatusCodes.STATUS_FORBIDDEN === httpStatusCode
          && BusinessErrors.CODE_INCORRECT_CREDENTIALS === this.errorResponse.errorCode;
    },

    handleIncorrectCredentials() {
      this.message = this.errorResponse.message;
      setTimeout(this.resetAlertMessage, 4000);
    },

    resetAlertMessage() {
      this.message = ''
    },

    login() {
      if (this.username.length > 0 && this.password.length > 0) {
        this.sendLoginRequest();
      } else {
        this.alertMissingFields();
      }
    },

    alertMissingFields() {
      this.message = 'Kontrolli andmeid'
      setTimeout(this.resetAlertMessage, 4000)
    },

    closeModal() {
      this.modalIsOpen = false
    }
  }
}
</script>

