import Vue from 'vue'
import Vuex from 'vuex'
import CreatePersistedState from 'vuex-persistedstate'
Vue.use(Vuex)

export default new Vuex.Store({
    plugins:[CreatePersistedState({
        storage:window.sessionStorage
    })],
    state:{
        userinfo:null
    },
    mutations:{
        setUserInfo(state,data){
            state.userinfo = data;
        }
    }
})