<template>
  <div>
    <sticky :z-index="10" class-name="navbar">
      <span class="input-label">Organization</span>
      <el-select v-model="activeOrgName" placeholer="select">
        <el-option
          v-for="item in orgList"
          :key="item"
          :label="item"
          :value="item"
        />
      </el-select>
    </sticky>
  </div>
</template>

<script>
import { getList } from '@/api/backend'

export default {
  name: 'Site',
  data() {
    return {
      activeOrgName: 'default',
      orgList: [],
      sites: [],
      activeSite: '0',
      loading: true
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
      getList({ 'path': '/org/getNames' }).then(response => {
        this.orgList = response.data.items
        this.Loading = false
      })
    }
  }
}
</script>

