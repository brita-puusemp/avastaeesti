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
  </Modal>
</template>

<script>
import Modal from "@/components/modal/Modal.vue";
import L from 'leaflet'

//marker fixed
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});


export default {
  gameName: 'MapModal',
  components: { Modal },
  props: {
    modalIsOpen: Boolean,
    center: { type: Array, default: () => [58.2806, 25.4856] },
    zoom: { type: Number, default: 7.4 },
    clickedLocation: {}
  },
  data() {
    return {
      map: null,
      marker: null,
    };
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
        this.map.remove();
      }

      this.map = L.map(this.$refs.mapContainer).setView(this.center, this.zoom);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19
      }).addTo(this.map);

      this.addCircleMarker();
      this.addMapClickListener(); // Attach click event listener
    },

     // This circle method can be used to visualize the distance of the radius
    addCircleMarker() {
      if (!this.map) return;

      L.circle([58.2806, 25.4856], {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.5,
        radius: 10000
      }).addTo(this.map);
    },

    addMapClickListener() {
      if (!this.map) return;

      this.map.on('click', (event) => {
        const { lat, lng } = event.latlng;

        if (this.marker) {
          this.map.removeLayer(this.marker);
        }

        this.marker = L.marker([lat, lng]).addTo(this.map);
        this.$emit('location-clicked', { lat, lng });
      });
    }
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
