<template>
  <el-row class="wrap">
    <el-col :span="24" class="warp-breadcrum">
      <el-breadcrumb>
        <el-breadcrumb-item>首页</el-breadcrumb-item>
        <el-breadcrumb-item>项目管理</el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>

    <el-col :span="24" class="warp-main" v-loading="loading" element-loading-text="拼命加载中">
      <!--工具条-->
      <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
        <el-form :inline="true" :model="filters">
          <el-form-item>
            <el-input v-model="filters.name" placeholder="地址/名称" style="min-width: 240px;"
                      @keyup.enter.native="handleSearch"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleSearch">查询</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="showAddDialog">添加</el-button>
          </el-form-item>
        </el-form>
      </el-col>

      <el-col :span="24" class="wrap-main">
        <el-table :data="rows" style="width: 100%;">
          <el-table-column type="index" width="100">
          </el-table-column>
          <el-table-column prop="projectName" label="项目名称" width="120" sortable>
          </el-table-column>
          <el-table-column prop="city" label="所属市" width="120" sortable>
          </el-table-column>
          <el-table-column prop="prefecture" label="所属辖区" width="120" sortable>
          </el-table-column>
          <el-table-column prop="projectAddress" label="项目地址" width="120" sortable>
          </el-table-column>
          <el-table-column prop="parentProjectName" label="父项目名称" width="120" sortable>
          </el-table-column>
          <el-table-column prop="buildingStructure" label="建筑结构" width="100" sortable>
          </el-table-column>
          <el-table-column prop="prefectureName" label="管辖所属" width="100" sortable>
          </el-table-column>
          <el-table-column prop="buildingAcreage" label="使用面积" min-width="160" sortable>
          </el-table-column>
          <el-table-column prop="buildingHeight" label="建筑高度" min-width="160" sortable>
          </el-table-column>
          <el-table-column prop="floorDistribution" label="楼层分布" min-width="160" sortable>
          </el-table-column>
          <el-table-column prop="creationTime" label="成立时间" min-width="160" sortable>
          </el-table-column>
          <el-table-column prop="finishTime" label="交付时间" min-width="160" sortable>
          </el-table-column>
          <el-table-column prop="fireControlRoad" label="消防车道" min-width="160" sortable>
          </el-table-column>
          <el-table-column prop="fireResistantLevel" label="耐火等级" min-width="160" sortable>
          </el-table-column>
          <el-table-column prop="dangerousLevel" label="危险等级" min-width="160" sortable>
          </el-table-column>
          <el-table-column prop="detectorNumber" label="探测器个数" min-width="160" sortable>
          </el-table-column>
          <el-table-column prop="insideFireHydrant" label="室内消火栓数量" min-width="160" sortable>
          </el-table-column>
          <el-table-column prop="outsideFireHydrant" label="室外消火栓数量" min-width="160" sortable>
          </el-table-column>
          <el-table-column prop="securityExitNumber" label="出口数量" min-width="160" sortable>
          </el-table-column>
          <el-table-column prop="checkSituation" label="验收情况" min-width="160" sortable>
          </el-table-column>
          <el-table-column prop="mark" label="备注" min-width="160" sortable>
          </el-table-column>
          <el-table-column prop="createTime" label="创建时间" min-width="160" sortable>
          </el-table-column>
          <el-table-column prop="creator" label="创建人" min-width="160" sortable>
          </el-table-column>
          <el-table-column label="操作" width="150">
            <template slot-scope="scope">
              <el-button size="mini" @click="showEditDialog(scope.$index,scope.row)">编辑</el-button>
              <el-button size="mini" type="danger" @click.native.preven="deleteRow(scope.$index,scope.row,rows)">删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
      <!--工具条-->
      <el-col :span="24" class="toolbar">
        <el-pagination layout="total,prev, pager, next"
                       @current-change="search"
                       :page-size="limit"
                       :total="total"
                       style="float:right;">
        </el-pagination>
      </el-col>
      <!-- 添加界面 -->
      <el-dialog title="新增" :visible.sync="addFormVisible" :close-on-click-modal="false">
        <el-form :model="addForm" label-width="120px" :rules="addFormRules" ref="addForm">
          <el-form-item label="项目名称" prop="projectName">
            <el-input v-model="addForm.projectName" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="父项目" prop="parentProjectName">
            <el-input v-model="addForm.parentProjectName" auto-complete="off" placeholder="可自动搜索"></el-input>
          </el-form-item>
          <el-form-item label="建筑结构" prop="buildingStructure">
            <el-input v-model="addForm.buildingStructure" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="使用面积" prop="buildingAcreage">
            <el-input v-model="addForm.buildingAcreage" auto-complete="off" placeholder="请输入数字"></el-input>
          </el-form-item>
          <el-form-item label="建筑高度" prop="buildingHeight">
            <el-input v-model="addForm.buildingHeight" auto-complete="off" placeholder="请输入数字"></el-input>
          </el-form-item>
          <el-form-item label="楼层分布" prop="floorDistribution">
            <el-input v-model="addForm.floorDistribution" auto-complete="off" placeholder="请输入 楼层/总楼层"></el-input>
          </el-form-item>
            <el-form-item label="成立时间" prop="creationTime">
              <el-date-picker type="date" placeholder="成立时间" v-model="addForm.creationTime"></el-date-picker>
            </el-form-item>
            <el-form-item label="交付时间" prop="finishTime">
              <el-date-picker type="date" placeholder="交付时间" v-model="addForm.finishTime"></el-date-picker>
            </el-form-item>
            <el-form-item label="消防车道" prop="fireControlRoad">
              <el-select :default-active="$route.path" @change="chickvalue" v-model="addForm.fireControlRoad" filterable placeholder="请输入/请选择" class="h-m-select">
                <el-option v-for="item in fireControlRoadOptions" :key="item.value" :label="item.label" v-model="item.value"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="耐火等级" prop="fireResistantLevel">
              <el-select :default-active="$route.path" @change="chickvalue" v-model="addForm.fireResistantLevel" filterable placeholder="请输入/请选择" class="h-m-select">
                <el-option v-for="item in fireResistantLevelOptions" :key="item.value" :label="item.label" v-model="item.value"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="危险等级" prop="dangerousLevel">
              <el-select :default-active="$route.path" @change="chickvalue" v-model="addForm.dangerousLevel" filterable placeholder="请输入/请选择" class="h-m-select">
                <el-option v-for="item in dangerousLevelOptions" :key="item.value" :label="item.label" v-model="item.value"></el-option>
              </el-select>
            </el-form-item>
          <el-form-item label="探测器个数" prop="detectorNumber" >
            <el-input v-model="addForm.detectorNumber" auto-complete="off" placeholder="无需填写，系统自动计算" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="室内消火栓数量" prop="insideFireHydrant">
            <el-input v-model="addForm.insideFireHydrant" auto-complete="off" placeholder="无需填写，系统自动计算" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="室外消火栓数量" prop="outsideFireHydrant">
            <el-input v-model="addForm.outsideFireHydrant" auto-complete="off" placeholder="无需填写，系统自动计算" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="出口数量" prop="securityExitNumber">
            <el-input v-model="addForm.securityExitNumber" auto-complete="off" placeholder="请输入数字"></el-input>
          </el-form-item>
          <el-form-item label="验收情况" prop="checkSituation">
            <el-select :default-active="$route.path" @change="chickvalue" v-model="addForm.checkSituation" filterable placeholder="请输入/请选择" class="h-m-select">
              <el-option v-for="item in checkSituationOptions" :key="item.value" :label="item.label" v-model="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="备注" prop="mark">
            <el-input v-model="addForm.mark" auto-complete="off"></el-input>
          </el-form-item>
          <el-col :span="8">
              <el-form-item label="项目地址-省" prop="province">
                <el-input v-model="addForm.province" auto-complete="off" placeholder="自动获取"></el-input>
              </el-form-item>
          </el-col>
          <el-col :span="8">
              <el-form-item label="项目地址-市" prop="city">
                <el-input v-model="addForm.city" auto-complete="off" placeholder="自动获取"></el-input>
              </el-form-item>
          </el-col>
          <el-col :span="8">
              <el-form-item label="项目地址-区" prop="prefecture">
                <el-input v-model="addForm.prefecture" auto-complete="off" placeholder="自动获取"></el-input>
              </el-form-item>
          </el-col>

          <el-form-item label="项目自填地址" prop="projectAddress">
            <el-input v-model="addForm.projectAddress" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="经度" prop="longitude">
            <el-input v-model="addForm.longitude" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="纬度" prop="latitude">
            <el-input v-model="addForm.latitude" auto-complete="off"></el-input>
          </el-form-item>
          <div class="amap-page-container">
            <el-amap vid="amapDemo" :center="center" :zoom="zoom" class="amap-demo" :events="events"></el-amap>
          </div>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click.native="addFormVisible = false">取消</el-button>
          <el-button type="primary" @click.native="addSubmit" :loading="addLoading">保存</el-button>
        </div>
      </el-dialog>
      <!-- 编辑界面 -->
      <el-dialog title="编辑" :visible.sync="editFormVisible" :close-on-click-modal="false">
        <el-form :model="editForm" label-width="120px" :rules="editFormRules" ref="editForm">
          <el-form-item label="项目名称" prop="projectName">
            <el-input v-model="editForm.projectName" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="父项目" prop="parentProjectName">
            <el-input v-model="editForm.parentProjectName" auto-complete="off" placeholder="可自动搜索"></el-input>
          </el-form-item>
          <el-form-item label="建筑结构" prop="buildingStructure">
            <el-input v-model="editForm.buildingStructure" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="使用面积" prop="buildingAcreage">
            <el-input v-model="editForm.buildingAcreage" auto-complete="off" placeholder="请输入数字"></el-input>
          </el-form-item>
          <el-form-item label="建筑高度" prop="buildingHeight">
            <el-input v-model="editForm.buildingHeight" auto-complete="off" placeholder="请输入数字"></el-input>
          </el-form-item>
          <el-form-item label="楼层分布" prop="floorDistribution">
            <el-input v-model="editForm.floorDistribution" auto-complete="off" placeholder="请输入 楼层/总楼层"></el-input>
          </el-form-item>
          <el-form-item label="成立时间" prop="creationTime">
            <el-date-picker type="date" placeholder="成立时间" v-model="editForm.creationTime"></el-date-picker>
          </el-form-item>
          <el-form-item label="交付时间" prop="finishTime">
            <el-date-picker type="date" placeholder="交付时间" v-model="editForm.finishTime"></el-date-picker>
          </el-form-item>
          <el-form-item label="消防车道" prop="fireControlRoad">
            <el-select :default-active="$route.path" @change="chickvalue" v-model="editForm.fireControlRoad" filterable placeholder="请输入/请选择" class="h-m-select">
              <el-option v-for="item in fireControlRoadOptions" :key="item.value" :label="item.label" v-model="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="耐火等级" prop="fireResistantLevel">
            <el-select :default-active="$route.path" @change="chickvalue" v-model="editForm.fireResistantLevel" filterable placeholder="请输入/请选择" class="h-m-select">
              <el-option v-for="item in fireResistantLevelOptions" :key="item.value" :label="item.label" v-model="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="危险等级" prop="dangerousLevel">
            <el-select :default-active="$route.path" @change="chickvalue" v-model="editForm.dangerousLevel" filterable placeholder="请输入/请选择" class="h-m-select">
              <el-option v-for="item in dangerousLevelOptions" :key="item.value" :label="item.label" v-model="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="探测器个数" prop="detectorNumber" >
            <el-input v-model="editForm.detectorNumber" auto-complete="off" placeholder="无需填写，系统自动计算" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="室内消火栓数量" prop="insideFireHydrant">
            <el-input v-model="editForm.insideFireHydrant" auto-complete="off" placeholder="无需填写，系统自动计算" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="室外消火栓数量" prop="outsideFireHydrant">
            <el-input v-model="editForm.outsideFireHydrant" auto-complete="off" placeholder="无需填写，系统自动计算" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="出口数量" prop="securityExitNumber">
            <el-input v-model="editForm.securityExitNumber" auto-complete="off" placeholder="请输入数字"></el-input>
          </el-form-item>
          <el-form-item label="验收情况" prop="checkSituation">
            <el-select :default-active="$route.path" @change="chickvalue" v-model="editForm.checkSituation" filterable placeholder="请输入/请选择" class="h-m-select">
              <el-option v-for="item in checkSituationOptions" :key="item.value" :label="item.label" v-model="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="备注" prop="mark">
            <el-input v-model="editForm.mark" auto-complete="off"></el-input>
          </el-form-item>
          <el-col :span="8">
            <el-form-item label="项目地址-省" prop="province">
              <el-input v-model="editForm.province" auto-complete="off" placeholder="自动获取"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="项目地址-市" prop="city">
              <el-input v-model="editForm.city" auto-complete="off" placeholder="自动获取"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="项目地址-区" prop="prefecture">
              <el-input v-model="editForm.prefecture" auto-complete="off" placeholder="自动获取"></el-input>
            </el-form-item>
          </el-col>
          <el-form-item label="项目自填地址" prop="projectAddress">
            <el-input v-model="editForm.projectAddress" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="经度" prop="longitude">
            <el-input v-model="editForm.longitude" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="纬度" prop="latitude">
            <el-input v-model="editForm.latitude" auto-complete="off"></el-input>
          </el-form-item>
          <div class="amap-page-container">
            <el-amap vid="amapDemo2" :center="center" :zoom="zoom" class="amap-demo" :events="events"></el-amap>
          </div>

        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click.native="editFormVisible = false">取消</el-button>
          <el-button type="primary" @click.native="editSubmit" :loading="addLoading">保存</el-button>
        </div>
      </el-dialog>
    </el-col>
  </el-row>
