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
          <a class="nav-link active" aria-current="page" href="#/home"><font-awesome-icon :icon="['fas', 'house']" /></a>
          <a class="nav-link" href="#/game-new"><font-awesome-icon :icon="['fas', 'plus']" /></a>
          <a class="nav-link" href="#">KÕIK MÄNGUD</a>
        </div>
          <div class="navbar-nav ms-auto">
            <template v-if="isUser">
          <a class="nav-link" href="#"><font-awesome-icon :icon="['far', 'star']" /></a>
            </template>
          <a class="nav-link" href="#"><font-awesome-icon :icon="['far', 'circle-user']" /></a>
          <a @click="logOut" class="nav-link" href="#/">Logi välja</a>
            </div>
      </div>
    </div>
  </nav>
</template>

  <router-view @event-show-nav-menu="showNavMenu"/>
</template>


<script>
import axios from "axios";
import LoginService from "@/service/LoginService";

export default {
  data() {
    return {
      isLoggedIn: false,
      isUser: false,
    }
  },
  methods: {

    showNavMenu() {
      let userId = sessionStorage.getItem('userId')
      this.isLoggedIn = userId !== null
      let roleName = sessionStorage.getItem('roleName')
      this.isUser = roleName != null && 'user' === roleName
    },

    logOut() {
      this.isLoggedIn = false
    }
  }
}
</script>