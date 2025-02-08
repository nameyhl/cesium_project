import request from "@/utils/requset";

export const getReply = (data) => {
  return request({
    url: "/AI/getXFAI",
    method: "get",
    params: data,
  });
};

export const deepSeekAI = ( data ) => {
  return request({
    url: "/AI/getDeepSeek",
    method: "get",
    params: data,
  });
}
