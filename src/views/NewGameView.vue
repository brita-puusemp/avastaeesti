<template>
  <div class="container text-center">
    <div class="row">
      <div class="col">
        <h3>Mängu andmed</h3>
        <div class="input-group flex-nowrap mb-3">
          <span class="input-group-text" id="addon-wrapping">Mängu nimi</span>
          <input type="text" class="form-control">
        </div>

        <div class="input-group mb-3">
          <span class="input-group-text" id="addon-wrapping">Koha vihje</span>
          <textarea class="form-control"></textarea>
        </div>

        <div class="input-group flex-nowrap mb-3">
          <span class="input-group-text" id="addon-wrapping">Aega vastamiseks (min)</span>
          <input type="text" class="form-control">
        </div>

        <LocationsDropdown :questions="questions"/>

      </div>
      <div class="col">
        Column
      </div>

    </div>
  </div>
</template>


<script>
import NavigationService from "@/service/NavigationService";
import LocationsDropdown from "@/components/location/LocationsDropdown.vue";
import LocationService from "@/service/LocationService";

export default {
  name: "NewGameView",
  components: {LocationsDropdown},
  data() {
    return {
      questions: [
        {
          questionId: 0,
          locationName: '',

        }
      ]

    }
  },

  methods: {

    sendlocation() {
      LocationService.sendGetLocationsRequest()
          .then(response => this.handleGetLocationsResponse(response))
          .catch(() => NavigationService.navigateToErrorView());
    },

    handleGetLocationsResponse(response) {
      return this.questions = response.data;
    },


  },
  beforeMount() {
    this.sendlocation()
  }
}
</script>