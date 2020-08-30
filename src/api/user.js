import request from '@/utils/request';

// export function login(data) {
//   return request({
//     url: '/vue-admin-template/user/login',
//     method: 'post',
//     data
//   });
// }

export function login(params) {
  return request.post('/user/login', params);
}

export function changePwd(params) {
  return request.post('/adm/center/changePwd', params);
}

export function getUserList(params) {
  return request.post('/adm/user/getList', params);
}

export function getUserDetail(userId) {
  return request.get(`/adm/user/getObject/${userId}`);
}

export function addUser(params) {
  return request.post('/adm/user/add', params);
}

export function editUser(params) {
  return request.post('/adm/user/edit', params);
}

export function delUser(userId) {
  return request.delete(`/adm/user/delete/${userId}`);
}
