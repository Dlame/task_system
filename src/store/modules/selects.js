import { getDept, getOneId, getTwoId } from '@/api/options';

const getDefaultState = () => {
  return {
    deptOptions: [],
    oneIdOptions: [],
    twoIdOptions: []
  };
};

const state = getDefaultState();

const mutations = {
  RESET_STATE: state => {
    Object.assign(state, getDefaultState());
  },
  SET_DEPT: (state, payload) => {
    state.deptOptions = payload;
  },
  SET_ONE_ID: (state, payload) => {
    state.oneIdOptions = payload;
  },
  SET_TWO_ID: (state, payload) => {
    state.twoIdOptions = payload;
  }
};

const actions = {
  getDept({ commit }) {
    getDept().then(res => {
      commit('SET_DEPT', res.data);
    });
  },
  getOneId({ commit }) {
    getOneId().then(res => {
      commit('SET_ONE_ID', res.data);
    });
  },
  getTwoId({ commit }) {
    getTwoId().then(res => {
      commit('SET_TWO_ID', res.data);
    });
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
