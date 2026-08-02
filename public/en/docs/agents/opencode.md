# OpenCode Setup

Use `~/.config/opencode/opencode.json` or `opencode.jsonc`.

![Oproxy API endpoints](/images/oproxy-steps/api-endpoints.png)

*Figure: OpenCode's OpenAI-compatible Base URL normally adds `/v1` to the selected gateway.*

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
        "gpt-5.4": { "name": "GPT-5.4", "options": { "store": false } }
      }
    }
  }
}
```

For Claude models, use a separate Claude-group key and an Anthropic provider. Exact model IDs must match Model Pricing. Separate keys simplify limits, rotation, and auditing.

![Usage filters](/images/oproxy-steps/usage-filters.png)

*Figure: Check OpenAI and Claude keys separately when verifying or troubleshooting requests.*
