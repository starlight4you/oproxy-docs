# Cherry Studio 接入

Cherry Studio 等桌面聊天客户端可以通过自定义 OpenAI 兼容 Provider 使用 Oproxy。

## 配置

1. 创建一个聊天专用 API Key。
2. 在客户端新增 OpenAI compatible Provider。
3. 填写：

| 字段 | 值 |
| --- | --- |
| API Host / Base URL | `https://api.oproxy.world/v1` |
| API Key | `YOUR_OPROXY_API_KEY` |
| Model ID | 模型定价页中的完整 ID |

![Oproxy API 密钥页面中的网关端点](/images/oproxy-steps/api-endpoints.png)

*图：在 Oproxy 复制网关域名，Cherry Studio 的 OpenAI-compatible 配置通常使用带 `/v1` 的 Base URL。*

4. 保存后获取模型列表，或手动添加目标模型。
5. 新建会话发送最小消息，并在 Oproxy 使用记录中核对。

![使用记录页面的筛选栏](/images/oproxy-steps/usage-filters.png)

*图：按聊天专用 Key 筛选请求，核对模型、时间和费用。*

## 功能开关

图片、工具调用、联网、推理和长上下文依赖客户端与模型共同支持。不要仅凭界面开关判断能力；以 Oproxy 模型信息和实际请求为准。

## 常见问题

- 无法获取模型：手动填写模型 ID，并检查 Key 分组。
- Base URL 错误：OpenAI 兼容模式通常需要 `/v1`。
- 连接超时：比较默认与国内优化端点，并查看模型监控。
- 消费异常：为聊天客户端单独设置 Key 额度。
