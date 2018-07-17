<template>
    <div id="navbar">
        <div>
            <div class="ui secondary pointing menu">
                <a class="active item">
                    <i class="home icon"></i> Home
                </a>
                <a class="item">
                    <i class="mail icon"></i> Messages
                </a>
                <a class="item">
                    <i class="user icon"></i> Friends
                </a>
                <div class="right menu">
                    <div class="item">
                        <div class="ui transparent icon input">
                            <input type="text" placeholder="Search...">
                            <i class="search link icon"></i>
                        </div>
                    </div>
                    <a class="ui item">
                    Logout
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'navbar',
    data() {
        return {

        }
    }
}    
</script>

<style scoped>
    
</style>