import Vue from 'vue';
import Vuex from 'vuex';
import getters from './getters';
import app from './modules/app';
import settings from './modules/settings';
import user from './modules/user';
import selects from './modules/selects';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    app,
    settings,
    user,
    selects
  },
  getters,
  plugins: [
    createPersistedState({
      storage: window.sessionStorage,
      reducer(state, paths) {
        return {
          // 只储存state中的部分数据
          user: state.user,
          selects: state.selects
        };
      }
    })
  ]
});

export default store;
