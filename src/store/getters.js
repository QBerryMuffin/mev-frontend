const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.accessToken,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  authenticated: state => state.user.authenticated,
  authCodeUrl: state => state.user.authCodeUrl,
  mainTokenResponse: state => state.user.mainTokenResponse
}
export default getters
