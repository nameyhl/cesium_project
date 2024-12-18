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