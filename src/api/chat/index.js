// chat相关API

import request from "@/utils/requset"; // 引入封装好的axios

// 将问答数据插入到数据库
export function setChat(data) {
  return request({
    url: '/chat/setchat',
    method: 'post',
    data: data
  })
}

// 获取最近2天的问答数据
export function getChat(data) {
  return request({
    url: '/chat/getHistryInfo',
    method: 'get',
    params: data
  })
}

// 分页查询问答数据
export function getChatPage(data) {
  return request({
    url: '/chat/getHistryByLimit',
    method: 'get',
    params: data
  })
}