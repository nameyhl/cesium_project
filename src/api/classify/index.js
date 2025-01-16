import request from "@/utils/requset"; // 引入封装好的axios

// 查询分类接口
export function getClassify() {
  return request({
    url: "/classify/getClassify",
    method: "get",
  });
}

// 查询没有父类的分类
export function getClassifyWithoutParent() {
  return request({
    url: "/classify/getClassifyWithoutParent",
    method: "get",
  });
}

// 修改分类
export function updateClassify(data) {
  return request({
    url: "/classify/updateClassify",
    method: "post",
    data,
  });
}

// 新增分类
export function addClassify(data) {
  return request({
    url: "/classify/addClassify",
    method: "post",
    data,
  });
}

// 删除分类
export function deleteClassify(id) {
  return request({
    url: "/classify/deleteClassify",
    method: "post",
    data: {
      id,
    },
  });
}
