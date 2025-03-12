<template>
<result-correct
    v-if="userAnswerResult.locationIsCorrect"
    :locationName="userAnswerResult.locationName"
/>

<result-wrong
    v-else
    :locationName="userAnswerResult.locationName"
/>
  <div class="container text-center">
    <div class="row">
      <div class="col">
        <button @click="nextQuestion" type="submit" class="btn btn-success mx-2">JÄRGMINE</button>
      </div>
    </div>
  </div>

</template>

<script>
import {useRoute} from "vue-router";
import {isFlat} from "leaflet/src/geometry/LineUtil";
import ResultCorrect from "@/components/results/ResultCorrect.vue";
import ResultWrong from "@/components/results/ResultWrong.vue";
import NavigationService from "@/service/NavigationService";

export default {
  name: 'ResultView',
  components: {ResultWrong, ResultCorrect},
  data() {
    return {
      userAnswerResult: {
        locationName: this.$route.query.locationName,
        locationIsCorrect: this.$route.query.locationIsCorrect === 'true',
        totalQuestions: this.$route.query.totalQuestions,
        questionsAnswered: this.$route.query.questionsAnswered,
        randomGameId: this.$route.query.randomGameId
      }
    }
  },
  methods: {
    nextQuestion() {
      let randomGameId = this.userAnswerResult.randomGameId
      NavigationService.navigateToGameView(randomGameId)
    },
  }
}
</script>



