<template>
    <div id="app">
        <PowerLine/>
    </div>
</template>

<script>
    import PowerLine from './components/PowerLine.vue'

    export default {
        name: 'App',
        components: {
            PowerLine
        }
    }
</script>

<style>
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
    }
</style>
