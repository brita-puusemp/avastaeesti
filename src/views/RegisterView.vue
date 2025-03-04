<template>
  <div>

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
            <input type="password" class="form-control">
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

export default {
  name: 'RegisterView',
  data() {
    return {
    newUser: {
      email: "",
      username: "",
      password: ""
    },
      loginResponse: {
        userId: 0,
        roleName: ''
      },
    }
  },
  methods: {


    handleRegistrationResponse(response) {
      this.loginResponse = response.data;
      sessionStorage.setItem('userId', this.loginResponse.userId)
      sessionStorage.setItem('roleName', this.loginResponse.roleName)
      this.$emit('@event-show-nav-menu')
      NavigationService.navigateToUserHomeView()
    },

    handleRegistrationErrorResponse(error) {
      return this.someDataBlockErrorResponseObject = error.response.data;
    },

    createNewUser() {
      UserService.sendPostRegisterRequest(this.newUser)

            .then(response => this.handleRegistrationResponse(response))
            .catch(error => this.handleRegistrationErrorResponse(error))


    },

  }
}
</script>



