/*
 * @Descripttion: des
 * @version: v
 * @Author: ldh
 * @Date: 2020-07-07 16:28:17
 * @LastEditors: ldh
 * @LastEditTime: 2020-07-17 17:12:53
 */
import request from '@/utils/request'
// 系统设置---权限管理--列表
export function GetTableList({ Keywords, Page, Limit }) {
  return request({
    url: '/system_role/list',
    method: 'get',
    params: { Keywords, Page, Limit }
  })
}
// 系统设置---权限管理--修改密码
export function UpdatePassword(params = {}) {
  return request({
    url: '/xcxmenu/list',
    method: 'get',
    params
  })
}
// 系统设置---权限管理--权限设置
export function SettingLimits(data) {
  return request({
    url: '/xcxmenu/list',
    method: 'get',
    data
  })
}
// 系统设置---权限管理--删除
export function DeleteLimits(data) {
  return request({
    url: '/xcxmenu/list',
    method: 'post',
    data
  })
}
// 系统设置---权限管理--批量删除
export function DeleteBatch (data) {
  return request({
    url: '/xcxmenu/list',
    method: 'post',
    data
  })
}
// 系统设置---权限管理--新增管理
export function CreateManagement (data) {
  return request({
    url: '/xcxmenu/list',
    method: 'post',
    data
  })
}
// 系统设置---权限管理--新增角色
export function CreateRole ({ RoleName, Remark }) {
  return request({
    url: '/system_role/save',
    method: 'post',
    data: { RoleName, Remark }
  })
}
// 删除角色
export function deleteRole ({ RoleID }) {
  return request({
    url: '/system_role/delete',
    method: 'post',
    data: { RoleID }
  })
}

// 更新角色
export function updateRole ({ RoleID, RoleName, Remark }) {
  return request({
    url: '/system_role/update',
    method: 'post',
    data: { RoleID, RoleName, Remark }
  })
}

// 获取 菜单列表
export function getSystemMenus () {
  return request({
    url: '/system_menus/menus',
    method: 'get'
  })
}

// 授权
export function roleGrant(roleId, menuIds) {
  return request({
    url: '/system_role/grant',
    method: 'post',
    data: {
      RoleID: roleId,
      MenuIDs: menuIds
    }
  })
}
// 分配 帐号
export function allotAccounts(RoleID, Accounts) {
  return request({
    url: '/system_role/allot',
    method: 'post',
    data: { RoleID, Accounts }
  })
}
// 角色详情
export function getRoleInfo(roleId) {
  return request({
    url: '/system_role/info',
    method: 'get',
    params: { RoleID: roleId }
  })
}

// 管理员列表
export function getAccountList({ Keywords, Page, Limit }) {
  return request({
    url: '/s_admin/list',
    method: 'get',
    params: { Keywords, Page, Limit }
  })
}
// 创建管理员
export function createAccount(accountObjData) {
  return request({
    url: '/s_admin/save',
    method: 'post',
    data: accountObjData
  })
}
// 更新管理员
export function updateAccount(accountObjData) {
  return request({
    url: '/s_admin/update',
    method: 'post',
    data: accountObjData
  })
}
// 管理员信息
export function getAccountInfo(AdminID) {
  return request({
    url: '/s_admin/info',
    method: 'get',
    params: { AdminID }
  })
}

// 删除管理员
export function deleteAccount(AdminID) {
  return request({
    url: '/s_admin/delete',
    method: 'post',
    data: { AdminID }
  })
}

// 启用 禁用帐号
export function updateAccountStatus({ AdminID, AdminStatus }) {
  return request({
    url: '/s_admin/status',
    method: 'post',
    data: { AdminID, AdminStatus }
  })
}
