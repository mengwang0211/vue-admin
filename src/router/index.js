import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Dashboard from '@/components/Dashboard'
import Index from '@/components/welcome/index.vue'

import BookList from '@/components/role/list'

import UserList from '@/components/user/list'
import UserChangePwd from '@/components/user/changepwd'
import UserProfile from '@/components/user/profile'

import MenuList from '@/components/menu/list'

import FileList from '../components/file/List.vue'

import LogList from '../components/log/List'

//---------------------------------------------------------------------
//-------------------------消控室--------------------------------------
import addressList from '../components/controlroom/addressList'
import wtxAlarmRecordList from '../components/controlroom/wtxAlarmRecordList'
import wtxBuildingProjectList from '../components/controlroom/wtxBuildingProjectList'
import wtxCheckFacilityRecordList from '../components/controlroom/wtxCheckFacilityRecordList'
import wtxFacilityInfoList from '../components/controlroom/wtxFacilityInfoList'
import wtxManagerInfoList from '../components/controlroom/wtxManagerInfoList'
import wtxPetrolInfoList from '../components/controlroom/wtxPetrolInfoList'
import wtxPostInfoList from '../components/controlroom/wtxPostInfoList'
import wtxTransferEquipmentList from '../components/controlroom/wtxTransferEquipmentList'
import wtxWatchkeeperScheduleList from '../components/controlroom/wtxWatchkeeperScheduleList'
//-------------------------消控室--------------------------------------
//---------------------------------------------------------------------


import amap from '../components/map/Amap'

// 懒加载方式，当路由被访问的时候才加载对应组件
const Login = resolve => require(['@/components/Login'], resolve)

Vue.use(Router)

