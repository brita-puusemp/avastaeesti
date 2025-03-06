<template>
  <div
      ref="mapContainer"
      class="map-container"
      :style="{ width: width || '60%', height: height || '600 px' }"
  ></div>
</template>

<script>
import L from 'leaflet'


export default {
  props: {
    center: { type: Array, default: () => [58.2806, 25.4856] },
    zoom: { type: Number, default: 7.4 },
    markers: {


    },

  },
  methods: {
    initializeMap() {
      this.map = L.map(this.$refs.mapContainer).setView(this.center, this.zoom)

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19
      }).addTo(this.map)

      this.addCircleMarker();
    },

    addCircleMarker() {
      if (!this.map) return;

      L.circle([58.2806, 25.4856], { // Paide, Estonia
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.5,
        radius: 10000
      }).addTo(this.map);
    }
  },


  mounted() {
    this.initializeMap()
  },


}
</script>

<style scoped>
.map-container {
  position: relative;
  width: 100%;
  height: 500px;
}
</style>
