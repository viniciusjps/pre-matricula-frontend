<template>
    <div id="footer">
        <div class="ui inverted vertical segment">
            <div class="ui center aligned container">
                <img src="http://www.dsc.ufcg.edu.br/~sacc/img/logo-topo2.png" class="ui centered small image">
                <div class="ui inverted section divider"></div>
                <div class="ui horizontal inverted small divided link list">
                    <a class="item">Link aqui</a>
                    <a class="item">Link aqui</a>
                    <a class="item">Link aqui</a>
                    <a class="item">Link aqui</a>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "footer",
    data() {
        return {

        }
    }
}

</script>
<style scoped>
.ui.inverted.vertical.segment {
    background: #cccccc
}

a.item {
    color: #000000
}
</style>