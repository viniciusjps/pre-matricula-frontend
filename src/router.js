import Vue from 'vue'
import Router from 'vue-router'
import Home from './components/Home.vue'
import Navbar from './components/Navbar.vue'
import Login from './components/Login.vue'
import Register from './components/Register.vue'
import registerCurricularComponent from './components/RegisterCurricularComponent.vue'
import notFound from './components/NotFound.vue'
import Disciplines from './components/Disciplines.vue'
import ConsultEnrollment from './components/ConsultEnrollment.vue'

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
        },
        {
            path: '/register',
            name: 'register',
            component: Register
        },
        {
            path: '/404',
            name: 'notFound',
            component: notFound
        },
        {
            path: '/disciplinas',
            name: 'disciplines',
            component: Disciplines
        },
        {
            path: '/register/curricularComponent',
            name: 'registerCurricularComponent',
            component: registerCurricularComponent
        },
        {
            path: '/curricularComponent',
            name: 'consultenrollment',
            component: ConsultEnrollment
        }
    ]
})
