<template>
    <div id="register" class="ui middle aligned center aligned grid">
        <div ref="signinBtn" class="btn-sign-in"><img src="https://developers.google.com/identity/images/btn_google_signin_dark_normal_web.png" alt=""></div>
    </div>
</template>


<script>
export default {
    name: 'g-signin-button',
    data () {
        return {};
    },
    mounted () {
        window.gapi.load('auth2', () => {
        const auth2 = window.gapi.auth2.init({
            client_id: '425992078532-o6usuafa3rganc10vkkae4oe4othp51j.apps.googleusercontent.com',
            cookiepolicy: 'single_host_origin'
        })
        auth2.attachClickHandler(this.$refs.signinBtn, {}, googleUser => {
            this.$emit('done', googleUser)
        }, error => console.log(error))
        })
    },
}
</script>

<style>
.btn-sign-in {
  cursor: pointer;
}
</style>
