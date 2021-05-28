<template>

</template>
<script>
import { getOrgsByName } from '@/api/org'

export default {
  name: 'site',
  data() {
    return{
      activeOrgName: 'default',
      org: {},
      sites: [],
      loading: true,
      
    }
  }
}
</script>

