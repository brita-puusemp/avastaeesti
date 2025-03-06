
<template>
  <select
      :value="selectedLocationsId"
      @change="addLocationToGame"
      class="form-select"
      multiple

  >
    <option disabled selected value=0>Kõik kohad</option>
    <option
        v-for="question in questions"
        :key="question.id"
        :value="question.id"
        :class="{ 'highlighted': selectedLocationsId.includes(question.id) }"
    >
      {{ question.locationName }}
    </option>
  </select>

</template>:key="question.questionId"

<script>
export default {
  name: 'LocationsDropdown',
  props: {
    questions: {
      type: Array,
      required: true
    },
    selectedLocationsId: { // Muuda tüübiks Array
      type: Array,
      default: () => []
    }
  },
  methods: {
    addLocationToGame(event) {
      // Teisenda valitud ID-d numbriteks ja filtreeri kehtetud väärtused
      const selectedValues = Array.from(event.target.selectedOptions, option => {
        const value = Number(option.value);
        return isNaN(value) ? null : value;
      }).filter(value => value !== null);
      console.log("Dropdowni valikud:", selectedValues); // Kontrolli, kas ID-d on õiged
      this.$emit('event-new-location-selected', selectedValues); // Saada massiiv
    }
  }
}
</script>
    <style scoped>
      .highlighted {
        background-color: #f0f8ff; /* Hele sinine taust */
        font-weight: bold; /* Rasvane tekst */
      }
    </style>