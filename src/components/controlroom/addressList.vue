<template>
  <el-row class="wrap">
    <el-col :span="24" class="warp-breadcrum">
      <el-breadcrumb>
        <el-breadcrumb-item>首页</el-breadcrumb-item>
        <el-breadcrumb-item>地址管理</el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>

    <el-col :span="24" class="warp-main" v-loading="loading" element-loading-text="拼命加载中">
      <!--工具条-->
      <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
        <el-form :inline="true" :model="filters">
          <el-form-item>
            <el-input v-model="filters.name" placeholder="国/省/市/区/邮编" style="min-width: 240px;"
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
          <el-table-column prop="country" label="国籍" width="130" sortable>
          </el-table-column>
          <el-table-column prop="province" label="省份" width="130" sortable>
          </el-table-column>
          <el-table-column prop="city" label="城市" width="130" sortable>
          </el-table-column>
          <el-table-column prop="cityPostCode" label="城市邮编" width="130" sortable>
          </el-table-column>
          <el-table-column prop="prefecture" label="县区" min-width="150" sortable>
          </el-table-column>
          <el-table-column prop="prefecturePostCode" label="县区邮编" min-width="130" sortable>
          </el-table-column>
          <el-table-column prop="town" label="乡镇/街道" min-width="150" sortable>
          </el-table-column>
          <el-table-column prop="townPostCode" label="乡镇/街道邮编" min-width="130" sortable>
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
          limit: that.limit,
          offset: that.page-1 ,
          country: that.filters.name,
          province: that.filters.name,
          city: that.filters.name,
          prefecture: that.filters.name,
          town: that.filters.name,
          cityPostCode: that.filters.name,
          prefecturePostCode: that.filters.name,
          townPostCode: that.filters.name
        }
        API.findList(params).then(res => {
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
