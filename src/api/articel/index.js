import request from '@/utils/requset'

// 发布文章接口
export function addArticle(data) {
  return request({
    url: 'article/addArticle',
    method: 'post',
    data: data
  })
}