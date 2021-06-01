<template>
  <div class="tab-container">
    <el-tag>Select an Organization to Edit</el-tag>
    <el-tabs v-model="activeName" style="margin-top:15px;" type="border-card">
      <el-tab-pane v-for="item in orgList" :key="item" :label="item" :name="item">
        <keep-alive>
          <tab-pane v-if="activeName==item" :type="item" />
        </keep-alive>
      </el-tab-pane>
    </el-tabs>

  </div>
</template>

<script>
import { getOrgsByName } from '@/api/org'
import TabPane from './components/TabPane'

export default {
  name: 'Orgs',
  components: { TabPane },
  data() {
    return {
      activeName: 'default',
      orgLoading: true,
      orgList: []
    }
  },
  watch: {
    activeName(val) {
      this.$router.push(`${this.$route.path}?tab=${val}`)
    }
  },
  created() {
    const tab = this.$route.query.tab
    if (tab) {
      this.activeName = tab
    }
    this.fetchData()


  },
  methods: {
    onSubmit() {
      this.$message('submit!')
    },
    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
    },
    fetchData() {
      this.orgLoading = true
      getOrgsByName().then(response => {
        this.orgList = response.data.items
        this.orgLoading = false
      })
    }

  }
}
</script>

<style scoped>
  .tab-container {
    margin: 30px;
  }
</style>
