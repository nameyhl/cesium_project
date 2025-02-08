import request from '@/utils/requset'

// 发布文章接口
export function addArticle(data) {
  return request({
    url: 'article/addArticle',
    method: 'post',
    data: data
  })
}

// 获取文章列表接口
export function getArticel() {
  return request({
    url: 'article/getArticel',
    method: 'get',
  })
}

// 获取文章详情接口
export function getArticelDetail(id) {
  return request({
    url: 'article/getArticelById',
    method: 'get',
    params: { id }
  })
}

// 获取所有文章接口
export function getAllArticel() {
  return request({
    url: 'article/getAllArticel',
    method: 'get',
  })
}

// 修改文章状态
export function updateArticelState(data){
  return request({
    url: 'article/updateArticleState',
    method: 'post',
    data: data
  })
}

// 删除文章接口
export function deleteArticel(data) {
  return request({
    url: 'article/deleteArticle',
    method: 'delete',
    params: data
  })
}