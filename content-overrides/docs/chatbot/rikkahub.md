# RikkaHub 与移动聊天客户端

支持自定义 OpenAI-compatible Provider 的移动客户端，可接入 Oproxy。

## 推荐流程

1. 在 Oproxy 创建移动端专用 Key，并设置额度与有效期。
2. 新增 OpenAI 兼容 Provider。
3. Base URL 填写 `https://api.oproxy.world/v1`。
4. API Key 填写完整 Oproxy Key。
5. 模型名使用模型定价页中的精确 ID。
6. 保存并发送最小请求。

![Oproxy API 端点](/images/oproxy-steps/api-endpoints.png)

*图：移动客户端通常使用 Oproxy 网关域名加 `/v1` 作为 OpenAI-compatible Base URL。*

## 移动端安全

- 使用设备锁、生物识别和受信任系统。
- 不在第三方键盘、剪贴板同步或截图中保留 Key。
- 丢失设备时立即禁用该 Key。
- 避免在公共 Wi‑Fi 上处理敏感信息。

## 图片与推理

如果客户端提供图片、推理或工具开关，先确认模型支持，再逐项启用。请求失败时关闭额外能力，用纯文本验证基础连接。

## Oproxy 自带聊天

控制台 **聊天/智能体应用** 提供 LibreChat 入口。如果打开后显示 Cloudflare Tunnel 错误，通常表示聊天应用正在维护；可暂时使用第三方客户端并关注控制台公告。

![Oproxy 聊天和智能体应用中心](/images/oproxy-steps/app-centre.png)

*图：控制台应用中心中的聊天/智能体入口；实际可用性以页面公告为准。*
