<template>
  <div id="app">
    <loading-overlay :loading.sync="loading"></loading-overlay>

    <button v-if="!user" class="login-button p-a-20 w-100" @click="login"> Entrar </button>

    <transition v-else name="fade" mode="out-in">
        <router-view/>
    </transition>

    <button v-if="user" class="logout-button" @click="logout"> <i class="fa fa-sign-out"></i> </button>
  </div>
</template>

<script>
  import { mapActions, mapGetters, mapMutations } from 'vuex'

  export default {
    name: 'app',
    computed: {
      ...mapGetters('app', [
        'loading'
      ]),
      ...mapGetters('auth', [
        'user'
      ])
    },
    mounted() {
      this.setUser(localStorage.getItem('kanbanUserUid'))
      // this.$auth.onAuthStateChanged(user)
    },
    methods: {
      ...mapActions('auth', [
        'login', 'logout'
      ]),
      ...mapMutations('auth', [
        'setUser'
      ])
    }
  }
</script>

<style lang="stylus">
    @import './assets/styles/app'

    .login-button
      border: 0
      font-size: 20px
      color: white
      background-color: #009fff

      &:hover
        cursor: pointer
      &:focus
        outline: none

    .logout-button
      position: fixed
      border: 0
      height: 50px
      width: 50px
      bottom: 5px
      right: 5px
      border-radius: 50%
      background-color: #009fff
      color: white
      font-size: 16px

      &:hover
        cursor: pointer
        background-color: #77ccff

      &:focus
        outline: none
</style>
