import Router from "@/router"

const store = {
    namespaced: 'authentication',
    state: {
        user: {},
    },
    mutations: {
        SET_USER(state, user) {
            state.user = user
        }
    },
    actions: {
        async requestUser({commit}) {
            const user = new Promise(resolve => {
                setTimeout(() => {
                    const data = {
                        name: "Alex",
                        age: 25
                    }
                    resolve(data)
                }, 800)        
            })

            Router.push('/login')
            commit('SET_USER', await user)
        },
        async requestLogin({commit}, {email}) {
            const data = {
                email,
                name: "Alex",
            }

            commit('SET_USER', data)
            Router.push('/')
        },
        isAuthenticated({ state }) {
            return Boolean(Object.entries(state.user || {}).length)
        }
    }
}


export default store