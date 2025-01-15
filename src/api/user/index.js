import request from "@/utils/requset";

// 登录接口
export function login(data) {
  return request({
    url: "/user/login",
    method: "post",
    data: data
  });
}

// 注册接口
export function register(data) {
  return request({
    url: "/user/register",
    method: "post",
    data: data
  });
}

// 获取好友列表
export function getFriendList(data) {
  return request({
    url: "/friend/getFriend",
    method: "get",
    params: data
  });
}

// 获取用户信息
export function getUserInfo(data) {
  return request({
    url: "/user/getuser",
    method: "get",
    params: data
  });
}

// 查询用户
export function getUerByInfo(data) {
  return request({
    url: "/user/getuserbyinfo",
    method: "get",
    params: data
  })
}

export function updateUser(data) {
  return request({
    url: "/user/updateuser",
    method: "post",
    data: data
  })
}

// 管理员用户登录
export function adminLogin(data) {
  return request({
    url: "/user/adminLogin",
    method: "post",
    data: data
  });
} 