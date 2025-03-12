<template v-if="isLoggedIn">
  <LogOutModal :modal-is-open="modalIsOpen"
               @event-close-modal="closeLogOutModal"
               @event-execute-log-out="executeLogOut"
  />
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
      <a class="navbar-brand">Avasta Eestimaad</a>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">

        <div class="navbar-nav">
          <template v-if="isUser">
            <router-link class="nav-link active" aria-current="page" to="/home">
              <font-awesome-icon :icon="['fas', 'house']"/>
            </router-link>
          </template>

          <template v-else-if="isAdmin">
            <router-link class="nav-link active" aria-current="page" to="/home-admin">
              <font-awesome-icon :icon="['fas', 'house']"/>
            </router-link>
          </template>


          <template v-if="isUser">
            <router-link class="nav-link" to="/game-new">
              <font-awesome-icon :icon="['fas', 'plus']"/>
              <span> UUS </span>
            </router-link>
          </template>

          <template v-if="isAdmin">
            <router-link class="nav-link" to="/location">
              <font-awesome-icon :icon="['fas', 'plus']"/>
              <span> UUS </span>
            </router-link>
          </template>

          <template v-if="isUser">
            <!--              todo: siin see to: /games TBD ning kas Admin ka seda näeb(on adminil edalsi mingi koostatud mängude leht?-->
            <router-link class="nav-link" to="/games">KÕIK MÄNGUD</router-link>
          </template>
        </div>

        <div class="navbar-nav ms-auto">
          <template v-if="isUser">
            <!--              todo: siin tuleb /favorite route õigeks muuta-->
            <router-link class="nav-link" to="/favorite">
              <font-awesome-icon :icon="['far', 'star']"/>
            </router-link>
          </template>

          <template v-if="isUser">
            <!--              todo: siin tuleb /profile-user route õigeks muuta -->
            <router-link class="nav-link" to="/profile">
              <font-awesome-icon :icon="['far', 'circle-user']"/>
            </router-link>
          </template>

          <template v-else-if="isAdmin">
            <!--              todo: siin tuleb /profile-admin route õigeks muuta -->
            <router-link class="nav-link" to="/profile">
              <font-awesome-icon :icon="['far', 'circle-user']"/>
            </router-link>
          </template>

          <template v-if="isUser">
            <button @click="openLogOutModal" type="button" class="btn btn-success">Logi välja</button>
          </template>
          <template v-else-if="isLoggedIn">
            <button @click="openLogOutModal" type="button" class="btn btn-success">Logi välja</button>
          </template>
          <template v-else>
            <router-link to="/"></router-link>
          </template>

        </div>
      </div>
    </div>
  </nav>
  <router-view @event-show-nav-menu="showNavMenu"/>
</template>
<script>

import LogOutModal from "@/components/modal/LogOutModal.vue";
import NavigationService from "@/service/NavigationService";

export default {
  components: {LogOutModal},
  data() {
    return {
      modalIsOpen: false,
      isLoggedIn: false,
      isUser: false,
      isAdmin: false,
    }
  },
  methods: {

    openLogOutModal() {
      this.modalIsOpen = true
    },

    closeLogOutModal() {
      this.modalIsOpen = false
    },

    executeLogOut() {
      sessionStorage.clear()
      this.showNavMenu()
      NavigationService.navigateToLoginView()
      this.isLoggedIn = false
      this.closeLogOutModal()
    },

    showNavMenu() {
      let userId = sessionStorage.getItem('userId')
      this.isLoggedIn = userId !== null
      let roleName = sessionStorage.getItem('roleName')
      this.isUser = roleName != null && 'user' === roleName
      this.isAdmin = roleName != null && 'admin' === roleName
    },
  }
}
</script>