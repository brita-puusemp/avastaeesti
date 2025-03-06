
<template>
  <select :value="selectedLocationId"  @click="addLocationToGame" class="form-select">
    <option selected value=0>Kõik kohad</option>
    <option v-for="question in questions" :value="question.questionId">{{question.locationName}}</option>
  </select>

</template>

<script>
export default {
  name: 'LocationsDropdown',
  props: {
    questions: {},
    selectedLocationId: {
      type: Number,
      default: 0
    }

  },
  methods: {
    addLocationToGame(event) {
      this.$emit('event-new-location-selected', Number(event.target.value))
    },
  }
}
</script>
