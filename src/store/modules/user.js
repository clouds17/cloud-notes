import Auth from '@/api/auth.js';
export default {
    state: {
        user: null
    },
    getters: {
        username: state => state.user === null ? '未登录' : state.user.username,

        slug: state => state.user === null ? '未' : state.user.username.charAt(0)
    },
    mutations: {
        setUser(state, payload) {
            state.user = payload.user
        }
    },
    actions: {
        logout_actions({ commit }) {
            return Auth.hx_logout()
                .then(res => {
                    commit('setUser', { user: null })
                })
        },
        login_actions({ commit }, { username, password }) {
            return new Promise((resolve, reject) => {
                Auth.hx_login({ username, password })
                    .then(res => {
                        commit('setUser', { user: res.data })
                        resolve(res)
                    }).catch(err => {
                        reject(err)
                    })
            })
            
        },
        register_actions({ commit }, { username, password }) {
            return new Promise((resolve, reject) => {
                Auth.hx_register({ username, password })
                    .then(res => {
                        commit('setUser', { user: res.data })
                        resolve(res)
                    }).catch(err => {
                        reject(err)
                    })
            })
        },
        checkLogin_actions({ commit }) {
            return new Promise((resolve, reject) => {
                Auth.hx_getInfo().then(res => {
                    if (res.isLogin) {
                        commit('setUser', {user: res.data})
                    }
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
            
        }
    }
}