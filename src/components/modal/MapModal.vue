<template>
  <Modal :modal-is-open="modalIsOpen" @event-close-modal="$emit('event-close-modal')">
    <div
        ref="mapContainer"
        class="map-container"
        :style="{ width: '100%', height: '500px' }"
    ></div>
  </Modal>
</template>

<script>
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'
import Modal from "@/components/modal/Modal.vue";
import { nextTick } from 'vue';

export default {
  name: 'MapModal',
  components: { Modal },
  props: {
    modalIsOpen: Boolean,
    center: { type: Array, default: () => [0, 0] },
    zoom: { type: Number, default: 0 },
    markers: {
      type: Array,
      default: () => []
    },
    width: { type: String, default: '' },
    height: { type: String, default: '' }
  },
  methods: {
    initializeMap() {
      console.log(this.$refs.mapContainer); // Check if the mapContainer is defined
      if (this.$refs.mapContainer) {
        this.map = L.map(this.$refs.mapContainer).setView(this.center, this.zoom);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 19
        }).addTo(this.map);
        this.addMarkers();
      } else {
        console.error("Map container not found!");
      }
    },

    addMarkers() {
      console.log("Adding markers");
      const customIcon = L.icon({
        iconUrl: markerIcon,
        shadowUrl: markerShadow,
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
      });

      for (const marker of this.markers) {
        if (marker.latitude === 0 && marker.longitude === 0) continue;
        L.marker([marker.latitude, marker.longitude], { icon: customIcon })
            .addTo(this.map);
      }
      console.log('Marker icon URL:', markerIcon);
      console.log('Marker shadow URL:', markerShadow);
    }
  },
  watch: {
    modalIsOpen(newVal) {
      // Only initialize the map when the modal is open
      if (newVal) {
        nextTick(() => {
          this.initializeMap();
        });
      } else {
        // Optionally clean up the map when the modal closes
        if (this.map) {
          this.map.remove();
        }
      }
    },
    markers() {
      if (this.map) {
        this.addMarkers();  // Re-add markers when markers array changes
      }
    }
  },
  mounted() {
    // Map will be initialized only when modalIsOpen becomes true
  }
};
</script>
