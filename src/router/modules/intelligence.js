/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

export const intelligence = [
  {
    path: '/setup',
    name: 'setup',
    component: () => import('@/views/setup/index'),
    hidden: true
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'dashboard',
        component: () => import('@/views/dashboard'),
        meta: {
          title: '首页',
          icon: 'dashboard',
          affix: true
        }
      }
    ]
  },
{
  path: '/guestRoom',
  component: Layout,
  meta: { title: '客房管理', icon: 'roomservice' },
  children: [
    {
      path: 'houseType',
      component: resolve => require(['@/views/guestRoom/houseType'], resolve),
      name: 'houseType',
      meta: { title: '房型管理' }
    },
    {
      path: 'apartMent',
      component: resolve => require(['@/views/guestRoom/apartMent'], resolve),
      name: 'apartMent',
      meta: { title: '房间管理' }
    },
  ]
},
{
  path: '/bookingService',
  component: Layout,
  redirect: '/bookingService/cleanOrder',
  name: 'bookingService',
  meta: {
    title: '预订服务',
    icon: 'yuding'
  },
  children: [
    {
      path: 'cleanOrder',
      component: resolve =>
        require(['@/views/bookingService/cleanOrder'], resolve),
      name: 'cleanOrder',
      meta: { title: '清扫订单' }
    },
    {
      path: 'repairOrder',
      component: resolve =>
        require(['@/views/bookingService/repairOrder'], resolve),
      name: 'repairOrder',
      meta: { title: '维修订单' }
    },
    {
      path: 'roomServiceOrder',
      component: resolve =>
        require(['@/views/bookingService/roomServiceOrder'], resolve),
      name: 'roomServiceOrder',
      meta: { title: '客房服务订单' }
    },
    {
      path: 'facilityOrder',
      component: resolve =>
        require(['@/views/bookingService/facilityOrder'], resolve),
      name: 'facilityOrder',
      meta: { title: '设施预定订单' }
    },

    {
      path: 'checkOutOrder',
      component: resolve =>
        require(['@/views/bookingService/checkOutOrder'], resolve),
      name: 'checkOutOrder',
      meta: { title: '退房订单' }
    },

    {
      path: 'continuationOrder',
      component: resolve =>
        require(['@/views/bookingService/continuationOrder'], resolve),
      name: 'continuationOrder',
      meta: { title: '续住订单' }
    },

    {
      path: 'rentCarOrder',
      component: resolve =>
        require(['@/views/bookingService/rentCarOrder'], resolve),
      name: 'rentCarOrder',
      meta: { title: '租车订单' }
    },
    // {
    //   path: 'refundOrder',
    //   component: resolve => require(['@/views/bookingService/refundOrder'], resolve),
    //   name: 'refundOrder',
    //   meta: { title: '退款订单' }
    // },
    {
      path: 'wakeUpServe',
      component: resolve =>
        require(['@/views/bookingService/wakeUpServe'], resolve),
      name: 'wakeUpServe',
      meta: { title: '叫醒服务' }
    },

    {
      path: 'billingManager',
      component: resolve =>
        require(['@/views/bookingService/billingManager'], resolve),
      name: 'billingManager',
      meta: { title: '开票管理' }
    },

    {
      path: 'carRentalMaintenance',
      component: resolve =>
        require(['@/views/bookingService/carRentalMaintenance'], resolve),
      name: 'carRentalMaintenance',
      meta: { title: '租车维护' }
    },

    {
      path: 'facilityMaintenance',
      component: resolve =>
        require(['@/views/bookingService/facilityMaintenance'], resolve),
      name: 'facilityMaintenance',
      meta: { title: '设施维护' }
    },
    {
      path: 'serviceGoodsMaintenance',
      component: resolve =>
        require(['@/views/bookingService/serviceGoodsMaintenance'], resolve),
      name: 'serviceGoodsMaintenance',
      meta: { title: '客房服务物品' }
    },
    {
      path: 'menu1-1',
      component: resolve =>
        require(['@/views/bookingService/settingUp'], resolve),
      hidden: true
    }
  ]
},
{
  path: '/supermarket',
  component: Layout,
  meta: {
    title: '商超订单',
    icon: 'shopping'
  },
  redirect: '/supermarket/allorders',
  children: [
    // {暂时不开发
    //   path: 'allorders',
    //   component: resolve => require(['@/views/supermarket/allorders'], resolve),
    //   name: 'allorders',
    //   meta: { title: '全部订单' }
    // },
    {
      path: 'conveniencestore',
      component: resolve => require(['@/views/supermarket/conveniencestore'], resolve),
      name: 'conveniencestore',
      meta: { title: '便利店订单' }
    },
    // {
    //   path: 'fooddelivered',
    //   component: resolve => require(['@/views/supermarket/fooddelivered'], resolve),
    //   name: 'fooddelivered',
    //   meta: { title: '送餐服务订单' }
    // },
    {
      path: 'localspecialty',
      component: resolve => require(['@/views/supermarket/localspecialty'], resolve),
      name: 'localspecialty',
      meta: { title: '土特产订单' }
    },
    {
      path: 'sextoy',
      component: resolve => require(['@/views/supermarket/sextoy'], resolve),
      name: 'sextoy',
      meta: { title: '情趣用品订单' }
    },
    {
      path: 'refundindex',
      component: resolve => require(['@/views/supermarket/refundindex'], resolve),
      name: 'refundindex',
      meta: { title: '退款订单' }
    },
    {
      path: 'maintain',
      meta: { title: '商超库存维护' },
      component: resolve => require(['@/views/supermarket/maintain'], resolve),
      redirect: '/maintain/repair',
      children: [
        // {
        //   path: '/repair',
        //   component: resolve => require(['@/views/supermarket/repairOrder'], resolve),
        //   name: 'repair',
        //   meta: { title: '补单订单' }
        // },
        {
          path: '/repertory',
          component: resolve => require(['@/views/supermarket/repertory'], resolve),
          name: 'repertory',
          meta: { title: '商超库存' }
        },
        {
          path: 'breakage',
          component: resolve => require(['@/views/supermarket/breakage'], resolve),
          name: 'breakage',
          meta: { title: '报损管理' }
        }
      ]
    }
  ]
},
{
  path: '/comment',
  component: Layout,
  // redirect: '/comment/list',
  children: [
    {
      path: '/comment',
      component: resolve => require(['@/views/comment'], resolve),
      name: 'comment',
      meta: {
        title: '评论管理',
        icon: 'comit'
      }
    }
  ]
},
{
  path: '/marketingManagement',
  component: Layout,
  meta: {
    title: '营销管理',
    icon: 'tobuy'
  },
  redirect: '/marketingManagement/infoManagement',
  children: [
    {
      path: 'infoManagement',
      component: resolve =>
        require(['@/views/marketingManagement/infoManagement'], resolve),
      name: 'infoManagement',
      meta: { title: '资讯管理' }
    },
    {
      path: 'banner',
      component: resolve =>
        require(['@/views/marketingManagement/bannerManagement'], resolve),
      name: 'banner',
      meta: { title: 'banner管理' }
    },
    {
      path: 'secureFoodHouseInfManagement',
      component: resolve =>
        require([
          '@/views/marketingManagement/secureFoodHouseInfManagement'
        ], resolve),
      name: 'secureFoodHouseInfManagement',
      meta: { title: '安心食住信息管理' }
    },
    {
      path: 'noticeInfoManagement',
      component: resolve =>
        require([
          '@/views/marketingManagement/noticeInfoManagement'
        ], resolve),
      name: 'noticeInfoManagement',
      meta: { title: '移动端公告信息管理' }
    }
  ]
},
{
  path: '/financialManagement',
  component: Layout,
  meta: {
    title: '财务管理',
    icon: 'count'
  },
  redirect: '/financialManagement/financialFlowManagement',
  children: [
    {
      path: 'financialFlowManagement',
      component: resolve => require(['@/views/financialManagement/financialFlowManagement'], resolve),
      name: 'financialFlowManagement',
      meta: { title: '财务流水管理' }
    },
    {
      path: 'settlement',
      component: resolve =>
        require(['@/views/financialManagement/settlement'], resolve),
      name: 'settlement',
      meta: { title: '结算' }
    }
  ]
},
{
  path: '/systemSet',
  component: Layout,
  meta: {
    title: '系统管理',
    icon: 'sisync'
  },
  // redirect: '/systemSet/jurisdiction',
  children: [
    {
      path: 'jurisdiction',
      component: resolve => require(['@/views/systemSet/jurisdiction'], resolve),
      name: 'jurisdiction',
      meta: { title: '权限管理' }
    },
    {
      path: 'addRole',
      name: 'addRole',
      meta: { title: '新增角色' },
      hidden: true,
      component: resolve => require(['@/views/systemSet/jurisdiction/CreateRole'], resolve)
    },
    {
      path: 'role',
      name: 'role',
      meta: { title: '角色管理' },
      component: resolve =>
        require(['@/views/systemSet/jurisdiction'], resolve),
      hidden: true
    },
    {
      path: 'mana',
      name: 'mana',
      meta: { title: '管理员管理' },
      component: resolve =>
        require(['@/views/systemSet/accountManage/AccountManage'], resolve),
      hidden: true
    },
    {
      path: 'miniprogram',
      component: resolve =>
        require(['@/views/systemSet/miniprogram'], resolve),
      name: 'miniprogram',
      meta: { title: '小程序管理' }
    },
    {
      path: 'basic',
      component: resolve => require(['@/views/systemSet/basicSet'], resolve),
      name: 'basic',
      meta: { title: '基本设置' }
    }
  ]
}
/*
  * {
  *   path: '*',
  *   redirect: '/404',
  *   hidden: true
  * }
  */
]
