
<template>
  <select
      :value="selectedLocationId"
      @change="addLocationToGame"
      class="form-select"

  >
    <option disabled selected value=0>Kõik kohad</option>
    <option
        v-for="location in locations"
        :key="location.locationId"
        :value="location.locationId"
        :class="{ 'highlighted': selectedLocationId === location.locationId  }"
    >
      {{ location.locationName }}
    </option>
  </select>

</template>

<script>
export default {
  name: 'LocationsDropdown',
  props: {
    locations: {
      type: Array,
      required: true
    },
    selectedLocationId: {
      type: Number,
      default: 0
    }
  },
  methods: {
    addLocationToGame(event) {
      this.$emit('event-new-location-selected', Number(event.target.value));
    }
  }
}
</script>
    <style scoped>
      .highlighted {
        background-color: lightskyblue; /* Hele sinine taust */
        font-weight: bold; /* Rasvane tekst */
      }
    </style>