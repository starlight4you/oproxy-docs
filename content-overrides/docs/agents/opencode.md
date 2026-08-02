# OpenCode 接入

OpenCode 可以分别配置 OpenAI 与 Anthropic Provider。

## 配置路径

使用 `~/.config/opencode/opencode.json` 或 `opencode.jsonc`。也可以在 OpenCode 中通过 `/connect` 配置 Key。

![Oproxy 默认端点和国内优化端点](/images/oproxy-steps/api-endpoints.png)

*图：OpenCode 的 OpenAI-compatible Base URL 通常在所选网关后追加 `/v1`。*

## OpenAI 分组

```json
{
  "$schema": "https://opencode.ai/config.json",
  "provider": {
    "openai": {
      "options": {
        "baseURL": "https://api.oproxy.world/v1",
        "apiKey": "YOUR_OPROXY_API_KEY"
      },
      "models": {
        "gpt-5.4": {
          "name": "GPT-5.4",
          "options": { "store": false },
          "variants": {
            "low": {}, "medium": {}, "high": {}, "xhigh": {}
          }
        }
      }
    }
  }
}
```

## Claude 分组

```json
{
  "$schema": "https://opencode.ai/config.json",
  "provider": {
    "anthropic": {
      "options": {
        "baseURL": "https://api.oproxy.world/v1",
        "apiKey": "YOUR_OPROXY_API_KEY"
      },
      "npm": "@ai-sdk/anthropic"
    }
  }
}
```

## 建议

- OpenAI 与 Claude 使用不同 Key，便于限额、停用和审计。
- 模型名必须与 Oproxy 模型定价页完全一致。
- 先验证文本请求，再启用工具调用和长上下文。
- 请求成功后在使用记录中确认实际 Provider、端点和费用。

![使用记录筛选栏](/images/oproxy-steps/usage-filters.png)

*图：分别按 OpenAI 与 Claude 配置中使用的 API Key 检查请求，便于排错和审计。*
