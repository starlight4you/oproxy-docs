# API 端点与协议

Oproxy 提供统一网关并兼容 OpenAI 与 Anthropic 常见调用方式。先确认 Key 分组支持目标模型，再选择对应协议。

## Base URL

| 场景 | 地址 |
| --- | --- |
| 默认端点 | `https://api.oproxy.world` |
| 国内优化端点 | `https://open.oproxy.world` |
| OpenAI 兼容 SDK 常用 Base URL | `https://api.oproxy.world/v1` |

![Oproxy API 密钥页面中的两个可用端点](/images/oproxy-steps/api-endpoints.png)

*图：先复制端点，再用旁边的测速入口比较当前网络下的延迟。*

::: tip 路径规则
不要机械地重复 `/v1`。Codex 的 `config.toml` 和 Claude Code 环境变量使用不带 `/v1` 的网关地址；OpenAI 兼容 SDK、OpenCode 等通常使用带 `/v1` 的 Base URL。
:::

## OpenAI Responses

OpenAI Responses 请求使用 `/v1/responses`。最小请求示例：

```bash
curl https://api.oproxy.world/v1/responses \
  -H "Authorization: Bearer YOUR_OPROXY_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model":"gpt-5.4","input":"Hello"}'
```

模型名必须与 **模型定价** 页面一致。

## OpenAI Chat Completions

需要 Chat Completions 的客户端可将 Provider 设为 OpenAI compatible：

```bash
curl https://api.oproxy.world/v1/chat/completions \
  -H "Authorization: Bearer YOUR_OPROXY_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model":"gpt-5.4","messages":[{"role":"user","content":"Hello"}]}'
```

## Anthropic Messages

Claude Code 与 Anthropic 兼容客户端使用网关地址和 Oproxy Key，请求路径为 `/v1/messages`。

```bash
export ANTHROPIC_BASE_URL="https://api.oproxy.world"
export ANTHROPIC_AUTH_TOKEN="YOUR_OPROXY_API_KEY"
```

## 选择端点

1. 默认使用 `api.oproxy.world`。
2. 网络延迟或连接质量不佳时，在 API 密钥页使用测速链接比较两个端点。
3. 更换端点后，用最小请求验证，再运行长上下文或工具调用任务。
4. 调用异常时同时查看 [模型监控](https://oproxy.world/monitor)。

## 常见错误

- `401`：Key 不完整、已禁用或认证变量名错误。
- 模型不存在：模型名或 Key 分组不匹配。
- `429`：余额/订阅额度、RPM、并发或 Key 限制已达到。
- 超时：查看端点测速和模型监控，必要时换端点重试。
