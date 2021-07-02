import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import './styles/element-variables.scss'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n
//import axios from 'axios'
//import { default as Adal, AxiosAuthHttp } from 'vue-adal'
//import msal from 'vue-msal-2'
import { default as msalPlugin } from 'vue-msal-browser'
import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}
const msalConfig = {
  auth: {
    clientId: '82da2cdb-a13b-4436-b208-d6cc6d1a1777',
    authority: 'https://login.microsoftonline.com/9c13db0d-1783-4d50-affc-ff31d72475b6',
    clientSecret: '5uXC2imwh7UMes-c-_b9YZ_W9Vk.Ch-11G',
    redirectUri: 'http://localhost:9528/auth-redirect',
    scopes: ['user.read']
  },
  cache: {
    cacheLocation: 'sessionStorage',
  }
}

// set ElementUI lang to EN
Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)

Vue.use(msalPlugin, msalConfig)
/**
const graphApiBase = `https://graph.windows.net`
const graphApiResource = '00000002-0000-0000-c000-000000000000'
Vue.use({
  install (vue, opts = {}) {
    // Configures an axios http client with a interceptor to auto-acquire tokens
    vue.prototype.$graphApi = AxiosAuthHttp.createNewClient({
      // Required Params
      axios: axios,
      resourceId: graphApiResource, // Resource id to get a token against

      // Optional Params
      router: router, // Enables a router hook to auto-acquire a token for the specific resource

      baseUrl: graphApiBase, // Base url to configure the client with

      onTokenSuccess (http, context, token) { // Token success hook
        // When an attempt to retrieve a token is successful, this will get called.
        // This enables modification of the client after a successful call.
        if (context.user) {
          // Setup the client to talk with the Microsoft Graph API
          http.defaults.baseURL = `${graphApiBase}/${context.user.profile.tid}`
        }
      },

      onTokenFailure (error) { // Token failure hook
        // When an attempt to retrieve a token is not successful, this will get called.
        console.log(error)
      }
    })
  }
})
*/

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
