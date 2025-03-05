import {createRouter, createWebHashHistory} from 'vue-router'
import LoginView from "@/views/LoginView.vue";
import UserHomeView from "@/views/UserHomeView.vue";
import ErrorView from "@/views/ErrorView.vue";
import RegisterView from "@/views/RegisterView.vue";
import GameView from "@/views/GameView.vue";
import NewLocationView from "@/views/NewLocationView.vue";
import AdminHomeView from "@/views/AdminHomeView.vue";

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
        name: 'newLocationRoute',
        component: NewLocationView
    },
    {
        path: '/home-admin',
        name: 'adminHomeRoute',
        component: AdminHomeView
    },
    {
        path: '/game',
        name: 'game',
        component: GameView
    }

]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router
