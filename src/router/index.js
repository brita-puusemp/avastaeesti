import {createRouter, createWebHashHistory} from 'vue-router'
import LoginView from "@/views/LoginView.vue";
import UserHomeView from "@/views/UserHomeView.vue";
import ErrorView from "@/views/ErrorView.vue";
import RegisterView from "@/views/RegisterView.vue";
import GameView from "@/views/GameView.vue";
import LocationView from "@/views/LocationView.vue";
import AdminHomeView from "@/views/AdminHomeView.vue";
import NewGameView from "@/views/NewGameView.vue";
import GameQuestionsView from "@/views/GameQuestionsView.vue";
import AllGamesView from "@/views/AllGamesView.vue";
import ResultView from "@/views/ResultView.vue";
import FavoritesView from "@/views/FavoritesView.vue";

const routes = [
    {
        path: '/',
        name: 'loginRoute',
        component: LoginView
    },
    {
        path: '/home',
        name: 'userHomeRoute',
        component: UserHomeView
    },
    {
        path: '/error',
        name: 'errorRoute',
        component: ErrorView
    },
    {
        path: '/register',
        name: 'registerRoute',
        component: RegisterView
    },
    {
        path: '/location',
        name: 'locationRoute',
        component: LocationView
    },
    {
        path: '/home-admin',
        name: 'adminHomeRoute',
        component: AdminHomeView
    },
    {
        path: '/game',
        name: 'gameRoute',
        component: GameView
    },
    {
        path: '/game-new',
        name: 'newGameRoute',
        component: NewGameView
    },
    {
        path: '/game-question',
        name: 'gameQuestionsRoute',
        component: GameQuestionsView
    },
    {
        path: '/games',
        name: 'allGamesRoute',
        component: AllGamesView
    },
    {
        path: '/game-results',
        name: 'gameResultsRoute',
        component: ResultView
    },
    {
        path: '/favorites',
        name: 'favoritesRoute',
        component: FavoritesView
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router
