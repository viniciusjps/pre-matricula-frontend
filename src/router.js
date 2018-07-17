import Vue from 'vue'
import Router from 'vue-router'
import Home from './components/Home.vue'
import Navbar from './components/Navbar.vue'
import Login from './components/Login.vue'

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'login',
            component: Login
        },
        {
            path: '/home',
            name: 'home',
            component: Home
        }
    ]
})