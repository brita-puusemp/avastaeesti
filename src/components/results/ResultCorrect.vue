<template>
  <div class="container text-center correct-answer-container">
    <div class="row">
      <div class="col">
        <h3>ÕIGE VASTUS!</h3>
        <h5>See oli {{ locationName }}</h5>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: 'ResultCorrect',
  props: {
    locationName: String
  }

}
</script>

<style scoped>
.correct-answer-container {
  background-color: #d4edda; /* Hele roheline taust */
  border: 1px solid #c3e6cb; /* Roheline piir */
  border-radius: 8px; /* Ümardatud nurgad */
  padding: 20px; /* Sisemine polster */
  margin: 20px auto; /* Välised marginaalid */
  max-width: 600px; /* Maksimaalne laius */
}
</style>