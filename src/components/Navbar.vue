<template>
    <div id="navbar">
        <div>
            <div class="ui secondary pointing menu">
                <a class="active item">
                    <i class="home icon"></i>
                    Home
                </a>
                <a class="item">
                    <i class="th icon"></i>
                    Disciplinas
                </a>
                <a class="item">
                    <i class="tasks icon"></i>
                    Realizar Matrícula
                </a>
                <div class="right menu">
                    <a class="ui item" @click="signOut">
                        Logout
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);
var router = new Router();

export default {
    name: 'navbar',
    data() {
        return {

        }
    },
    methods: {
        signOut() {
            var user = gapi.auth2.getAuthInstance();
            user.signOut().then(function () {
                console.log(user.currentUser.Ab.w3)
            });
        }
    }
}    
</script>

<style scoped>
</style>