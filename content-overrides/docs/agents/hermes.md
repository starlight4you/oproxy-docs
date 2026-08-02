# Hermes 接入

Hermes 或其他支持自定义 OpenAI-compatible Provider 的代理工具，可以使用 Oproxy 的 OpenAI 兼容端点。

## 推荐值

```yaml
provider: openai
base_url: https://api.oproxy.world/v1
api_key: YOUR_OPROXY_API_KEY
model: gpt-5.4
```

实际字段名以客户端版本为准。关键规则是：Base URL 使用 `/v1`、模型名来自 Oproxy 模型定价页、Key 选择支持该模型的 OpenAI 分组。

![模型定价页中的模型与可用分组](/images/oproxy-steps/model-pricing.png)

*图：先在模型定价页确认精确模型 ID 和可用分组，再填写 Hermes。*

## 验证

1. 先发送一个不调用工具的短文本请求。
2. 在 Oproxy 使用记录中确认端点和模型。
3. 再测试工具调用、文件操作和长上下文。
4. 如果工具不工作，确认客户端和模型均支持工具调用；网关不能为不支持的模型补充能力。

![使用记录筛选栏](/images/oproxy-steps/usage-filters.png)

*图：选择 Hermes 专用 Key 和测试时段，确认请求已经进入网关。*

## 安全

把 Key 放入客户端支持的环境变量或受限配置文件，不要写进项目仓库。为自动化代理设置额度、速率和有效期限制。
