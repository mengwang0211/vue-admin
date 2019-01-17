<template>
  <el-row class="wrap">
    <el-col :span="24" class="warp-breadcrum">
      <el-breadcrumb>
        <el-breadcrumb-item>首页</el-breadcrumb-item>
        <el-breadcrumb-item>值班管理</el-breadcrumb-item>
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
          <el-table-column prop="watchkeeperId" label="值班人员id" width="150" sortable>
          </el-table-column>
          <el-table-column prop="watchkeeperName" label="值班人员姓名" width="160" sortable>
          </el-table-column>
          <el-table-column prop="dutyPeriod" label="上班周期" width="150" sortable>
          </el-table-column>
          <el-table-column prop="dutyTime" label="上班时间" width="150" sortable>
          </el-table-column>
          <el-table-column prop="mark" label="备注" width="160" sortable>
          </el-table-column>
          <el-table-column prop="createTime" label="创建时间" sortable>
          </el-table-column>
          <el-table-column prop="creator" label="创建者" sortable>
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
        API.getWtxWatchkeeperScheduleList(params).then(res => {
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
