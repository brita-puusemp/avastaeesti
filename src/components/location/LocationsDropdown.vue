
<template>
  <select : class="form-select">
    <option selected value=0>Kõik kohad</option>
    <option v-for="question in questions" :value="question.questionId">{{question.locationName}}</option>
  </select>

</template>

<script>
export default {
  name: 'LocationsDropdown',
  props: {
    questions: {}
  }
}
</script>
