import Vue from "vue";
import Router from "vue-router";
import Home from "./components/Home.vue";
import Login from "./components/Login.vue";
import Register from "./components/Register.vue";
import registerCurricularComponent from "./components/RegisterCurricularComponent.vue";
import notFound from "./components/NotFound.vue";
import Disciplines from "./components/Disciplines.vue";
import HomeAdmin from "./components/HomeAdmin.vue";
import DisciplinesAdmin from "./components/DisciplinesAdmin.vue";
import LoginAdmin from "./components/LoginAdmin.vue";

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: "/",
            name: "login",
            component: Login
        },
        {
            path: "/admin/login",
            name: "loginAdmin",
            component: LoginAdmin
        },
        {
            path: "/home",
            name: "home",
            component: Home
        },
        {
            path: "/register",
            name: "register",
            component: Register
        },
        {
            path: "/404",
            name: "notFound",
            component: notFound
        },
        {
            path: "/disciplinas",
            name: "disciplines",
            component: Disciplines
        },
        {
            path: "/admin/disciplines",
            name: "disciplinesadmin",
            component: DisciplinesAdmin
        },
        {
            path: "/admin/register/curricularcomponent",
            name: "registerCurricularComponent",
            component: registerCurricularComponent
        },
        {
            path: "/admin",
            name: "homeadmin",
            component: HomeAdmin
        }
    ]
});
