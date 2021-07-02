<script>
export default {
  name: 'AuthRedirect',
  created() {
    this.$store.dispatch('user/azureAuth').then(()=>{
      let authed = this.$store.authenticated
      console.log(`msal auth: ${authed}`)
      //this.$router.push('/')
    }).catch((error) => {
      console.error('error saving auth')
      //this.$router.push('/login')
    })
    console.log(this.$route.query)
  },
  render: function(h) {
    return h() // avoid warning message
  }
}
</script>
