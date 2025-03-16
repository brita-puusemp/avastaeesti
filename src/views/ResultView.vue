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
      <div class="col col-8">
        <AlertDanger :message="message"/>
        <span class="d-block mb-3">
          <font-awesome-icon
              :icon="isActive ? ['fas', 'star'] : ['far', 'star']"
              @click="handleStarClick"
              style="cursor: pointer;"
          />
          {{ buttonText }}
        </span>
        <button @click="checkWhichGameIsUserPlaying" type="submit" class="btn btn-success mx-2">JÄRGMINE</button>
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
import FavouriteService from "@/service/FavouriteService";
import AlertDanger from "@/components/alert/AlertDanger.vue";

export default {
  name: 'ResultView',
  components: {AlertDanger, ResultWrong, ResultCorrect},
  data() {
    return {
      message: '',
      isActive: false,
      buttonText: 'Lisa lemmikutesse',
      userAnswerResult: {
        locationId: this.$route.query.locationId,
        locationName: this.$route.query.locationName,
        locationIsCorrect: this.$route.query.locationIsCorrect === 'true',
        totalQuestions: this.$route.query.totalQuestions,
        questionsAnswered: this.$route.query.questionsAnswered,
      },
      randomGameId: Number(useRoute().query.randomGameId),
      userGameId: Number(useRoute().query.userGameId),
      userId: sessionStorage.getItem('userId')


    }
  },
  methods: {

    handleStarClick() {
      this.addToFavorites();
      this.toggleIcon();
    },

    handleAddUserFavoritesErrorResponse(error) {
      this.message = error.response.data.message;
      setTimeout(this.resetAlertMessage, 4000);
    },

    resetAlertMessage() {
      this.message = ''
    },

    addToFavorites() {
      FavouriteService.sendPostUserFavoritesRequest(this.userId, this.userAnswerResult.locationId)
          .then(response => this.someDataBlockResponseObject = response.data)
          .catch(error => this.handleAddUserFavoritesErrorResponse(error))
    },

    toggleIcon() {
      this.isActive = true;
      if (this.isActive) {this.buttonText = 'Lisatud lemmikutesse'
      }

      sessionStorage.setItem('isStarActive', this.isActive);
      sessionStorage.setItem('buttonText', this.buttonText);
    },

    checkWhichGameIsUserPlaying() {
      if (this.randomGameId) {
        this.checkIfGameIsCompleteOrGoToNextRandomLocation();
      } else {
        this.checkIfGameIsCompleteOrGoToNextUserGameLocation()
      }
    },

    checkIfGameIsCompleteOrGoToNextRandomLocation() {
      if (this.userAnswerResult.questionsAnswered === this.userAnswerResult.totalQuestions) {
        NavigationService.navigateToGameOverView(this.randomGameId)
      } else {
        NavigationService.navigateToGameView(this.randomGameId)
      }
    },

    checkIfGameIsCompleteOrGoToNextUserGameLocation() {
      if (this.userAnswerResult.questionsAnswered === this.userAnswerResult.totalQuestions) {
        NavigationService.navigateToGameScoreView(this.userGameId)
      } else {
        NavigationService.navigateToUserGameView(this.userGameId)
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

  beforeRouteLeave(to, from, next) {
    // Eemalda isStarActive ja buttonText sessionStorage-st
    sessionStorage.removeItem('isStarActive');
    sessionStorage.removeItem('buttonText');
    next(); // Jätka navigeerimist
  }
}
</script>



