<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="Org Name">
        <el-input v-if="org.name === 'default'" v-model="org.name" readonly style="width: 200px;" class="filter-item"/>
        <el-input v-else v-model="org.name" placeholder="Title" style="width: 200px;" class="filter-item"/>
      </el-form-item>
      <el-form-item label="Description">
        <el-input v-model="org.decription" style="width: 200px;" class="filter-item" />
      </el-form-item>
      <el-form-item label="URL">
        <el-input v-model="org.url" style="width: 200px;" class="filter-item" />
      </el-form-item>
      <el-form-item label="Publisher Hostname">
        <el-input v-model="org.pubHost" style="width: 200px;" class="filter-item" />
      </el-form-item>
      <el-form-item label="domain">
        <el-input v-model="org.domain" style="width: 200px;" class="filter-item" />
      </el-form-item>
      <el-form-item label="API Username">
        <el-input v-model="org.apiUser" style="width: 200px;" class="filter-item" />
      </el-form-item>
      <el-form-item label="API Hash">
        <el-input v-model="org.apiHash" style="width: 200px;" class="filter-item" />
      </el-form-item>
      <el-form-item label="Servers">
        <el-table
          v-loading="listLoading"
          :data="org.servers"
          border
          highligh-current-row
        >
          <el-table-column label="ID" prop="id" align="center" width="80" >
            <template slot-scope="{row}" @click="row.edit=true">
              <el-input v-model="row.id" v-if="row.edit" @blur="row.edit=false"/>
              <span v-else @click="row.edit=true">{{row.id}}  </span>

            </template>
          </el-table-column>
          <el-table-column label="Hostname" prop="hostname" align="center" width="200" >
            <template slot-scope="{row}" @click="row.edit=true">
              <el-input v-model="row.hostname" v-if="row.edit" @blur="row.edit=false"/>
              <span v-else @click="row.edit=true">{{row.hostname}}  </span>

            </template>
          </el-table-column>
          <el-table-column label="Type" prop="type" align="center" width="160" >
            <template slot-scope="{row}" @click="row.edit=true">
              <el-input v-model="row.type" v-if="row.edit" @blur="row.edit=false"/>
              <span v-else @click="row.edit=true">{{row.type}}  </span>

            </template>
          </el-table-column>
          <el-table-column label="MAC Address" prop="MAC Address" align="center" width="160" >
            <template slot-scope="{row}" @click="row.edit=true">
              <el-input v-model="row['MAC Address']" v-if="row.edit" @blur="row.edit=false"/>
              <span v-else @click="row.edit=true">{{row['MAC Address']}}  </span>

            </template>
          </el-table-column>
          <el-table-column label="IPv6 Address" prop="IPv6 Address" align="center" width="160" >
            <template slot-scope="{row}" @click="row.edit=true">
              <el-input v-model="row['IPv6 Address']" v-if="row.edit" @blur="row.edit=false"/>
              <span v-else @click="row.edit=true">{{row['IPv6 Address']}}  </span>
            </template>
          </el-table-column>
          <el-table-column label="Description" prop="Description" align="center" @click="row.edit=true">
            <template slot-scope="{row}" @click="row.edit=true">
              <el-input v-model="row.description" v-if="row.edit" @blur="row.edit=false"/>
              <span v-else @click="row.edit=true">{{row.description}}  </span>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">Save</el-button>
        <el-button @click="onCancel">Cancel</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getOrg, saveOrg } from '@/api/org'

export default {
  props: {
    type: {
      type: String,
      default: 'default'
    }
  },
  data() {
    return {
      org: null,
      orgDefaults: null,
      attributeNames: null,
      orgName: this.type,
      loading: false,
      saving: false,
      serverType: ["CUCM", "IMP", "CUC"]
    }
  },
  created() {
    this.getProps()

  },
  methods: {
    getProps() {
      this.loading = true
      getOrg({org: ""}).then(response => {
        this.orgDefaults = response.data
      })
      getOrg({org: this.orgName}).then(response => {
        this.org = response.data
        this.loading = false
      })
    },

    onSubmit() {
      this.saving = true
      saveOrg(this.org).then( response => {
        this.saving = false
        this.$message('submit!')
      })
    },
    onCancel() {
      this.getProps()
    }
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
</style>


