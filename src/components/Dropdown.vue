<template>
    <div id="dropdown">
        <sui-dropdown class="ui selection dropdown" placeholder="Opções">
            <sui-dropdown-menu>
                <sui-dropdown-item>Editar</sui-dropdown-item>
                <sui-dropdown-item>Cadastrar</sui-dropdown-item>
                <sui-dropdown-item>Apagar</sui-dropdown-item>
            </sui-dropdown-menu>
        </sui-dropdown>
        <button class="ui olive button">Adicionar</button>
        <button class="ui red button">Apagar</button>
        
<sui-dropdown
    placeholder="Gender"
    selection
    :options="options"
    v-model="current"
  />
    </div>
</template>
<script>
export default {
    name: 'dropdown',
    data () {

     return {
      current: null,
      options: [
       {
        text: 'Male',
        value: 1,
      }, {
        text: 'Female',
        value: 2,
      }
      ],
    }
    }
}
</script>