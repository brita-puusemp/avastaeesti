<template>
  <Modal :modal-is-open="modalIsOpen" @event-close-modal="$emit('event-close-modal')">
    <template #body>
      <p>Place the pin by clicking on the map</p>
      <div
          ref="mapContainer"
          class="map-container"
          :style="{ width: width || '90%', height: height || '400px' }"
      ></div>
    </template>
    <template #footer>
      <router-link to="/game" @click.native="$emit('event-close-modal')">Tagasi pildile</router-link>
      <button @click="executeAnswering" type="submit" class="btn btn-success ms-5">KINNITA</button>
    </template>
  </Modal>
</template>

<script>
import Modal from "@/components/modal/Modal.vue";
import L from 'leaflet'
import axios from "axios";
import GameService from "@/service/GameService";

//marker fixed
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});


export default {
  name: 'MapModal2',
  components: {Modal},
  props: {
   /* locationId: Number,
    randomGameId: Number,*/
    modalIsOpen: Boolean,
    center: {type: Array, default: () => [58.909184655697715, 25.455322265625004]},
    zoom: {type: Number, default: 7},

  },
  data() {
    return {
      map: null,
      marker: null, // Store reference to the marker
      clickedLocation: {}
    }
  },
  watch: {
    modalIsOpen(newValue) {
      if (newValue) {
        this.$nextTick(() => {
          this.initializeMap();
        });
      }
    },
  },
  methods: {
    initializeMap() {
      if (this.map) {
        this.map.remove(); // Remove previous map instance if it exists
      }

      this.map = L.map(this.$refs.mapContainer).setView(this.center, this.zoom);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19
      }).addTo(this.map);


      this.addMapClickListener(); // Attach click event listener
    },

    /*addCircleMarker() {
      if (!this.map) return;

      L.circle([58.2806, 25.4856], {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.5,
        radius: 10000
      }).addTo(this.map);
    },*/

    addMapClickListener() {
      if (!this.map) return;

      this.map.on('click', (event) => {
        const {lat, lng} = event.latlng;
        this.clickedLocation = {lat, lng};


        // Remove previous marker if it exists
        if (this.marker) {
          this.map.removeLayer(this.marker);
        }

        // Add new marker
        this.marker = L.marker([lat, lng]).addTo(this.map);
        this.$emit('location-clicked', {lat, lng});
      });
    },

    executeAnswering() {
      if (this.clickedLocation) {
        this.$emit('event-execute-answering', this.clickedLocation); // Saadab koordinaadid tagasi
        this.$emit('event-close-modal')
      } else {
        alert("Palun valige koht kaardil!");
      }

    },
  }
}
</script>

<style scoped>
.map-container {
  position: relative;
  width: 100%;
  height: 500px;
}
</style>
