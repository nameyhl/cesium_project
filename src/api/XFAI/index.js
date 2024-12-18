import request from "@/utils/requset";

export const getReply = (data) => {
  return request({
    url: "/XFAI/getAnswer",
    method: "get",
    params: data,
  });
};
