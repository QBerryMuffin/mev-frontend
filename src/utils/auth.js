
import { AuthenticationContext } from 'vue-adal'


const TokenKey = 'vue_admin_template_token'



export function getToken() {
  return ""
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
