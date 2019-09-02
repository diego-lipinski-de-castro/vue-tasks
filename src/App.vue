<template>
  <div id="app">
    <loading-overlay :loading.sync="loading"></loading-overlay>

    <transition name="fade" mode="out-in">
        <router-view/>
    </transition>
  </div>
</template>

<script>
  import { mapMutations, mapGetters } from 'vuex'

  export default {
    name: 'app',
    computed: {
      ...mapGetters('app', [
        'loading'
      ])
    }
  }
</script>

<style lang="stylus">
  @import './assets/styles/app'
</style>
