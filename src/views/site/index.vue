<template>
<div>
    <sticky :z-index="10" class-name="sub-navbar">
        <span class="input-label">Organization</span>
        <el-select v-model="activeOrgName" placeholer="select">
          <el-option
            v-for="item in orgList"
            :key="item"
            :label="item"
            :value="item">

          </el-option>
        </el-select>
    </sticky>
    </div>
</template>
<script>
import { getOrgsByName } from '@/api/org'

export default {
  name: 'site',
  data() {
    return{
      activeOrgName: 'default',
      orgList: [],
      sites: [],
      loading: true,

    }
  },
  watch: {
    activeName(val) {
      this.$router.push(`${this.$route.path}?org=${val}`)
    }
  },
  created() {
    const org = this.$route.query.org
    if (org) {
      this.activeName = org
    }
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.loading = true
      getOrgsByName().then(response => {
        this.orgList = response.data.items
        this.Loading = false
      })
    }
  }
}
</script>

