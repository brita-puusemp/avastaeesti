<template>
  <h1>MINU LEMMIK KOHAD</h1>
  <div class="container text-center">
    <div class="row">
      <div class="col d-flex align-items-center justify-content-center">
        <font-awesome-icon :icon="['fas', 'angle-left']" />
      </div>
      <div class="col image-container">
        <img src="@/assets/images/pexels-raulling-30949011.jpg" alt="My Image" class="centered-image" />
      </div>
      <div class="col d-flex align-items-center justify-content-center">
        <font-awesome-icon :icon="['fas', 'angle-right']" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FavoritesView',
  data() {
    return {
      id: '',
      user_id: '',
      location_id: '',
      status: '',
      image_data: '',
    }
  },
}
</script>

<style scoped>
.image-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%; /* Ensure the container takes full width */
}

.centered-image {
  width: 100%; /* Set the image width to 70% of the container */
  height: auto; /* Maintain aspect ratio */
  max-width: 100%; /* Ensure the image doesn't exceed its container */
}
</style>
