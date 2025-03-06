<template>

  <MapModal2 :modal-is-open="modalIsOpen"
             @event-close-modal="closeModal"
             @location-clicked="handleLocationClick"
  />

  <div class="container text-center">
    <div class="row justify-content-center">
      <!-- Buttons for the rounds -->
      <div class="col-auto">
        <div class="form-check form-check-inline">
          <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1">
          <label class="form-check-label" for="inlineRadio1"></label>
        </div>
        <div class="form-check form-check-inline">
          <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2">
          <label class="form-check-label" for="inlineRadio2"></label>
        </div>
        <div class="form-check form-check-inline">
          <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio3" value="option3">
          <label class="form-check-label" for="inlineRadio3"></label>
        </div>
        <div class="form-check form-check-inline">
          <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio4" value="option4">
          <label class="form-check-label" for="inlineRadio4"></label>
        </div>
        <div class="form-check form-check-inline">
          <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio5" value="option5">
          <label class="form-check-label" for="inlineRadio5"></label>
        </div>
      </div>
    </div>


    <div class="row mt-3 justify-content-center">
      <div class="col-auto">
        <img src="../assets/images/pexels-raulling-30949011.jpg" class="img-fluid w-50 d-block mx-auto" alt="image">
      </div>
    </div>


    <div class="text-center mt-3">
      <button type="submit" class="btn btn-secondary mx-2">VÕTA VIHJE</button>
      <button @click="openModal" type="submit" class="btn btn-success mx-2">AVA KAARDIL</button>
    </div>
  </div>
</template>

<script>


import MapModal from "@/components/modal/MapModal.vue";

export default {
  gameName: 'GameView',
  components: { MapModal2: MapModal },
  data() {
    return {
      modalIsOpen: false,
      clickedLocation: null, // Initialize as null
    };
  },
  methods: {
    openModal() {
      this.modalIsOpen = true;
    },

    closeModal() {
      this.modalIsOpen = false;
    },

    handleLocationClick(location) {
      this.clickedLocation = location;
      console.log(`Chosen Location: ${location.lat}, ${location.lng}`);
    }
  }
}
</script>