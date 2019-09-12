import { login, logout } from '../../services/auth'

const state = {
    user: null
}

const mutations = {
    setUser(state, user) {
        state.user = user
    }
}

const actions = {
    login({ commit }) {
        login().then(res => {
            if(res.success) {
                localStorage.setItem('kanbanUserUid', res.data.uid)
                commit('setUser', res.data.uid)
            }
        })   
    },

    logout({ commit }) {
        logout().then(() => {
            localStorage.removeItem('kanbanUserUid')
            commit('setUser', null)
        })
    }
}

const getters = {
    isLoggedIn: state => state.user !== null,
    user: state => state.user
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}