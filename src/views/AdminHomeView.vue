<template>
  <div>
    <div class="container text-center">
      <div class="row">
        <div class="col">
          <h3>ASUKOHAD</h3>
        </div>
      </div>

      <div class="container text-center">
        <div class="col-4">
          <AlertDanger :message="errorMessage"/>
          <AlertSuccess :message="successMessage"/>
        </div>

      </div>

      <div class="row mt-4 justify-content-center">
        <div class="col col-10">
          <LocationsTable :locations="locations"
                          @event-location-deleted="handleLocationDeleted"
          />
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import AlertSuccess from "@/components/alert/AlertSuccess.vue";
import AlertDanger from "@/components/alert/AlertDanger.vue";
import LocationsTable from "@/components/location/LocationsTable.vue";
import locationService from "@/service/LocationService";
import httpStatusCodes from "@/errors/HttpStatusCodes";
import businessErrors from "@/errors/BusinessErrors";
import NavigationService from "@/service/NavigationService";

export default {
  name: 'AdminHomeView',
  components: {LocationsTable, AlertDanger, AlertSuccess,},
  data() {
    return {
      isAdmin: false,
      modalIsOpen: false,
      isDelete: false,
      location: {},
      errorMessage: '',
      successMessage: '',
      locations: [
        {
          locationId: 0,
          locationName: '',
        }
      ],
      errorResponse: {
        message: '',
        errorCode: 0
      }
    }
  },

  methods: {

    validateIsAdmin() {
      const roleName = sessionStorage.getItem('roleName')
      this.isAdmin = roleName != null && roleName === 'admin'
    },

    getLocations() {
      locationService.sendGetLocationsRequest()
          .then(response => this.handleGetLocationsResponse(response))
          .catch(error => this.handleGetLocationsErrorResponse(error))
    },

    handleGetLocationsResponse(response) {
      this.locations = response.data;
    },

    handleGetLocationsErrorResponse() {
      this.locations = []
      this.setErrorResponse(error)
      if (this.isLocationNotFoundError(error)) {
        this.setErrorMessage()
        setTimeout(this.resetAllMessages, 4000)
      } else {
        NavigationService.navigateToErrorView()
      }
    },

    setErrorResponse(error) {
      this.errorResponse = error.response.data
    },

    isLocationNotFoundError() {
      return httpStatusCodes.STATUS_NOT_FOUND === error.response.status && businessErrors.CODE_NO_LOCATION_FOUND === this.errorResponse.errorCode;
    },

    setErrorMessage() {
      this.errorMessage = this.errorResponse.message
    },

    handleLocationDeleted() {
      this.getLocations();
      this.successMessage = 'Asukoht on edukalt kustutatud'
      setTimeout(this.resetAllMessages, 4000)
    },

    resetAllMessages() {
      this.errorMessage = ''
      this.successMessage = ''
    },

  },

  beforeMount() {
    this.validateIsAdmin()
    this.getLocations()
  }
}
</script>
