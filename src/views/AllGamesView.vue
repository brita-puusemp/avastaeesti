<template>

    <div class="row mt-4 justify-content-center">
      <div class="col col-10">
    <GamesTable :all-games="allGames" />


  </div></div>

</template>


<script>
import GamesTable from "@/components/game/GamesTable.vue";
import GameService from "@/service/GameService";

export default {
  name: 'AllGamesView',
  components: {GamesTable},
  data() {
    return  {
      allGames: [{
        gameId: 0,
        gameName: '',
        gameDescription: '',
        totalTopScore: 0
      }]
    }
  },

  methods: {

    handleGetGamesResponse(response) {
      return this.allGames = response.data;
    },



    getGames() {
      GameService.sendGetGamesRequest()
          .then(response => this.handleGetGamesResponse(response))
          .catch(error => this.someDataBlockErrorResponseObject = error.response.data);
    },


  },

  beforeMount() {
    this.getGames();
  }

}
</script>



