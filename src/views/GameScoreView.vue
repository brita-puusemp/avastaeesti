<template>
  <div class="container text-center">
    <div class="row">
      <div class="col">
        <h3>TOP SKOORID</h3>
        <font-awesome-icon :icon="['fas', 'trophy']" />

      </div>
    </div>
  </div>
</template>

<script>
import {useRoute} from "vue-router";

export default {
  name: 'GameScoreView',
  data() {
    return {
      userId: sessionStorage.getItem('userId'),
      randomGameId: Number(useRoute().query.randomGameId)
    }}
}
</script>