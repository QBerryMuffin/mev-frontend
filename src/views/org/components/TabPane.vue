<template>
  <div class="app-container">
    <el-form ref="form" :model="org" label-width="120px">
      <el-form-item label="Org Name">
        <el-input v-if="orgName === 'default'" v-model="orgName" readonly style="width: 200px;" class="filter-item"/>
        <el-input v-else v-model="org.name" placeholder="Title" style="width: 200px;" class="filter-item"/>
      </el-form-item>
      <el-form-item label="Description">
        <el-input v-model="org.description" style="width: 200px;" class="filter-item" />
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
      <el-button class="filter-item" style="margin-bottom: 10px;" type="primary" icon="el-icon-circle-plus-outline" @click="handleServerAdd">
        Add
      </el-button>
        <el-table
          v-loading="loading"
          :data="org.servers"
          border
          highligh-current-row
        >
          <el-table-column label="ID" prop="id" align="center" width="80" >
            <template slot-scope="{row}">
              <el-input v-model="row.id" v-if="row.edit" />
              <span v-else @click="row.edit=true">{{row.id}}  </span>

            </template>
          </el-table-column>
          <el-table-column label="Hostname" prop="hostname" align="center" width="200" >
            <template slot-scope="{row}" >
              <el-input v-model="row.hostname" v-if="row.edit" />
              <span v-else @click="row.edit=true">{{row.hostname}}  </span>

            </template>
          </el-table-column>
          <el-table-column label="Type" prop="type" align="center" width="160" >
            <template slot-scope="{row}" >
              <el-input v-model="row.type" v-if="row.edit" />
              <span v-else @click="row.edit=true">{{row.type}}  </span>

            </template>
          </el-table-column>
          <el-table-column label="MAC Address" prop="MAC Address" align="center" width="160" >
            <template slot-scope="{row}" >
              <el-input v-model="row['MAC Address']" v-if="row.edit" />
              <span v-else @click="row.edit=true">{{row['MAC Address']}}  </span>
            </template>
          </el-table-column>
          <el-table-column label="IPv6 Address" prop="IPv6 Address" align="center" width="160" >
            <template slot-scope="{row}" >
              <el-input v-model="row['IPv6 Address']" v-if="row.edit"/>
              <span v-else @click="row.edit=true">{{row['IPv6 Address']}}  </span>
            </template>
          </el-table-column>
          <el-table-column label="Description" prop="Description" align="center" >
            <template slot-scope="{row}" >
              <el-input v-model="row.description" v-if="row.edit" />
              <span v-else @click="row.edit=true">{{row.description}}  </span>

            </template>
          </el-table-column>
          <el-table-column label="" prop="Edit" width="120" >
            <template slot-scope="{row, $index}" >
              <el-button type="primary" size="mini" v-if="!row.edit" @click="row.edit=!row.edit" align="left"><svg-icon  icon-class="edit"  /></el-button>
              <el-button v-if="row.edit" @click="row.edit=!row.edit" align="left" size="mini" type="success"> <i class="el-icon-circle-check"/></el-button>
              <el-button size="mini" type="danger" @click="handleServerDelete(row, $index)"><i class="el-icon-circle-close" align="right" /></el-button>
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
      org: {},
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
        console.log("response: " + response)
        this.$message('Organization Saved')
        this.saving = false
      }).catch(err => {
        this.$alert('Error Saving: ' + err)
      })

    },
    onCancel() {
      this.getProps()
    },
    handleServerDelete(row, index) {
      this.$notify({
        title: 'Success',
        message: `Server id ${row.id} Deleted Successfully`,
        type: 'success',
        duration: 2000
      })
      this.org.servers.splice(index, 1)
    },
    handleServerAdd(){
      this.org.servers.push({
        "id": this.org.servers.length + 1,
        "hostname": "",
        "type": '',
        "Mac Address": "",
        "IPv6 Address": "",
        "description": "",
        "edit": true})
    }
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
</style>


