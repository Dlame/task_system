import request from '@/utils/request';

export function getTaskList(params) {
  return request.post('/adm/task/getList', params);
}

export function submitTask(params) {
  return request.post('/adm/task/submit', params);
}

export function saveTask(params) {
  return request.post('/adm/task/save', params);
}

export function editTask(params) {
  return request.post('/adm/task/edit', params);
}

export function delTask(id) {
  return request.delete(`/adm/task/delete/${id}`);
}

export function getIndexList(index, params) {
  return request.post(`/adm/index/getList${index}`, params);
}

export function getTaskDetail(id) {
  return request.get(`/adm/task/getObject/${id}`);
}

export function reviewPass(params) {
  return request.post('/adm/taskDetail/reviewPass', params);
}

export function reviewNotPass(params) {
  return request.post('/adm/taskDetail/reviewNotPass', params);
}

export function getTaskOneDetail(id) {
  return request.get(`/adm/taskDetail/getOneObject/${id}`);
}

export function getTaskTwoDetail(id) {
  return request.get(`/adm/taskDetail/getTwoObject/${id}`);
}

export function getChildList(id) {
  return request.get(`/adm/taskDetail/getChildList/${id}`);
}

export function getFeedbackList(taskId) {
  return request.post('/adm/feedback/getList', { taskId });
}

export function addFeedBack(params) {
  return request.post('/adm/feedback/add', params);
}

export function editFeedBack(params) {
  return request.post('/adm/feedback/edit', params);
}

export function getFeedBackDetail(id) {
  return request.get(`/adm/feedback/getObject/${id}`);
}

export function getCommentList(fbId) {
  return request.post('/adm/comment/getList/', { fbId });
}

export function addComment(params) {
  return request.post('/adm/comment/add', params);
}

export function editComment(params) {
  return request.post('/adm/comment/edit', params);
}

export function confirmComment(params) {
  return request.post('/adm/comment/confirm', params);
}
