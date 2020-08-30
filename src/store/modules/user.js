import { login } from '@/api/user';
import { resetRouter } from '@/router';

const getDefaultState = () => {
  return {
    token: '',
    name: '',
    avatar: ''
  };
};

const state = getDefaultState();

const mutations = {
  RESET_STATE: state => {
    Object.assign(state, getDefaultState());
  },
  SET_TOKEN: (state, token) => {
    state.token = token;
  },
  SET_NAME: (state, name) => {
    state.name = name;
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar;
  }
};

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, pwd } = userInfo;
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), pwd: pwd })
        .then(response => {
          commit('SET_TOKEN', response.data);
          resolve();
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {});
  },

  // user logout
  logout({ commit, state }) {
    commit('RESET_STATE');
    resetRouter();
    // return new Promise((resolve, reject) => {
    //   logout(state.token)
    //     .then(() => {
    //       resetRouter();
    //       commit('RESET_STATE');
    //       resolve();
    //     })
    //     .catch(error => {
    //       reject(error);
    //     });
    // });
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('RESET_STATE');
      resolve();
    });
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
