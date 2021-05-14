import request from '@/utils/request'

export function getOrg(params) {
  return request({
    url: `http://${location.hostname}:8081/org/${params.org}`,
    method: 'get',
    params
  })
}
export function getOrgsByName(params) {
  return request({
    url: `http://${location.hostname}:8081/getOrgNames`,
    method: 'get',
    params
  })
}

