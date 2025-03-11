<template>
  <div>

  <table class="table">
    <thead>
    <tr>
      <th scope="col">Järjekorranumber</th>
      <th scope="col">Mängu nimi</th>
      <th scope="col">Mängu kirjeldus</th>
      <th scope="col">Top skoor</th>
      <th scope="col">Mängima</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="(allGames, index) in allGames" :key="allGames.gameId">
      <td>{{ index + 1 }}</td>
      <td>{{ allGames.gameName }}</td>
      <td>{{ allGames.gameDescription }}</td>
      <td>{{ allGames.totalTopScore }}</td>
      <td>
        <font-awesome-icon :icon="['fas', 'play']" @click="NavigationService.navigateToGameView(allGames.gameId)"
                           class="cursor-pointer me-3"/>
      </td>
    </tr>
    </tbody>
  </table>
  </div>
</template>

<script>
import NavigationService from "@/service/NavigationService";

export default {
  name: 'GamesTable',
  computed: {
    NavigationService() {
      return NavigationService
    }
  },
  props: {
    allGames: [{}]
  }

}
</script>


