
<template>
  <select
      :value="selectedLocationId"
      @change="addLocationToGame"
      class="form-select"

  >
    <option disabled selected value=0>Kõik kohad</option>
    <option
        v-for="question in questions"
        :key="question.id"
        :value="question.id"
        :class="{ 'highlighted': selectedLocationId === question.id  }"
    >
      {{ question.locationName }}
    </option>
  </select>

</template>

<script>
export default {
  gameName: 'LocationsDropdown',
  props: {
    questions: {
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