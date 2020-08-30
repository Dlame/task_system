const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  deptOptions: state => state.selects.deptOptions,
  oneIdOptions: state => state.selects.oneIdOptions,
  twoIdOptions: state => state.selects.twoIdOptions
};
export default getters;
