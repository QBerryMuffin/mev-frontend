<template>
  <div class="app-container">
    <el-form ref="form" :model="org" label-width="120px">
      <el-form-item label="Org Name">
        <el-input v-if="orgName === 'default'" v-model="orgName" readonly style="width: 200px;" class="filter-item" />
        <el-input v-else v-model="org.name" placeholder="Title" style="width: 200px;" class="filter-item" />
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
      <el-form-item label="Default Device Pool">
        <el-input v-model="org.defaultDevicePool" style="width: 200px;" class="filter-item" />
      </el-form-item>
      <el-form-item label="Servers">
      <el-button class="filter-item" style="margin-bottom: 10px;" type="primary" icon="el-icon-circle-plus-outline" @click="handleServerAdd">
        Add
      </el-button>
        <el-table
          v-loading="loading"
          :data = "org.servers"
          border
          highligh-current-row
          style = "margin-bottom: 10px;"
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
              <el-input v-model="row['IPv6 Address']" v-if="row.edit" />
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
              <el-button v-if="row.edit" @click="row.edit=!row.edit" align="left" size="mini" type="success"> <i class="el-icon-circle-check" /></el-button>
              <el-button size="mini" type="danger" @click="handleServerDelete(row, $index)"><i class="el-icon-circle-close" align="right" /></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item label="CM Groups">
      <el-button class="filter-item" style="margin-bottom: 10px;" type="primary" icon="el-icon-circle-plus-outline" @click="handleCMGroupAdd">
        Add
      </el-button>
        <el-table
          v-loading="loading"
          :data="org.cmGroups"
          border
          highligh-current-row
        >
          <el-table-column label="name" prop="cmGroupName" align="center" width="80" >
            <template slot-scope="{row}">
              <el-input v-model="row.name" v-if="row.edit" />
              <span v-else @click="row.edit=true">{{row.name}}  </span>

            </template>
          </el-table-column>
          <el-table-column label="Servers" prop="cmGroupServers" align="center" width="200" >
            <template slot-scope="{row}" >
              <el-input v-model="row.servers" v-if="row.edit" />
              <span v-else @click="row.edit=true">{{row.servers}}  </span>

            </template>
          </el-table-column>

          <el-table-column label="" prop="Edit" width="120" >
            <template slot-scope="{row, $index}" >
              <el-button type="primary" size="mini" v-if="!row.edit" @click="row.edit=!row.edit" align="left"><svg-icon  icon-class="edit"  /></el-button>
              <el-button v-if="row.edit" @click="row.edit=!row.edit" align="left" size="mini" type="success"> <i class="el-icon-circle-check"/></el-button>
              <el-button size="mini" type="danger" @click="handleCMGroupDelete(row, $index)"><i class="el-icon-circle-close" align="right" /></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item label="Partitions">
        <el-form-item label="Prefix">
          <el-input v-model="org.partitions.prefix" style="width: 200px;" class="filter-item" />
        </el-form-item>
        <el-form-item label="Suffix">
          <el-input v-model="org.partitions.suffix" style="width: 200px;" class="filter-item" />
        </el-form-item>
      </el-form-item>
        <el-form-item label="System Partitions">
          <el-button class="filter-item" style="margin-bottom: 10px;" type="primary" icon="el-icon-circle-plus-outline" @click="handleSystemPartitionAdd">
        Add
      </el-button>

        <el-table
          v-loading="loading"
          :data="org.partitions.systemPartitions"
          border
          highligh-current-row
        >
          <el-table-column label="ID" prop="systemParitionID" align="center" width="80" >
            <template slot-scope="{row}">
              <el-input v-model="row.id" v-if="row.edit" />
              <span v-else @click="row.edit=true">{{row.id}}  </span>

            </template>
          </el-table-column>
          <el-table-column label="Name" prop="systemPartitionName" align="center" width="200" >
            <template slot-scope="{row}" >
              <el-input v-model="row.name" v-if="row.edit" />
              <span v-else @click="row.edit=true">{{row.name}}  </span>

            </template>
          </el-table-column>

          <el-table-column label="" prop="Edit" width="120" >
            <template slot-scope="{row, $index}" >
              <el-button type="primary" size="mini" v-if="!row.edit" @click="row.edit=!row.edit" align="left"><svg-icon  icon-class="edit"  /></el-button>
              <el-button v-if="row.edit" @click="row.edit=!row.edit" align="left" size="mini" type="success"> <i class="el-icon-circle-check" /></el-button>
              <el-button size="mini" type="danger" @click="handleSystemPartitionDelete(row, $index)"><i class="el-icon-circle-close" align="right" /></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item label="Site Partitions">
        <el-button class="filter-item" style="margin-bottom: 10px;" type="primary" icon="el-icon-circle-plus-outline" @click="handleSitePartitionAdd">
          Add
        </el-button>
        <el-table
          v-loading="loading"
          :data="org.partitions.sitePartitions"
          border
          highligh-current-row
        >
          <el-table-column label="ID" prop="systemParitionID" align="center" width="80" >
            <template slot-scope="{row}">
              <el-input v-model="row.id" v-if="row.edit" />
              <span v-else @click="row.edit=true">{{row.id}}  </span>

            </template>
          </el-table-column>
          <el-table-column label="Name" prop="systemPartitionName" align="center" width="200" >
            <template slot-scope="{row}" >
              <el-input v-model="row.name" v-if="row.edit" />
              <span v-else @click="row.edit=true">{{row.name}}  </span>

            </template>
          </el-table-column>

          <el-table-column label="" prop="Edit" width="120" >
            <template slot-scope="{row, $index}" >
              <el-button type="primary" size="mini" v-if="!row.edit" @click="row.edit=!row.edit" align="left"><svg-icon  icon-class="edit"  /></el-button>
              <el-button v-if="row.edit" @click="row.edit=!row.edit" align="left" size="mini" type="success"> <i class="el-icon-circle-check" /></el-button>
              <el-button size="mini" type="danger" @click="handleSitePartitionDelete(row, $index)"><i class="el-icon-circle-close" align="right" /></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item label="CSS">
        <el-form-item label="Prefix">
          <el-input v-model="org.css.prefix" style="width: 200px;" class="filter-item" />
        </el-form-item>
        <el-form-item label="Suffix">
          <el-input v-model="org.css.suffix" style="width: 200px;" class="filter-item" />
        </el-form-item>
      </el-form-item>
      <el-form-item label="System CSS">
        <el-button class="filter-item" style="margin-bottom: 10px;" type="primary" icon="el-icon-circle-plus-outline" @click="handleSystemCSSAdd">
          Add
        </el-button>
        <el-table
          v-loading="loading"
          :data="org.css.systemCSS"
          border
          highligh-current-row
        >
          <el-table-column label="Name" prop="systemCSSName" align="center" width="80" >
            <template slot-scope="{row}">
              <el-input v-model="row.name" v-if="row.edit" />
              <span v-else @click="row.edit=true">{{row.name}}  </span>

            </template>
          </el-table-column>
          <el-table-column label="Partitions" prop="systemCSSPartitions" align="center" width="200" >
            <template slot-scope="{row}" >
              <el-input v-model="row.partitions" v-if="row.edit" />
              <span v-else @click="row.edit=true">{{row.partitions}}  </span>

            </template>
          </el-table-column>

          <el-table-column label='' prop="Edit" width="120" >
            <template slot-scope="{row, $index}" >
              <el-button type='primary' size="mini" v-if="!row.edit" @click="row.edit=!row.edit" align="left"><svg-icon  icon-class="edit"  /></el-button>
              <el-button v-if="row.edit" @click="row.edit=!row.edit" align="left" size="mini" type="success"> <i class="el-icon-circle-check"/></el-button>
              <el-button size="mini" type="danger" @click="handleSystemCSSDelete(row, $index)"><i class="el-icon-circle-close" align="right" /></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type='primary' @click="onSubmit">Save</el-button>
        <el-button @click="onCancel">Cancel</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getObj, saveObj } from '@/api/backend'

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
      serverType: ['CUCM', 'IMP', 'CUC']
    }
  },
  created() {
    this.getProps()
  },
  methods: {
    getProps() {
      this.loading = true
      getObj({ 'path': '/org/byId/', 'name': 'default' }).then(response => {
        this.orgDefaults = response.data[0]
      })
      if (this.orgName === '') {
        this.org = this.orgDefaults
        this.orgName = 'New Organization'
      } else {
        getObj({ path: '/org/byId/', name: this.orgName }).then(response => {
          this.org = response.data[0]
          this.loading = false
        })
      }
    },
    onSubmit() {
      this.saving = true
      saveObj({ 'path': '', 'obj': this.org }).then(response => {
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
    handleServerAdd() {
      this.org.servers.push({
        'id': this.org.servers.length + 1,
        'hostname': '',
        'type': '',
        'Mac Address': '',
        'IPv6 Address': '',
        'description': '',
        'edit': true
      })
    },
    handleCMGroupDelete(row, index) {
      this.$notify({
        title: 'Success',
        message: `Server id ${row.name} Deleted Successfully`,
        type: 'success',
        duration: 2000
      })
      this.org.cmGroups.splice(index, 1)
    },
    handleCMGroupAdd() {
      this.org.cmGroups.push({
        name: '',
        servers: '',
        edit: true
      })
    },
    handleSystemPartitionDelete(row, index) {
      this.$notify({
        title: 'Success',
        message: `Server id ${row.name} Deleted Successfully`,
        type: 'success',
        duration: 2000
      })
      this.org.partitions.systemPartitions.splice(index, 1)
    },
    handleSystemPartitionAdd() {
      this.org.partitions.systemPartitions.push({
        id: '',
        name: '',
        edit: true
      })
    },
    handleSitePartitionDelete(row, index) {
      this.$notify({
        title: 'Success',
        message: `Server id ${row.name} Deleted Successfully`,
        type: 'success',
        duration: 2000
      })
      this.org.partitions.sitePartitions.splice(index, 1)
    },
    handleSitePartitionAdd() {
      this.org.partitions.sitePartitions.push({
        id: '',
        name: '',
        edit: true
      })
    },
    handleSystemCSSDelete(row, index) {
      this.$notify({
        title: 'Success',
        message: `Server id ${row.name} Deleted Successfully`,
        type: 'success',
        duration: 2000
      })
      this.org.css.systemCSS.splice(index, 1)
    },
    handleSystemCSSAdd() {
      this.org.css.systemCSS.push({
        'id': '',
        'name': '',
        'edit': true
      })
    },
    handleSiteCSSDelete(row, index) {
      this.$notify({
        title: 'Success',
        message: `Server id ${row.name} Deleted Successfully`,
        type: 'success',
        duration: 2000
      })
      this.org.css.siteCSS.splice(index, 1)
    },
    handleSiteCSSAdd() {
      this.org.css.siteCSS.push({
        id: '',
        name: '',
        edit: true
      })
    }
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
</style>
