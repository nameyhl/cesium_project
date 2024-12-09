import request from "@/utils/request2";

export const myAI = (data) => {
    return request({
        url: 'https://spark-api-open.xf-yun.com/v1/chat/completions',
        method: 'get',
        params: data
    })
}