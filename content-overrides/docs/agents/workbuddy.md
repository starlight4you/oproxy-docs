# WorkBuddy 等桌面代理接入

支持自定义 OpenAI 兼容模型的桌面代理，可通过 Oproxy 接入。

## 表单填写

| 字段 | 推荐值 |
| --- | --- |
| Provider | Custom / OpenAI compatible |
| Endpoint | `https://api.oproxy.world/v1/chat/completions` |
| API Key | `YOUR_OPROXY_API_KEY` |
| Model Name | 模型定价页中的完整模型 ID |
| Tool Calling | 仅在目标模型支持时开启 |
| Image Input | 仅在目标模型支持时开启 |
| Reasoning | 按模型能力和客户端版本开启 |

有些客户端要求完整请求地址，有些只接收 Base URL。若字段名是 **Endpoint**，优先填写完整 `/v1/chat/completions`；若字段名是 **Base URL**，填写 `https://api.oproxy.world/v1`。

![Oproxy API 端点](/images/oproxy-steps/api-endpoints.png)

*图：复制页面提供的网关域名，再按客户端字段要求补充 `/v1` 或完整请求路径。*

## 保存后验证

1. 确认模型出现在自定义模型列表。
2. 新建对话并发送最小消息。
3. 回到 Oproxy 使用记录，确认模型、端点和 User-Agent。
4. 再测试图片和工具调用。

![模型监控页面](/images/oproxy-steps/model-monitor.png)

*图：客户端连接异常时，可同时查看模型状态、延迟和端点 PING。*

## 常见问题

- 模型不出现：重新打开模型选择器或新建会话。
- `401`：Key 不完整、已禁用或字段放错。
- 模型不存在：模型 ID 或 Key 分组不匹配。
- 工具不调用：确认客户端开关和上游模型能力。
