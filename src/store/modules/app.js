const state = {
    loading: false,
    isDark: false
}

const mutations = {
    loading(state, loading) {
        state.loading = loading
    },
    theme(state, isDark) {
        state.isDark = isDark
    }
}

const actions = {
}

const getters = {
    loading: state => state.loading,
    isDark: state => state.isDark,
    theme: state => state.isDark ? 'dark' : 'light',
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}