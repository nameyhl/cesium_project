import request from "@/utils/requset";

export function login(data) {
  return request({
    url: "/user/login",
    method: "post",
    data: data
  });
}