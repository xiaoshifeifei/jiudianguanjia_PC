/*
 * @Descripttion: des
 * @version: v
 * @Author: ldh
 * @Date: 2020-07-07 16:28:17
 * @LastEditors: ldh
 * @LastEditTime: 2020-07-17 09:22:53
 */
let dic = {
  dashboard: () => import('@/views/dashboard'), // 首页
  houseType: () => import('@/views/guestRoom/houseType'), // 客房管理/房型管理
  apartMent: () => import('@/views/guestRoom/apartMent'), // 客房管理/房间管理
  cleanOrder: () => import('@/views/bookingService/cleanOrder'), // 预订服务/清扫订单
  repairOrder: () => import('@/views/bookingService/repairOrder'), // 预订服务/维修订单
  roomServiceOrder: () => import('@/views/bookingService/roomServiceOrder'), // 预订服务/客房服务订单
  facilityOrder: () => import('@/views/bookingService/facilityOrder'), // 预订服务/设施预定订单
  checkOutOrder: () => import('@/views/bookingService/checkOutOrder'), // 预订服务/退房订单
  continuationOrder: () => import('@/views/bookingService/continuationOrder'), // 预订服务/续住订单
  rentCarOrder: () => import('@/views/bookingService/rentCarOrder'), // 预订服务/租车订单
  refundOrder: () => import('@/views/bookingService/refundOrder'), // 预订服务/退款订单
  wakeUpServe: () => import('@/views/bookingService/wakeUpServe'), // 预订服务/叫醒服务
  billingManager: () => import('@/views/bookingService/billingManager'), // 预订服务/开票管理
  carRentalMaintenance: () => import('@/views/bookingService/carRentalMaintenance'), // 预订服务/租车维护
  facilityMaintenance: () => import('@/views/bookingService/facilityMaintenance'), // 预订服务/设施维护
  serviceGoodsMaintenance: () => import('@/views/bookingService/serviceGoodsMaintenance'), // 预订服务/客房服务物品维护
  allorders: () => import('@/views/supermarket/allorders'), // 商超订单/全部订单
  conveniencestore: () => import('@/views/supermarket/conveniencestore'), // 商超订单/全部订单
  fooddelivered: () => import('@/views/supermarket/fooddelivered'), // 商超订单/全部订单
  localspecialty: () => import('@/views/supermarket/localspecialty'), // 商超订单/全部订单
  sextoy: () => import('@/views/supermarket/sextoy'), // 商超订单/全部订单
  breakage: () => import('@/views/supermarket/breakage'), // 商超订单/全部订单
  repertory: () => import('@/views/supermarket/repertory'), // 商超订单/全部订单
  convenienceStore: () => import('@/views/supermarket/conveniencestore'), // 商超订单/全部订单
  comment: () => import('@/views/comment'), // 评论管理
  infoManagement: () => import('@/views/marketingManagement/infoManagement'), // 营销管理/资讯管理
  noticeInfoManagement: () => import('@/views/marketingManagement/noticeInfoManagement'), // 移动端公告管理
  banner: () => import('@/views/marketingManagement/bannerManagement'), // 营销管理/banner管理
  berelieved: () => import('@/views/marketingManagement/secureFoodHouseInfManagement'), // 营销管理/安心食住信息管理
  financialFlowManagement: () => import('@/views/financialManagement/financialFlowManagement'), // 财务管理/财务流水管理
  settlement: () => import('@/views/financialManagement/settlement'), // 财务管理/结算
  jurisdiction: () => import('@/views/systemSet/jurisdiction'), // 系统管理/权限管理
  miniprogram: () => import('@/views/systemSet/miniprogram'), // 系统管理/小程序管理
  basic: () => import('@/views/systemSet/basicSet'), // 系统管理/基本设置
  // role: () => import('@/views/systemSet/jurisdiction/CreateRole'), // 系统管理/新建角色 hidden: true hidden: true hidden: true
  role: () => import('@/views/systemSet/jurisdiction'), // 系统管理/权限管理
  mana: () => import('@/views/systemSet/accountManage/AccountManage'), // 系统管理/新建管理 hidden: true hidden: true hidden: true
  addRole: () => import('@/views/systemSet/jurisdiction/CreateRole'), // 系统管理/新建管理 hidden: true hidden: true hidden: true
  refundindex: () => import('@/views/supermarket/refundindex') //商超退款订单 hidden: true hidden: true hidden: true
}
export default dic