</template>

<!---->


<script>
  import API from '../../api/api_control_room'


  export default {
    name: "List",
    data() {
      let self = this;
      return {
        checkSituationOptions: [{
          value: '0',
          label: '未验收'
        }, {
          value: '1',
          label: '已验收'
        }, {
          value: '2',
          label: '处理中'
        }],
        dangerousLevelOptions: [{
        value: '1',
        label: '1级'
      }, {
        value: '2',
        label: '2级'
      }, {
        value: '3',
        label: '3级'
      }],
        fireResistantLevelOptions: [{
        value: '1',
        label: '1级'
      }, {
        value: '2',
        label: '2级'
      }, {
        value: '3',
        label: '3级'
      }],
        fireControlRoadOptions: [{
        value: '1',
        label: '环形'
      }, {
        value: '2',
        label: '矩形'
      }, {
        value: '3',
        label: '方形'
      }],
        addFormRules: {
          projectName: [{required: true, message: "请输入项目名称", trigger: "blur"}],
          projectAddress: [{required: true, message: "请输入项目地址", trigger: "blur"}]
        },
        addForm: {
          projectName: "",
          parentProjectName: "",
          buildingStructure: "",
          buildingAcreage: "",
          buildingHeight: "",
          floorDistribution: "",
          creationTime: "",
          finishTime: "",
          fireControlRoad: "",
          fireResistantLevel: "",
          dangerousLevel: "",
          detectorNumber: "",
          insideFireHydrant: "",
          outsideFireHydrant: "",
          securityExitNumber: "",
          checkSituation: "",
          projectAddress: '',
          province:'',
          city:'',
          prefecture:'',
          longitude:0,
          latitude:0,
          mark: ""
        },
        editFormRules: {
          projectName: [{required: true, message: "请输入项目名称", trigger: "blur"}],
          projectAddress: [{required: true, message: "请输入项目地址", trigger: "blur"}]
        },
        editForm: {
          projectName: "",
          parentProjectName: "",
          buildingStructure: "",
          buildingAcreage: "",
          buildingHeight: "",
          floorDistribution: "",
          creationTime: "",
          finishTime: "",
          fireControlRoad: "",
          fireResistantLevel: "",
          dangerousLevel: "",
          detectorNumber: "",
          insideFireHydrant: "",
          outsideFireHydrant: "",
          securityExitNumber: "",
          checkSituation: "",
          projectAddress: "",
          province:'',
          city:'',
          prefecture:'',
          longitude:0,
          latitude:0,
          mark: ""
        },
        chickvalue: false,
        zoom: 12,
        center: [121.59996, 31.197646],
        events: {
          click(e) {
            let {lng, lat} = e.lnglat;
            self.addForm.longitude = lng;
            self.addForm.latitude = lat;
            self.editForm.longitude = lng;
            self.editForm.latitude = lat;

            //  这里通过高德 SDK 完成。
            var geocoder = new AMap.Geocoder({
              radius: 1000,
              extensions: "all"
            });
            geocoder.getAddress([lng, lat], function (status, result) {
              if (status === 'complete' && result.info === 'OK') {
                if (result && result.regeocode) {
                  self.addForm.projectAddress = result.regeocode.formattedAddress;
                  self.addForm.province = result.regeocode.addressComponent.province;
                  self.addForm.city = result.regeocode.addressComponent.city;
                  if(self.addForm.city==null||self.addForm.city==''){
                    self.addForm.city=self.addForm.province;
                  }
                  self.addForm.prefecture = result.regeocode.addressComponent.district;

                  self.editForm.projectAddress = result.regeocode.formattedAddress;
                  self.editForm.province = result.regeocode.addressComponent.province;
                  self.editForm.city = result.regeocode.addressComponent.city;
                  if(self.editForm.city==null||self.editForm.city==''){
                    self.editForm.city=self.editForm.province;
                  }
                  self.editForm.prefecture = result.regeocode.addressComponent.district;
                  self.$nextTick();
                }
              }
            });
          }
        },

        limit: 3,
        total: 0,
        rows: [],
        currentPage: 1,
        addLoading: false,
        editFormVisible: false,
        addFormVisible: false,
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
          startRow: (that.page - 1) * that.limit,
        }
        API.getWtxBuildingProjectList(params).then(res => {
          console.log("========"+res);
          if (res.code === 0) {
            that.rows = res.data.objectList
            that.total = res.data.total
          }
        })
      },
      showEditDialog: function (index, row) {
        let that = this;
        that.editFormVisible = true;
        this.editForm = Object.assign({}, row);
      },
      showAddDialog: function () {
        let that = this;
        this.addFormVisible = true;
      },
      addSubmit: function () {
        let that = this;
        this.$refs.addForm.validate(valid => {
          if (valid) {
            that.loading = true;
            let params = Object.assign({}, this.addForm);
            API.addWtxBuildingProject(params).then(function (result) {
              if (0 === result.code) {
                that.loading = false;
                that.$message;
                that.$message.success({
                  showClose: true,
                  message: "新增成功",
                  duration: 2000
                });
                that.$refs["addForm"].resetFields();
                that.addFormVisible = false;
                let params = {
                  size: that.limit,
                  startRow: 0,
                }
                API.getWtxBuildingProjectList(params).then(res => {
                  if (res.code === 0) {
                    that.rows = res.data.objectList
                    that.total = res.data.total
                  }
                })
              } else {
                that.$message.error({
                  showClose: true,
                  message: "修改失败",
                  duration: 2000
                });
              }
            });
          }
        });
      },
      editSubmit: function () {
        let that = this;
        this.$refs.editForm.validate(valid => {
          if (valid) {
            that.loading = true;
            let params = Object.assign({}, that.editForm);
            API.updateWtxBuildingProject(params).then(function (result) {
              if (0 === result.code) {
                that.loading = false;
                that.$message.success({
                  showClose: true,
                  message: "修改成功",
                  duration: 2000
                });
                that.$refs["editForm"].resetFields();
                that.editFormVisible = false;
                let params = {
                  size: that.limit,
                  startRow: (that.currentPage-1)*that.limit,
                }
                API.getWtxBuildingProjectList(params).then(res => {
                  if (res.code === 0) {
                    that.rows = res.data.objectList
                    that.total = res.data.total
                  }
                })

              } else {
                that.$message.error({
                  showClose: true,
                  message: "修改失败",
                  duration: 2000
                });
              }
            });
          }
        });
      },
      deleteRow: function (index, row, rows) {
        let that = this;
        this.$confirm("确认删除该记录吗?", "提示", {type: "warning"})
          .then(() => {
            that.loading = true;
            API.deleteWtxBuildingProject({id: row.id})
              .then(
                function (result) {
                  that.loading = false;
                  if (result && parseInt(result.code) === 0) {
                    that.$message.success({
                      showClose: true,
                      message: "删除成功",
                      duration: 1500
                    });
                    rows.splice(index, 1);
                    if ((that.total - 1) % that.limit == 0 && (that.total - 1) != 0) {
                      that.currentPage = that.currentPage - 1;
                    }
                    that.page = that.currentPage
                    let params = {
                      size: that.limit,
                      startRow: (that.page - 1) * that.limit,
                    }
                    API.getWtxBuildingProjectList(params).then(res => {
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
