# Codex 接入

Codex 使用 OpenAI Responses 协议连接 Oproxy。

![API 密钥页面展示的 Oproxy 端点](/images/oproxy-steps/api-endpoints.png)

*图：Codex 的 `base_url` 使用网关地址本身，不在配置中手动追加 `/v1`。*

## 配置目录

- macOS / Linux：`~/.codex/config.toml` 与 `~/.codex/auth.json`
- Windows：`%userprofile%\.codex\config.toml` 与 `%userprofile%\.codex\auth.json`

## config.toml

```toml
model_provider = "OpenAI"
model = "gpt-5.4"
review_model = "gpt-5.4"
model_reasoning_effort = "xhigh"
disable_response_storage = true
network_access = "enabled"
model_context_window = 1000000
model_auto_compact_token_limit = 900000

[model_providers.OpenAI]
name = "OpenAI"
base_url = "https://api.oproxy.world"
wire_api = "responses"
requires_openai_auth = true
```

模型、上下文窗口和推理强度应按当前 Codex 版本与 Oproxy 模型定价页调整，不要把示例当作固定上限。

## auth.json

```json
{
  "OPENAI_API_KEY": "YOUR_OPROXY_API_KEY"
}
```

## WebSocket 模式（可选）

```toml
[model_providers.OpenAI]
name = "OpenAI"
base_url = "https://api.oproxy.world"
wire_api = "responses"
supports_websockets = true
requires_openai_auth = true

[features]
responses_websockets_v2 = true
```

## 验证与排错

重启 Codex 后发起最小请求，并在 Oproxy 使用记录中确认 `/v1/responses`。出现 `401` 时检查 `auth.json`；模型错误时检查 OpenAI 分组；`429` 时检查余额、订阅、RPM、并发和 Key 限制。

![使用记录页面的 Key 和日期筛选栏](/images/oproxy-steps/usage-filters.png)

*图：按 Codex 专用 Key 筛选，核对 Responses 请求的时间和端点。*

::: warning Key 安全
`auth.json` 包含完整密钥。限制文件权限，不要提交到 Git，也不要复制到问题截图中。
:::
