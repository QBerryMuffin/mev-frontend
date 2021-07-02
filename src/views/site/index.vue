<template>
  <div>
    <sticky  v-if="!loadingOrgs" :z-index="10" class-name="navbar">
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
    <span>
      {{JSON.stringify(orgSiteInfo)}}
    </span>
  </div>
</template>

<script>
import Sticky from '@/components/Sticky'
import { getList, getObj, saveObj } from '@/api/backend'

export default {
  name: 'Sites',
  components: { Sticky },
  data() {
    return {
      activeOrgName: 'default',
      orgList: [],
      orgSiteInfo: {},
      activeSite: '0',
      loadingSite: true,
      loadingOrgs: true
    }
  },
  watch: {
    activeName(val) {
      this.$router.push(`${this.$route.path}?org=${val}`)
    }
  },
  created() {
    const org = this.$route.query.org
    this.loadingOrgs = true
    if (org) {
      this.activeName = org
    }
    getList({ 'path': '/orgs/getNames' }).then(response => {
      this.orgList = response.data.items
      this.loadingOrgs = false
    })
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.loadingSite = true
      getObj({ 'path': '/sites/byId/', orgName: this.activeOrgName })
        .then(response => {
        this.orgSiteInfo = response.data[0]
        this.loadingSite = false
      })
    }
  }
}
</script>

<style scoped>
.components-container div {
  margin: 10px;
}

.time-container {
  display: inline-block;
}
</style>
