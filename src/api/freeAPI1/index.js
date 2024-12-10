import request from "../../utils/requset1";


// 获取一句话
export const getData = () => {
    return request({
        url: 'api/ian/rand?type=json',
        method: 'get'
    })
}

// 获取一张图片
export const getImg = () => {
    return request({
        url: 'api/moyu?type=json',
        method: 'get'
    })
}