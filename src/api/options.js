import request from '@/utils/request';

export function getDept() {
  return request.post('/adm/dept/selectDept', {});
}

export function getOneId() {
  return request.post('/adm/task/selectOneId', {});
}

export function getTwoId() {
  return request.post('/adm/task/selectTwoId', {});
}

export function getExerId(taskLevel) {
  return request.post('/adm/user/selectexerIds', { taskLevel });
}

export function getTeam(departmentId) {
  return request.post('/adm/team/selectTeam', { departmentId });
}
