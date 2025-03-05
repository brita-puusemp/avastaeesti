import {createRouter, createWebHashHistory} from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from "@/views/LoginView.vue";
import UserHomeView from "@/views/UserHomeView.vue";
import ErrorView from "@/views/ErrorView.vue";
import RegisterView from "@/views/RegisterView.vue";
import NewLocationView from "@/views/NewLocationView.vue";
import AdminHomeView from "@/views/AdminHomeView.vue";

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomeView
    },
    {
        path: '/login',
        name: 'login',
        component: LoginView
    },
    {
        path: '/home',
        name: 'userHome',
        component: UserHomeView
    },
    {
        path: '/error',
        name: 'error',
        component: ErrorView
    },
    {
        path: '/register',
        name: 'register',
        component: RegisterView
    },
    {
        path: '/newLocation',
        name: 'newLocation',
        component: NewLocationView
    },
    {
        path: '/adminHome',
        name: 'adminHome',
        component: AdminHomeView
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router
