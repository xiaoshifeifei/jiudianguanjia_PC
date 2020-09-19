import request from "@/utils/request";
// /system_menus/menus
// /system_role/admin_grant
export function getRouterList() {
  return request({
    url: "/system_role/admin_grant",
    method: "get"
  });
}