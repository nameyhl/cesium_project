import request from "@/utils/request2";

export const showWeChat = (data) => {
    return request({
        url: 'api/tx/pyqwenan',
        method: 'get',
        params: data
    })
}