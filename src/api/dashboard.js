import request from '@/utils/request';

export function getTaskList(params) {
  return request.post('/adm/index/getList1', params);
}
