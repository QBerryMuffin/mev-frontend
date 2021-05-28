import request from '@/utils/request'

export function getOrg(params) {
  console.log(`API URL: ${process.env.VUE_APP_API_URL}/org/byId/${params.org}`)
  return request({
    url: `${process.env.VUE_APP_API_URL}/org/byId/${params.org}`,
    method: 'get'
  })
}
export function getOrgsByName(params) {
  console.log(`API URL: ${process.env.VUE_APP_API_URL}`)
  return request({
    url: `${process.env.VUE_APP_API_URL}/org/getNames`,
    method: 'get'
  })
}
export function saveOrg(params) {
  return request({
    method: 'post',
    url: `${process.env.VUE_APP_API_URL}/org/saveOrg`,
    headers: {
      'Content-Type': 'application/json'
    },
    data: JSON.stringify(params)
  })
}
