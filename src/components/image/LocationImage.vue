<template>
  <div>
    <img v-if="imageData.length === 0" src="../../assets/images/defaultImage.jpg" class="img-thumbnail" alt="Asukoha pilt">
    <img v-else :src="imageData" class="img-thumbnail" alt="Asukoha pilt">
  </div>
</template>
<script>
export default {
  name: 'LocationImage',
  props: {
    imageData: String
  }
}
</script>