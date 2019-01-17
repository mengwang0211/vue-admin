<template>
  <el-row class="wrap">
    <el-col :span="24" class="warp-breadcrum">
      <el-breadcrumb>
        <el-breadcrumb-item>首页</el-breadcrumb-item>
        <el-breadcrumb-item>设备信息管理</el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>

    <el-col :span="24" class="warp-main" v-loading="loading" element-loading-text="拼命加载中">
      <!--工具条-->
      <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
        <el-form :inline="true" :model="filters">
          <el-form-item>
            <el-input v-model="filters.name" placeholder="地址/名称/" style="min-width: 240px;"
                      @keyup.enter.native="handleSearch"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleSearch">查询</el-button>
          </el-form-item>
        </el-form>
      </el-col>

      <el-col :span="24" class="wrap-main">
        <el-table :data="rows" style="width: 100%;">
          <el-table-column type="index" width="100">
          </el-table-column>
          <el-table-column prop="facilityId" label="设备id" width="120" sortable>
          </el-table-column>
          <el-table-column prop="projectAlias" label="项目名称" width="120" sortable>
          </el-table-column>
          <el-table-column prop="parentTransferAlias" label="传输装置名称" width="140" sortable>
          </el-table-column>
          <el-table-column prop="facilityAlias" label="设备名称" width="120" sortable>
          </el-table-column>
          <el-table-column prop="facilityType" label="设备类型" width="100" sortable>
          </el-table-column>
          <el-table-column prop="facilityVersion" label="设备型号" min-width="160" sortable>
          </el-table-column>
          <el-table-column prop="facilityPosition" label="设备地址" min-width="160" sortable>
          </el-table-column>
          <el-table-column prop="facilityState" label="设备状态" min-width="100" sortable>
          </el-table-column>
          <el-table-column prop="facilityImageUrl" label="设备图片地址" min-width="130" sortable>
          </el-table-column>
          <el-table-column prop="mark" label="备注" min-width="160" sortable>
          </el-table-column>
          <el-table-column prop="createTime" label="创建时间" min-width="120" sortable>
          </el-table-column>
          <el-table-column prop="creator" label="创建者"min-width="110" sortable>
          </el-table-column>
          <el-table-column label="操作" width="150">
          </el-table-column>
        </el-table>
      </el-col>
      <!--工具条-->
      <el-col :span="24" class="toolbar">
        <el-pagination layout="total,prev, pager, next" @current-change="search" :page-size="limit"
                       :total="total"
                       style="float:right;">
        </el-pagination>
      </el-col>
    </el-col>
  </el-row>
</template>

<!---->


<script>
  import API from '../../api/api_control_room'

  export default {
    name: "List",
    data() {
      return {
        limit: 10,
        total: 0,
        rows: [],
        filters: {
          name: ""
        },
        loading: false
      }
    },
    methods: {
      handleSearch() {
        this.total = 0;
        this.page = 1;
        this.search(1);
      },
      search: function (val) {
        let that = this
        that.page = val
        let params = {
          size: that.limit,
          startRow: (that.page-1)*that.limit,
        }
        API.getWtxFacilityInfoList(params).then(res => {
          console.log(res)
          if (res.code === 0) {
            console.log(res)
            that.rows = res.data.objectList
            that.total = res.data.total
          }
        })

      },
    },
    mounted() {
      this.search(1);
    }
  }
</script>

<style scoped>

</style>
