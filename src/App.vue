<template>

  <template v-if="isLoggedIn">
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
      <a class="navbar-brand" >Avasta Eestimaad</a>
<!--      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>-->
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav">
          <a class="nav-link active" aria-current="page" href="#"><font-awesome-icon :icon="['fas', 'house']" /></a>
          <a class="nav-link" href="#"><font-awesome-icon :icon="['fas', 'plus']" /></a>
          <a class="nav-link" href="#">KÕIK MÄNGUD</a>
        </div>
          <div class="navbar-nav ms-auto">
            <template v-if="isUser">
          <a class="nav-link" href="#"><font-awesome-icon :icon="['far', 'star']" /></a>
            </template>
          <a class="nav-link" href="#"><font-awesome-icon :icon="['far', 'circle-user']" /></a>
          <a class="nav-link" href="#">Logi välja</a>
            </div>
      </div>
    </div>
  </nav>
</template>

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
          <span  class="input-group-text" id="basic-addon1">Kasutajanimi</span>
          <input v-model="username" type="text" class="form-control">
        </div>
        <div class="input-group mb-3">
          <span  class="input-group-text" id="basic-addon1">Parool</span>
          <input v-model="password" type="password" class="form-control">
        </div>
        </div>
        </div>

        <button >Loo kasutaja</button>
        <button type="button" class="btn btn-success ms-5">LOGI SISSE</button>

      </div>

    </div>
  </div>
</template>
</template>


<script>
import axios from "axios";
import LoginService from "@/service/LoginService";

export default {
  data() {
    return {
      isLoggedIn: false,
      isUser: false,
      username: '',
      password: '',
      loginResponse: {
        userId: 0,
        roleName: ''
      }
    }
  },
  methods: {

    showNavMenu() {
      let userId = sessionStorage.getItem('userId')
      this.isLoggedIn = userId !== null
      let roleName = sessionStorage.getItem('roleName')
      this.isUser = roleName != null && 'user' === roleName
    },


    handleLoginResponse(response) {
      this.loginResponse = response.data;

    },

    handleLoginErrorResponse(error) {
      return this.someDataBlockErrorResponseObject = error.response.data;
    }, sendLoginResponse() {
      LoginService.getLogin(this.username, this.password)
          .then(response => this.handleLoginResponse(response))
          .catch(error => this.handleLoginErrorResponse(error))
    },

    login() {
      if (this.username.length > 0 && this.password.length > 0) {
          this.sendLogiResponse();


      }

    },

  }
}
</script>