/*
 * @Author: your name
 * @Date: 2020-06-01 09:46:58
 * @LastEditTime: 2020-06-01 17:09:31
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue_B_template\src\api\supermarket.js
 */
import request from '@/utils/request'

// 获取全部订单
export function GetAllOrder(params) {
  return request({
    url: '/supermarket/order/goods',
    method: 'get',
    params
  })
}
// 获取便利店订单
export function GetConveniencestore(params) {
  return request({
    url: '/supermarket_order/index',
    method: 'get',
    params
  })
}
// 获取便利店订单详情
export function GetConveniencestoreDetail(params) {
  return request({
    url: '/supermarket_order/show',
    method: 'get',
    params
  })
}
// 便利店订单接单
export function GetConveniencestoreAccept(params) {
  return request({
    url: '/supermarket_order/receive',
    method: 'POST',
    params
  })
}
// 便利店订单拒绝
export function GetConveniencestoreRefused(params) {
  return request({
    url: '/supermarket_order/cancel',
    method: 'POST',
    params
  })
}
// 酒店客房数据
export function GetConveniencestoreRoom(params) {
  return request({
    url: '/supermarket/order/hotelroom',
    method: 'get',
    params
  })
}
// 订单商品数据
export function GetConveniencestoreGoods(params) {
  return request({
    url: '/supermarket/order/goods',
    method: 'get',
    params
  })
}
// 便利店新建补单
export function GetConveniencestoreNew(data) {
  return request({
    url: '/supermarket_order/create',
    method: 'post',
    data
  })
}
// 便利店待配送(完成)
export function GetConveniencestoreFinish(params) {
  return request({
    url: '/supermarket_order/delivery',
    method: 'post',
    params
  })
}
// 便利店待配送(退款)
export function GetConveniencestoreOut(params) {
  return request({
    url: '/supermarket_order/refund',
    method: 'post',
    params
  })
}
// 土特产列表
export function localdata(params) {
  return request({
    url: '/local_specialty_order/index',
    method: 'GET',
    params
  })
}
// 土特产详情
export function localDetail(params) {
  return request({
    url: '/local_specialty_order/show',
    method: 'GET',
    params
  })
}
// 获取送餐服务订单
export function GetFoodDelivered(params) {
  return request({
    url: '/getFoodDelivered',
    method: 'get',
    params
  })
}
// 获取土特产订单
export function GetLocalspecialty(params) {
  return request({
    url: '/getLocalspecialty',
    method: 'get',
    params
  })
}
// 获取情趣用品订单列表
export function GetSextoy(params) {
  return request({
    url: '/sex_toy_order/index',
    method: 'get',
    params
  })
}
// 获取情趣用品订单详情
export function GetSextoyDetail(params) {
  return request({
    url: '/sex_toy_order/show',
    method: 'get',
    params
  })
}
// 获取情趣用品接单
export function GetSextoyAccept(params) {
  return request({
    url: '/sex_toy_order/receive',
    method: 'POST',
    params
  })
}
// 获取情趣用品拒绝
export function GetSextoyRefused(params) {
  return request({
    url: '/sex_toy_order/cancel',
    method: 'POST',
    params
  })
}
// 获取情趣用品退款
export function GetSextoyOut(params) {
  return request({
    url: '/sex_toy_order/refund',
    method: 'POST',
    params
  })
}
// 退款列表
export function refundIndex(params) {
  return request({
    url: '/refund_order/index',
    method: 'GET',
    params
  })
}
// 退款详情
export function refundDetail(params) {
  return request({
    url: '/refund_order/show',
    method: 'GET',
    params
  })
}
// 退款通过
export function refundFinish(params) {
  return request({
    url: '/refund_order/pass',
    method: 'POST',
    params
  })
}
// 退款拒绝
export function refundRefused(params) {
  return request({
    url: '/refund_order/reject',
    method: 'POST',
    params
  })
}
// 商超库存列表
export function hotelGoods(params) {
  return request({
    url: '/hotel_goods_sku/index',
    method: 'GET',
    params
  })
}
// 商超库存详情
export function hotelDetail(params) {
  return request({
    url: '/hotel_goods_sku/detail',
    method: 'GET',
    params
  })
}
