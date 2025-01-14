import request from "@/utils/requset"; // 引入封装好的axios

// 查询分类接口
export function getClassify() {
  return request({
    url: "/classify/getClassify",
    method: "get",
  });
}