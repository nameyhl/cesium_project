export function initUrl() {
    return new Promise((resolve, reject) => {
      // 初始化问题值为空字符串
      let questionValue = "";
  
      // 引入加密和 WebSocket 模块
      const crypto = require("crypto");
      const ws = require("ws");
  
      // 获取当前时间的 GMT 字符串
      const dateString = new Date().toGMTString();
  
      // 定义星火 API 的主机和路径
      const host = "spark-api.xf-yun.com";
      const path = "/v1.1/chat";
  
      // 构建用于签名的请求头
      let tmp = `host: ${host}\ndate: ${dateString}\nGET ${path} HTTP/1.1`;
  
      const APISecret = "NzEzNzRiNzVlYTVjZGFlYjRhNmUzNGVj"; // 星火 APISecret 这里直接填入你自己的APISecret即可 格式如：ZjAafHbiODRdMjiyamM1azc3Yju1gMy1
      let signature = crypto
        .createHmac("sha256", APISecret)
        .update(tmp)
        .digest("base64");
  
      const APIKey = "069f266c5efb0ca4632eef14280e3587"; // 星火 APIKey 这里直接填入你自己的APISecret即可 格式如：4220a1b1881d40e8d70eb23fd1225cd1
      const authorization_origin = `api_key="${APIKey}", algorithm="hmac-sha256", headers="host date request-line", signature="${signature}"`;
  
      // 将授权信息编码为 Base64 格式
      let buff = Buffer.from(authorization_origin);
      const authorization = buff.toString("base64");
  
      // 构建访问星火 API 的 WebSocket URL
  
      const signUrl = `wss://${host}${path}?authorization=${authorization}&date=${encodeURIComponent(
        dateString
      )}&host=${host}`;
      console.log(signUrl);
  
      // 创建 WebSocket 连接
      let sock = new ws(signUrl);
  
      // 当连接打开时发送聊天请求
      sock.on("open", function () {
        console.log("讯飞星火连接sock连接成功!!!!");
        sock.send(
          JSON.stringify({
            header: {
              app_id: "7d307d72", // 星火应用程序 ID  APPID 格式为 dbfab529
            },
            parameter: {
              chat: {
                domain: "lite",
                temperature: 0.5,
                max_tokens: 1024,
              },
            },
            payload: {
              message: {
                text: [
                  {
                    role: "user",
                    content: "js中数组去重的方法有哪些？",
                  },
                ],
              },
            },
          })
        );
      });
  
      // 监听连接的错误事件
      sock.on("error", function (err) {
        console.log("error: ", err);
        reject(err);
      });
  
      // 监听消息事件，处理 API 响应
      sock.on("message", function (data) {
        const a = data.toString("utf-8");
        // 解析 API 响应的 JSON 数据
        console.log(a);
  
        const obj = JSON.parse(a);
  
        // 提取文本消息
        const texts = obj.payload.choices.text;
  
        console.log(texts);
  
        // 将文本消息拼接到问题值中
        texts.forEach((item) => {
          questionValue += item.content;
        });
      });
  
      // 监听连接关闭事件，将结果通过 resolve 返回
      sock.on("close", function () {
        resolve(questionValue);
      });
    });
  }
  
  