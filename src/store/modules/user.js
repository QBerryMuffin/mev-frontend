import { msalInstance } from "vue-msal-browser"
import { resetRouter } from '@/router'


const state = {
  name: '',
  avatar: '',
  mainTokenResponse: null,
  authenticated: false
}

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, { 
      name: '',
      avatar: '',
      mainTokenResponse: null,
      authenticated: false})
  },
  SET_TOKEN: (state, token) => {
    state.mainTokenResponse = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_AUTHENTICATED: (state, isAuthenticated) => {
    state.authenticated = isAuthenticated
  }
}

const actions = {


  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      commit('SET_NAME', state.mainTokenResponse.idTokenClaims.given_name)
      
    })
  },
  async azureAuth({commit, getters, dispatch }){
    try{
      let existingTokenResponse = getters.mainTokenResponse
      let newTokenResponse

      if (existingTokenResponse){
        newTokenResponse = await msalInstance.aquireTokenSilent({ account: existingTokenResponse.account, scopes: msalInstance.config.auth.scopes})
      } else {
        newTokenResponse = await msalInstance.handleRedirectPromise()
      }
      if (!newTokenResponse) {
        const loginRequest = { scopes: msalInstance.config.auth.scopes}
        await msalInstance.loginRedirect(loginRequest)
        return false
      } else if (newTokenResponse) {
        // We add the access token as an authorization header for our Axios requests to our API
        commit('SET_TOKEN', newTokenResponse)
        commit('SET_AUTHENTICATED', true)
        commit('SET_NAME', newTokenResponse.idTokenClaims.given_name)
        return true
      }
    } catch (err) {
      console.error(err)
    }
  },
  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      msalInstance.logout().then(() => {
         // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        commit('SET_AUTHENTICATED', false)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('RESET_STATE')
      commit('SET_AUTHENTICATED', false)
      resolve()
    })
  },
  setAuthenticated({ commit }, authState) {
    return new Promise(resolve => {
      commit('SET_AUTHENTICATED', authState)
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