let router = new Router({
  mode: 'hash',
  routes: [
    {
      path: '/index',
      name: '首页',
      component: Index
    },
    {
      path: '/login',
      name: '登录',
      component: Login
    },
    {
      path: '/amap',
      name: '地图',
      component: amap
    },
    {
      path: '/',
      name: 'home',
      component: Home,
      redirect: '/dashboard',
      leaf: true, // 只有一个节点
      menuShow: true,
      iconCls: 'fa fa-home', // 图标样式class
      children: [
        {path: '/dashboard', component: Dashboard, name: '首页', menuShow: true},
        {path: '/user/profile', component: UserProfile, name: '用户信息', menuShow: true},
        {path: '/user/changepwd', component: UserChangePwd, name: '更改密码', menuShow: true}
      ]
    },
    {
      path: '/',
      component: Home,
      name: '用户管理',
      menuShow: true,
      leaf: true, // 只有一个节点
      iconCls: 'fa fa-user', // 图标样式class
      children: [
        {path: '/admin/user', component: UserList, name: '用户列表', menuShow: true},
      ]
    },
    {
      path: '/',
      component: Home,
      name: '菜单管理',
      menuShow: true,
      leaf: true, // 只有一个节点
      iconCls: 'fa fa-server', // 图标样式class
      children: [
        {path: '/admin/menu', component: MenuList, name: '菜单列表', menuShow: true}
      ]
    },
    {
      path: '/',
      component: Home,
      name: '角色管理',
      menuShow: true,
      leaf: true,
      iconCls: 'fa fa-group',
      children: [
        {path: '/admin/role', component: BookList, name: '角色管理', menuShow: true},
      ]
    },

    {
      path: '/',
      component: Home,
      name: '文件管理',
      menuShow: true,
      leaf: true,
      iconCls: 'fa fa-group',
      children: [
        {path: '/cms/file', component: FileList, name: '文件管理', menuShow: true},
      ]
    },
    {
      path: '/',
      component: Home,
      name: '日志管理',
      menuShow: true,
      leaf: true,
      iconCls: 'fa fa-group',
      children: [
        {path: '/base/log', component: LogList, name: '日志管理', menuShow: true},
      ]
    },
    {
      path: '/',
      component: Home,
      name: '设置',
      menuShow: true,
      iconCls: 'iconfont icon-setting1',
      children: [
        {path: '/user/profile', component: UserProfile, name: '个人信息', menuShow: true},
        {path: '/user/changepwd', component: UserChangePwd, name: '修改密码', menuShow: true}
      ]
    },
//---------------------------------------------------------------消控室路由-----------------------------------------------------------------------------------------------

    {
      path: '/',
      component: Home,
      name: '地址管理',
      menuShow: true,
      iconCls: 'fa fa-flag',
      children: [
        {path: '/control/cityArea', component: addressList, name: '地址管理', menuShow: true},
      ]
    },

    {
      path: '/',
      component: Home,
      name: '报警管理',
      menuShow: true,
      iconCls: 'iconfont icon-setting1',
      children: [
        {path: '/control/alarmRecord', component: wtxAlarmRecordList, name: '报警管理', menuShow: true},
      ]
    },

    {
      path: '/',
      component: Home,
      name: '项目管理',
      menuShow: true,
      iconCls: 'iconfont icon-setting1',
      children: [
        {path: '/control/buildingProject', component: wtxBuildingProjectList, name: '项目管理', menuShow: true},
      ]
    },

    {
      path: '/',
      component: Home,
      name: '巡检设备管理',
      menuShow: true,
      iconCls: 'iconfont icon-setting1',
      children: [
        {path: '/control/checkFacilityRecord', component: wtxCheckFacilityRecordList, name: '巡检设备管理', menuShow: true},
      ]
    },

    {
      path: '/',
      component: Home,
      name: '设备信息管理',
      menuShow: true,
      iconCls: 'iconfont icon-setting1',
      children: [
        {path: '/control/facilityInfo', component: wtxFacilityInfoList, name: '设备信息管理', menuShow: true},
      ]
    },

    {
      path: '/',
      component: Home,
      name: '建筑负责人管理',
      menuShow: true,
      iconCls: 'iconfont icon-setting1',
      children: [
        {path: '/control/managerInfo', component: wtxManagerInfoList, name: '建筑负责人管理', menuShow: true},
      ]
    },

    {
      path: '/',
      component: Home,
      name: '建筑巡更人员管理',
      menuShow: true,
      iconCls: 'iconfont icon-setting1',
      children: [
        {path: '/control/petrolInfo', component: wtxPetrolInfoList, name: '建筑巡更人员管理', menuShow: true},
      ]
    },

    {
      path: '/',
      component: Home,
      name: '人员职位管理',
      menuShow: true,
      iconCls: 'iconfont icon-setting1',
      children: [
        {path: '/control/postInfo', component: wtxPostInfoList, name: '人员职位管理', menuShow: true},
      ]
    },

    {
      path: '/',
      component: Home,
      name: '建筑传输装置管理',
      menuShow: true,
      iconCls: 'iconfont icon-setting1',
      children: [
        {path: '/control/transferEquipment', component: wtxTransferEquipmentList, name: '建筑传输装置管理', menuShow: true},
      ]
    },

    {
      path: '/',
      component: Home,
      name: '值班管理',
      menuShow: true,
      iconCls: 'iconfont icon-setting1',
      children: [
        {path: '/control/watchkeeperSchedule', component: wtxWatchkeeperScheduleList, name: '值班管理', menuShow: true},
      ]
    },


//---------------------------------------------------------------消控室路由-----------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  ]
})

router.beforeEach((to, from, next) => {
  // console.log('to:' + to.path)
  if (to.path.startsWith('/login')) {
    window.localStorage.removeItem('access-token')
    //window.localStorage.removeItem('access-user')
    next()
  } else if (to.path.startsWith('/index')) {
    next()
  } else {
    //let user = JSON.parse(window.localStorage.getItem('access-token'))
    let user = window.localStorage.getItem('access-token');
    if (!user) {
      next({path: '/login'})
    } else {
      next()
    }
  }
})

export default router
