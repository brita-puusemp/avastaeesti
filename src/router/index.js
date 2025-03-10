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
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router
