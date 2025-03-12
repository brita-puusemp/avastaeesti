<template>
  <div class="container text-center">
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


