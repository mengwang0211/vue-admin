/**
 * .
 * 消控室相关api
 */
import * as API from './'

export default {
  //获取消控室地址管理list
  findList: params => {
    return API.GET('/control/cityArea', params)
  },

  //消控室报警管理
  getWtxAlarmRecordList: params =>{
    return API.GET('/control/alarmRecord', params)
  },

  deleteWtxAlarmRecord: params =>{
    return API.DELETE('/control/alarmRecord', params)
  },

  //建筑项目管理
  getWtxBuildingProjectList: params =>{
    return API.GET('/control/buildingProject', params)
  },
  deleteWtxBuildingProject: params =>{
    return API.DELETE('/control/buildingProject', params)
  },

//===========================================================================

  //建筑巡更人员管理
  getWtxPetrolInfoList: params=>{
    return API.GET('/control/petrolInfo',params)
  },

  //人员职位管理
  getWtxPostInfoList: params=>{
    return API.GET('/control/postInfo',params)
  },

  //建筑传输装置管理
  getWtxTransferEquipmentList:params=>{
    return API.GET('/control/transferEquipment',params)
  },

  //值班管理
  getWtxWatchkeeperScheduleList:params=>{
    return API.GET('/control/watchkeeperSchedule',params)
  },
  //建筑负责人管理
  getWtxManagerInfoList: params=>{
    return API.GET('/control/managerInfo',params)
  },

  //巡检设备管理
  getWtxCheckFacilityRecordList:params=>{
    return API.GET('/control/checkFacilityRecord',params)
  },

  //设备信息管理
  getWtxFacilityInfoList: params=>{
    return API.GET('/control/facilityInfo',params)
  },
}
