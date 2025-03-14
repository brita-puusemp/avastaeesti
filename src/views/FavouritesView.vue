<template>
  <div>
    <div v-if="userHasAtLeastOneFavourite">
      <h1>MINU LEMMIK KOHAD</h1>
      <p>Koha nimi: {{location.locationName}}</p>
      <div class="container text-center">
        <div class="row">
          <div class="col d-flex align-items-center justify-content-center">
            <font-awesome-icon v-if="displayLeftArrow" @click="handlePreviousLocation" :icon="['fas', 'angle-left']"/>
          </div>
          <div class="col image-container">
            <LocationImage :image-data="location.imageData"/>
          </div>
          <div class="col d-flex align-items-center justify-content-center">
            <font-awesome-icon v-if="displayRightArrow" @click="handleNextLocation" :icon="['fas', 'angle-right']"/>
          </div>
        </div>
        <div class="row justify-content-center">
          <div v-for="userFavourite in userFavourites">
            <font-awesome-icon @click="updateLocation(userFavourite.index, userFavourite.locationId)" :icon="['far', 'circle-dot']" />
          </div>
        </div>
      </div>


    </div>
    <div v-else>
      No luck
    </div>

  </div>
</template>

<script>

import FavouriteService from "@/service/FavouriteService";
import LocationService from "@/service/LocationService";
import LocationImage from "@/components/image/LocationImage.vue";


export default {
  name: 'FavouritesView',
  components: {LocationImage},

  data() {
    return {
      displayLeftArrow: true,
      displayRightArrow: true,
      userHasAtLeastOneFavourite: true,
      userId: Number(sessionStorage.getItem('userId')),
      selectedIndex: 1,
      userFavourites: [
        {
          index: 0,
          locationId: 0
        }
      ],
      location: {
        locationId: 0,
        locationName: '',
        longitude: 0,
        latitude: 0,
        clue: '',
        imageData: '',
      },
      current_location_name: "",
      current_location_image: "",
    }
  },


  methods: {

    handlePreviousLocation() {
      let selectedLocationId = this.userFavourites[this.selectedIndex - 2].locationId
      this.selectedIndex--
      this.getLocation(selectedLocationId)
    },

    handleNextLocation() {
      let selectedLocationId = this.userFavourites[this.selectedIndex].locationId
      this.selectedIndex++
      this.getLocation(selectedLocationId)
    },



    updateDisplayArrows() {
      this.displayLeftArrow = true
      this.displayRightArrow = true

      if (this.selectedIndex === 1) {
        this.displayLeftArrow = false
      }
      if ( this.selectedIndex === this.userFavourites.length) {
        this.displayRightArrow = false
      }

    },

    getUserFavourites() {
      FavouriteService.sendGetUserFavouritesRequest(this.userId)
          .then(response => this.handleGetUserFavouritesResponse(response))
    },

    updateLocation(index, locationId) {
      this.selectedIndex = index
      this.getLocation(locationId)
    },


    getLocation(locationId){
      LocationService.sendGetLocationRequest(locationId)
          .then(response => this.handleGetLocationResponse(response))
    },

    handleGetLocationResponse(response) {
      this.location = response.data
      this.updateDisplayArrows()
    },

    handleGetUserFavouritesResponse(response) {
      this.userFavourites = response.data
      this.userHasAtLeastOneFavourite = this.userFavourites.length > 0

      if (this.userHasAtLeastOneFavourite) {
        this.getLocation(this.userFavourites[0].locationId);
      }

    },


  },
  beforeMount() {
    this.getUserFavourites();
  }
}



</script>

<style scoped>
.image-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%; /* Ensure the container takes full width */
}

</style>
