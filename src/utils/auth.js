

/**
export function msalLogin() {
  pca.getAuthCodeUrl(authCodeUrlParameters).then(authCodeUrl => {
    return authCodeUrl
  }).catch( error => {
    console.log(JSON.stringify(error))
    return error
  })
}
export function msalLogout() {
  return ''
}
export function getUserInfo() {
  return ''
}

export function tokenResponse(code) {
  const tokenRequest = {
    code: code,
    scopes: ["user.read"],
    redirectUri: 'http://localhost:9528/auth-redirect',
  }
  pca.acquireTokenByCode(tokenRequest).then( response => {
    return response
  }).catch(error => {
    console.log("error")
  
  })
}
 */