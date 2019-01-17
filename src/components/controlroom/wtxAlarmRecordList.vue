<template>
  <el-row class="wrap">
    <el-col :span="24" class="warp-breadcrum">
      <el-breadcrumb>
        <el-breadcrumb-item>首页</el-breadcrumb-item>
        <el-breadcrumb-item>报警管理</el-breadcrumb-item>
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
          <el-table-column type="index" width="100" >
          </el-table-column>
          <el-table-column prop="alarmAddress" label="报警地址" width="100" sortable >
          </el-table-column>
          <el-table-column prop="alarmTime" label="报警时间" width="120" sortable >
          </el-table-column>
          <el-table-column prop="managerName" label="负责人" width="100" sortable >
          </el-table-column>
          <el-table-column prop="managerPhone" label="负责人电话" width="120" sortable >
          </el-table-column>
          <el-table-column prop="facilityId" label="报警设备ID" width="120" sortable >
          </el-table-column>
          <el-table-column prop="facilityType" label="设备类型" width="120" sortable >
          </el-table-column>
          <el-table-column prop="facilityAlias" label="设备名称" width="120" sortable >
          </el-table-column>
          <el-table-column prop="alarmType" label="报警类型" width="120" sortable >
          </el-table-column>
          <el-table-column prop="alarmState" label="报警情况" width="120" sortable >
          </el-table-column>
          <el-table-column prop="processSituation" label="处理情况" width="120" sortable >
          </el-table-column>
          <el-table-column prop="processUser" label="处理人" width="120" sortable >
          </el-table-column>
          <el-table-column prop="processTime" label="处理时间" min-width="160" sortable >
          </el-table-column>
          <el-table-column prop="mark" label="备注" min-width="160" sortable >
          </el-table-column>
          <el-table-column prop="createTime" label="创建时间" min-width="160" sortable >
          </el-table-column>
          <el-table-column prop="creator" label="创建人" min-width="160" sortable >
          </el-table-column>
          <el-table-column label="操作" width="150" >
            <template slot-scope="scope">
              <el-button size="mini" type="danger" @click.native.preven="deleteRow(scope.$index,scope.row,rows)">删除</el-button>
            </template>
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
        limit: 2,
        total: 0,
        rows: [],
        currentPage: 1,
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
        that.currentPage = val
        that.page = val
        let params = {
          size: that.limit,
          startRow: (that.page-1)*that.limit,
        }
        API.getWtxAlarmRecordList(params).then(res => {
          if (res.code === 0) {
            that.rows = res.data.objectList
            that.total = res.data.total
          }
        })
      },
      deleteRow: function (index,row, rows) {
        let that = this;
        this.$confirm("确认删除该记录吗?", "提示", {type: "warning"})
          .then(() => {
            that.loading = true;
            API.deleteWtxAlarmRecord({id: row.id})
              .then(
                function (result) {
                  that.loading = false;
                  if (result && parseInt(result.code) === 0) {
                    that.$message.success({
                      showClose: true,
                      message: "删除成功",
                      duration: 1500
                    });
                    rows.splice(index,1);
                    if((that.total-1)%that.limit==0&&(that.total-1)!=0){
                      that.currentPage=that.currentPage-1;
                    }
                    that.page = that.currentPage
                    let params = {
                      size: that.limit,
                      startRow: (that.page-1)*that.limit,
                    }
                    API.getWtxAlarmRecordList(params).then(res => {
                      if (res.code === 0) {
                        that.rows = res.data.objectList
                        that.total = res.data.total
                      }
                    })
                  }
                },
                function (err) {
                  that.loading = false;
                  that.$message.error({
                    showClose: true,
                    message: err.toString(),
                    duration: 2000
                  });
                }
              )
              .catch(function (error) {
                that.loading = false;
                console.log(error);
                that.$message.error({
                  showClose: true,
                  message: "请求出现异常",
                  duration: 2000
                });
              });
          })
          .catch(() => {
          });
      }

    },


    mounted() {
      this.search(1);
    }
  }
</script>

<style scoped>

</style>
