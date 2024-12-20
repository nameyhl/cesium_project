import request from '@/utils/requset'

// 希望添加用户为好友
export function getApplyFriendList(data) {
  return request({
    url: 'applyFriend/getApplyFriend',
    method: 'get',
    params: data
  })
}

// 用户希望添加的好友
export function getMyApplyList(data) {
  return request({
    url: 'applyFriend/getMyApply',
    method: 'get',
    params: data
  })
}

// 修改好友申请状态
export function updateApplyFriend(data) {
  return request({
    url: 'applyFriend/updateApplyState',
    method: 'post',
    data: data
  })
}