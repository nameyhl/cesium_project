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