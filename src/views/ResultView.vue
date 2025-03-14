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
        <span class="d-block mb-3">
          <font-awesome-icon
              :icon="isActive ? ['fas', 'star'] : ['far', 'star']"
              @click="toggleIcon"
              style="cursor: pointer;"
          />
          {{ buttonText }}
        </span>
        <button @click="checkIfGameIsCompleteOrGoToNextQuestion" type="submit" class="btn btn-success mx-2">JÄRGMINE</button>
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
      isActive: false,
      buttonText: 'Lisa lemmikutesse',
      userAnswerResult: {
        locationId: this.$route.query.locationId,
        locationName: this.$route.query.locationName,
        locationIsCorrect: this.$route.query.locationIsCorrect === 'true',
        totalQuestions: this.$route.query.totalQuestions,
        questionsAnswered: this.$route.query.questionsAnswered,
      },
      randomGameId: this.$route.query.randomGameId,


    }
  },
  methods: {

    toggleIcon() {
      this.isActive = true;
      if (this.isActive) {this.buttonText = 'Lisatud lemmikutesse'
      }

      sessionStorage.setItem('isStarActive', this.isActive);
      sessionStorage.setItem('buttonText', this.buttonText);
    },

    checkIfGameIsCompleteOrGoToNextQuestion() {
      if (this.userAnswerResult.questionsAnswered === this.userAnswerResult.totalQuestions) {
        NavigationService.navigateToGameOverView(this.randomGameId)
      } else {
        NavigationService.navigateToGameView(this.randomGameId)
      }
    },

  },

  mounted() {
    const savedState = sessionStorage.getItem('isStarActive');
    const savedText = sessionStorage.getItem('buttonText');
    if (savedState !== null) {
      this.isActive = savedState
      this.buttonText = savedText

    }
  },
}
</script>



