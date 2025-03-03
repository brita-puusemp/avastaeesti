
<template v-if="!isLoggedIn">

    <div class="container text-center">
      <div class="row">
        <div class="col">
          <h1>Avasta Eestimaad</h1>
          <button >Kuidas mängida?</button>

          <h3>Sisene kasutajaga</h3>

          <div class="row justify-content-center">
            <div class="col col-4">
              <div class="input-group mb-3">
                <span  class="input-group-text">Kasutajanimi</span>
                <input v-model="username" type="text" class="form-control">
              </div>
              <div class="input-group mb-3">
                <span  class="input-group-text">Parool</span>
                <input v-model="password" type="password" class="form-control">
              </div>
            </div>
          </div>

          <button >Loo kasutaja</button>
          <button @click="login" type="submit" class="btn btn-success ms-5">LOGI SISSE</button>

        </div>

      </div>
    </div>

</template>


<script>
import LoginService from "@/service/LoginService";
import NavigationService from "@/service/NavigationService";

export default {
  data() {
    return {
      username: '',
      password: '',
      loginResponse: {
        userId: 0,
        roleName: ''
      }
    }
  },
  methods: {


    handleLoginResponse(response) {
      this.loginResponse = response.data;
      sessionStorage.setItem('userId', this.loginResponse.userId)
      sessionStorage.setItem('roleName', this.loginResponse.roleName)
      this.$emit('@event-show-nav-menu')
      NavigationService.navigateToUserHomeView()
    },
    sendLoginRequest() {
      LoginService.sendLoginRequest(this.username, this.password)
          .then(response => this.handleLoginResponse(response))
          .catch(error => this.someDataBlockErrorResponseObject = error.response.data)
    },
    login() {
      if (this.username.length > 0 && this.password.length > 0) {

          this.sendLoginRequest();



      }

    },

  },

}
</script>

