import request from '@/utils/request'

export function getOrg(params) {
  return request({
    url: `http://${location.hostname}:8081/org/${params.org}`,
    method: 'get'
  })
}
export function getOrgsByName(params) {
  return request({
    url: `http://${location.hostname}:8081/getOrgNames`,
    method: 'get'
  })
}
export function saveOrg(params) {
  return request({
    method: 'post',
    url: `http://${location.hostname}:8081/saveOrg`,
    headers: {
      'Content-Type': 'application/json'
    },
    data: JSON.stringify(params)
  })
}


