import Cookies from 'js-cookie';

const state = {
  sidebar: {
    opened: Cookies.get('sidebarStatus')
      ? !!+Cookies.get('sidebarStatus')
      : true,
    withoutAnimation: false
  },
  device: 'desktop',
  keepAliveComponents: [] // 缓存的路由
};

const mutations = {
  TOGGLE_SIDEBAR: state => {
    state.sidebar.opened = !state.sidebar.opened;
    state.sidebar.withoutAnimation = false;
    if (state.sidebar.opened) {
      Cookies.set('sidebarStatus', 1);
    } else {
      Cookies.set('sidebarStatus', 0);
    }
  },
  CLOSE_SIDEBAR: (state, withoutAnimation) => {
    Cookies.set('sidebarStatus', 0);
    state.sidebar.opened = false;
    state.sidebar.withoutAnimation = withoutAnimation;
  },
  TOGGLE_DEVICE: (state, device) => {
    state.device = device;
  },
  // 需要缓存
  keepAlive(state, component) {
    // 注：防止重复添加（当然也可以使用Set）
    !state.keepAliveComponents.includes(component) &&
      state.keepAliveComponents.push(component);
  },
  // 不需要缓存
  noKeepAlive(state, component) {
    const index = state.keepAliveComponents.indexOf(component);
    index !== -1 && state.keepAliveComponents.splice(index, 1);
  }
};

const actions = {
  toggleSideBar({ commit }) {
    commit('TOGGLE_SIDEBAR');
  },
  closeSideBar({ commit }, { withoutAnimation }) {
    commit('CLOSE_SIDEBAR', withoutAnimation);
  },
  toggleDevice({ commit }, device) {
    commit('TOGGLE_DEVICE', device);
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
