<template>
  <LogOutModal :modal-is-open="modalIsOpen"
               @event-close-modal="closeLogOutModal"
               @event-execute-log-out="executeLogOut"
  />
  <nav v-if="isLoggedIn" class="navbar navbar-expand-lg bg-body-tertiary">
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
            <router-link class="nav-link" to="/games">KÕIK MÄNGUD</router-link>
          </template>

          <template v-if="isAdmin">
            <router-link class="nav-link" to="/games">KÕIK MÄNGUD</router-link>
          </template>
        </div>

        <div class="navbar-nav ms-auto">
          <template v-if="isUser">
            <router-link class="nav-link" to="/favourites">
              <font-awesome-icon :icon="['far', 'star']"/>
            </router-link>
          </template>

          <template v-if="isUser">
            <router-link class="nav-link" to="/profile">
              <font-awesome-icon :icon="['far', 'circle-user']"/>
            </router-link>
          </template>

          <template v-else-if="isAdmin">
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
  <router-view @event-update-nav-menu="updateNavMenu"/>
</template>
<script>

import LogOutModal from "@/components/modal/LogOutModal.vue";
import NavigationService from "@/service/NavigationService";
import '@/assets/css/global.css';

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
      this.closeLogOutModal()
      this.isLoggedIn = false
      this.isUser = false
      this.isAdmin = false
      sessionStorage.clear()
      this.updateNavMenu()
      NavigationService.navigateToLoginView()
    },

    updateNavMenu() {
      let userId = sessionStorage.getItem('userId')
      this.isLoggedIn = userId !== null && userId !== ""
      let roleName = sessionStorage.getItem('roleName')
      this.isUser = roleName === 'user'
      this.isAdmin = roleName === 'admin'
    },
  },
  beforeMount() {
    this.updateNavMenu()
  }
}
</script>

<style scoped>
.navbar {
  background-color: #16446a !important; /* Tumesinine taust */
  color: #afd1ec !important; /* Valge tekst */
}

.navbar-brand, .nav-link {
  color: #afd1ec !important; /* Valge tekst */
}

.nav-link:hover {
  color: #ffffff !important; /* Hele sinine tekst hover korral */
}

.btn-success {
  background-color: #8cd390 !important; /* Hele roheline taust */
  color: #1a426e !important; /* Tumesinine tekst */
  border: none !important; /* Eemalda piirjoon */
}

.btn-success:hover {
  background-color: #218838 !important; /* Tumem roheline hover korral */
}

.nav-link .fa-icon {
  color: #afd1ec !important; /* Valge ikoon */
  font-size: 1.5rem !important; /* Suurenda ikooni suurust */
}

.nav-link:hover .fa-icon {
  color: #ffffff !important; /* Hele sinine ikoon hover korral */
}
</style>