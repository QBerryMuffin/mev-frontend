import request from '@/utils/request'

export function getObj(params) {
  return request({
    url: `${process.env.VUE_APP_API_URL}${params.path}${params.orgName}`,
    method: 'get'
  })
}
export function getList(params) {
  return request({
    url: `${process.env.VUE_APP_API_URL}${params.path}`,
    method: 'get'
  })
}
export function saveObj(params) {
  return request({
    method: 'post',
    url: `${process.env.VUE_APP_API_URL}${params.path}`,
    headers: {
      'Content-Type': 'application/json'
    },
    data: JSON.stringify(params.obj)
  })
}

